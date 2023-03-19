import { PdoRawConnection, TypedBinding } from 'lupdo';
import PdoAffectingData from 'lupdo/dist/typings/types/pdo-affecting-data';
import PdoColumnData from 'lupdo/dist/typings/types/pdo-column-data';
import { Params, ValidBindingsSingle } from 'lupdo/dist/typings/types/pdo-prepared-statement';
import PdoRowData from 'lupdo/dist/typings/types/pdo-raw-data';
import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { MysqlPoolConnection } from './types';
import { applyPadToRow } from './utils';

class MysqlRawConnection extends PdoRawConnection {
    protected async doBeginTransaction(connection: MysqlPoolConnection): Promise<void> {
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
        connection: MysqlPoolConnection
    ): Promise<[string, PdoAffectingData, PdoRowData[], PdoColumnData[]]> {
        return [sql, ...this.adaptResponse(...(await connection.query(sql, bindings)))];
    }

    protected async closeStatement(): Promise<void> {
        return void 0;
    }

    protected async doExec(connection: MysqlPoolConnection, sql: string): Promise<PdoAffectingData> {
        return this.adaptResponse(...(await connection.query(sql, [])))[0];
    }

    protected async doQuery(
        connection: MysqlPoolConnection,
        sql: string
    ): Promise<[PdoAffectingData, PdoRowData[], PdoColumnData[]]> {
        return this.adaptResponse(...(await connection.query(sql, [])));
    }

    protected adaptResponse(
        info: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader,
        fields: FieldPacket[]
    ): [PdoAffectingData, PdoRowData[], PdoColumnData[]] {
        const columns = Array.isArray(fields)
            ? (fields as any[]).map(field => {
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
                      decimals: field.decimals
                  };
              })
            : [];
        return [
            info.constructor.name === 'ResultSetHeader'
                ? {
                      lastInsertRowid: (info as ResultSetHeader).insertId,
                      affectedRows: (info as ResultSetHeader).affectedRows
                  }
                : {},
            info.constructor.name === 'ResultSetHeader'
                ? []
                : (info as RowDataPacket[][]).map(row => {
                      return applyPadToRow(row, fields);
                  }),
            columns
        ];
    }

    protected adaptBindValue(value: ValidBindingsSingle): ValidBindingsSingle {
        if (value instanceof TypedBinding) {
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
