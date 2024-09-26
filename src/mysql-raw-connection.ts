import {
  BaseTypedBinding,
  Params,
  PdoAffectingData,
  PdoColumnData,
  PdoRawConnection,
  PdoRowData,
  ValidBindingsSingle,
} from 'lupdo';
import {
  FieldPacket,
  OkPacket,
  QueryResult,
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2/promise';

import { MysqlPoolConnection } from './types';
import { applyPadToRow } from './utils';

export class MysqlRawConnection extends PdoRawConnection {
  protected async doBeginTransaction(
    connection: MysqlPoolConnection,
  ): Promise<void> {
    await connection.beginTransaction();
  }

  protected async doCommit(connection: MysqlPoolConnection): Promise<void> {
    await connection.commit();
  }

  protected async doRollback(connection: MysqlPoolConnection): Promise<void> {
    await connection.rollback();
  }

  protected async getStatement(sql: string): Promise<string> {
    // we don't really use mysql2 manual statement
    // because if fails parameters on statement.execute it does not close the connection and all the pool is locked
    // we do not use neither mysql.execute because does not respect typeCast
    return sql;
  }

  protected async executeStatement(
    sql: string,
    bindings: Params,
    connection: MysqlPoolConnection,
  ): Promise<
    [
      string,
      PdoAffectingData,
      PdoRowData[][] | PdoRowData[],
      PdoColumnData[][] | PdoColumnData[],
    ]
  > {
    return [
      sql,
      ...this.adaptResponse(...(await connection.query(sql, bindings))),
    ];
  }

  protected async closeStatement(): Promise<void> {
    return void 0;
  }

  protected async doExec(
    connection: MysqlPoolConnection,
    sql: string,
  ): Promise<PdoAffectingData> {
    return this.adaptResponse(...(await connection.query(sql, [])))[0];
  }

  protected async doQuery(
    connection: MysqlPoolConnection,
    sql: string,
  ): Promise<
    [
      PdoAffectingData,
      PdoRowData[][] | PdoRowData[],
      PdoColumnData[][] | PdoColumnData[],
    ]
  > {
    return this.adaptResponse(...(await connection.query(sql, [])));
  }

  protected adaptResponse(
    info: QueryResult,
    fields: FieldPacket[][] | FieldPacket[],
  ): [
    PdoAffectingData,
    PdoRowData[][] | PdoRowData[],
    PdoColumnData[][] | PdoColumnData[],
  ] {
    const hasColumns = Array.isArray(fields);
    const isRowSet = hasColumns && Array.isArray(fields[0]);
    let columns: any[][] | any[] = [];

    if (hasColumns) {
      if (isRowSet) {
        columns = (fields as FieldPacket[][])
          .filter((rowsetFields) => Array.isArray(rowsetFields))
          .map((rowsetFields) => {
            return rowsetFields.map((field) => this.adaptColumn(field));
          });
      } else {
        columns = (fields as FieldPacket[]).map((field) =>
          this.adaptColumn(field),
        );
      }
    }

    const resultSetHeader: ResultSetHeader | OkPacket | null =
      info.constructor.name === 'ResultSetHeader'
        ? (info as ResultSetHeader)
        : isRowSet &&
            Array.isArray(info) &&
            info[columns.length].constructor.name === 'ResultSetHeader'
          ? (info[columns.length - 1] as OkPacket)
          : null;

    return [
      resultSetHeader === null
        ? {}
        : {
            lastInsertRowid: resultSetHeader.insertId,
            affectedRows: resultSetHeader.affectedRows,
          },
      resultSetHeader && !isRowSet
        ? []
        : isRowSet
          ? (info as RowDataPacket[][][])
              .filter((rowSet) => Array.isArray(rowSet))
              .map((rowSet, index) => {
                return rowSet.map((row) => {
                  return applyPadToRow(row, fields[index] as FieldPacket[]);
                });
              })
          : (info as RowDataPacket[][]).map((row) => {
              return applyPadToRow(row, fields as FieldPacket[]);
            }),

      columns,
    ];
  }

  protected adaptColumn(field: any): any {
    return {
      catalog: field.catalog,
      schema: field.schema,
      name: field.name,
      orgName: field.orgName,
      table: field.table,
      orgTable: field.orgTable,
      characterSet: field.characterSet,
      columnLength: field.columnLength,
      columnType: field.columnType,
      type: field.columnType,
      flags: field.flags,
      decimals: field.decimals,
    };
  }

  protected adaptBindValue(value: ValidBindingsSingle): ValidBindingsSingle {
    if (value instanceof BaseTypedBinding) {
      return this.adaptBindValue(value.value);
    }

    if (typeof value === 'boolean') {
      return Number(value);
    }

    if (typeof value === 'bigint') {
      if (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER) {
        return value.toString();
      }
      return Number(value);
    }

    return value;
  }
}

export default MysqlRawConnection;
