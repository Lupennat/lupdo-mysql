/* eslint-disable @typescript-eslint/no-var-requires */
import { PdoRawConnection } from 'lupdo';
import PdoAffectingData from 'lupdo/dist/typings/types/pdo-affecting-data';
import PdoColumnData from 'lupdo/dist/typings/types/pdo-column-data';
import PdoColumnValue from 'lupdo/dist/typings/types/pdo-column-value';
import { Params, ValidBindings } from 'lupdo/dist/typings/types/pdo-prepared-statement';
import PdoRowData from 'lupdo/dist/typings/types/pdo-raw-data';
import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { MysqlPoolConnection } from './types';

const toUnnamed = require('named-placeholders')();

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

    protected async getStatement(sql: string, connection: MysqlPoolConnection): Promise<string> {
        // https://github.com/sidorares/node-mysql2/blob/master/documentation/Prepared-Statements.md
        // manual statement prepare does not support named placeholders
        // we must use the mysql2 internal library "named-placeholders"
        const statement = await connection.prepare(toUnnamed(sql, [])[0]);
        // we don't really use mysql2 manual statement
        // because if fails parameters on execute it does not close the connection and all the pool is locked
        // we use prepare only to validate the sql syntax and after that unprepare is called
        await connection.unprepare(statement.statement.query);
        return sql;
    }

    protected async executeStatement(
        statement: string,
        bindings: Params,
        connection: MysqlPoolConnection
    ): Promise<[PdoAffectingData, PdoRowData[], PdoColumnData[]]> {
        // statement is the original sql query without "named-placeholders" replacement
        return this.adaptResponse(...(await connection.execute(statement, bindings)));
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
        return this.adaptResponse(...(await connection.execute(sql, [])));
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
            this.adjustBigInts(info.constructor.name === 'ResultSetHeader' ? [] : (info as RowDataPacket[]), columns),
            columns
        ];
    }

    protected adjustBigInts(rows: RowDataPacket[], columns: any[]): PdoRowData[] {
        const columnsToAdapt: number[] = [];
        columns.forEach((column, index) => {
            if (column.type === 8) {
                columnsToAdapt.push(index);
            }
        });

        return rows.map(row => {
            const arr: PdoRowData = Object.values(row);
            for (const index of columnsToAdapt) {
                const value: PdoColumnValue = arr[index];
                if (typeof value === 'string') {
                    const bigI = BigInt(value);
                    if (bigI > Number.MAX_SAFE_INTEGER || bigI < Number.MIN_SAFE_INTEGER) {
                        arr[index] = BigInt(value);
                    } else {
                        arr[index] = Number(value);
                    }
                }
            }
            return arr;
        });
    }

    protected adaptBindValue(value: ValidBindings): ValidBindings {
        if (typeof value === 'boolean') {
            value = Number(value);
        }

        // When running execute(), any placeholder parameter value with the JavaScript type 'number' will now be sent to MySQL via the binary protocol as a MySQL string instead of as a MySQL double.
        // Prepared statements that are called with parameters having the JavaSCript type 'number' are failing with the error "Incorrect arguments to mysqld_stmt_execute".
        // It was determined that this was due to a change made to prepared statement handling in MySQL 8.0.22 and that this could be overcome by converting numerical parameter values to strings.
        // The long-term fix requires the implementation of data type conversion of parameters using the type hints provided by MySQL in the COM_STMT_PREPARE Response.
        // For more information:
        // https://dev.mysql.com/worklog/task/?id=9384

        if (typeof value === 'number') {
            value = value.toString();
        }

        return value;
    }
}

export default MysqlRawConnection;
