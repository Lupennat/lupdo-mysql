import { Connection, ConnectionOptions, FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2/promise';

export type MysqlOptions = ConnectionOptions;

export interface MysqlPreparedStatementInfo {
    statement: {
        query: string;
        originalQuery: string;
    };
    close: () => void;
    execute: (
        paramaters: any | any[] | { [param: string]: any }
    ) => [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];
}

export interface MysqlPoolConnection extends Connection {
    __lupdo_uuid: string;
    __lupdo_killed: boolean;

    prepare(sql: string): Promise<MysqlPreparedStatementInfo>;
}
