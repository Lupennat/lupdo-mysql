import {
  Connection,
  ConnectionOptions,
  FieldPacket,
  OkPacket,
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2/promise';

export interface MysqlOptions extends Omit<ConnectionOptions, 'host'> {
  /**
   * The hostname of the database you are connecting to. (Default: localhost)
   * It Accept a list of Hosts of type host:port for round robin connection
   */
  host?: string | string[];
}

export interface MysqlPreparedStatementInfo {
  statement: {
    query: string;
    originalQuery: string;
  };
  close: () => void;
  execute: (
    paramaters: any | any[] | { [param: string]: any },
  ) => [
    (
      | RowDataPacket[]
      | RowDataPacket[][]
      | OkPacket
      | OkPacket[]
      | ResultSetHeader
    ),
    FieldPacket[],
  ];
}

export interface MysqlPoolConnection extends Connection {
  __lupdo_uuid: string;
  __lupdo_killed: boolean;
}
