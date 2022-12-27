import { createConnection as mysql2CreateConnection } from 'mysql2/promise';

import { ATTR_DEBUG, DEBUG_ENABLED, PdoConnectionI, PdoDriver, PdoRawConnectionI } from 'lupdo';
import PdoAttributes from 'lupdo/dist/typings/types/pdo-attributes';
import { PoolOptions } from 'lupdo/dist/typings/types/pdo-pool';
import MysqlConnection from './mysql-connection';
import MysqlRawConnection from './mysql-raw-connection';
import { MysqlOptions, MysqlPoolConnection } from './types';

interface protectedMysqlConnection extends MysqlPoolConnection {
    _fatalError: boolean;
    _protocolError: boolean;
    _closing: boolean;
    stream:
        | undefined
        | {
              destroyed: boolean;
          };
}

class MysqlDriver extends PdoDriver {
    constructor(driver: string, protected options: MysqlOptions, poolOptions: PoolOptions, attributes: PdoAttributes) {
        super(driver, poolOptions, attributes);
    }

    protected async createConnection(unsecure = false): Promise<MysqlPoolConnection> {
        const { ...mysqlOptions } = this.options;
        const debugMode = this.getAttribute(ATTR_DEBUG) as number;

        mysqlOptions.queryFormat = undefined;

        return (await mysql2CreateConnection({
            ...mysqlOptions,
            ...(unsecure
                ? {}
                : {
                      rowsAsArray: true,
                      namedPlaceholders: true,
                      dateStrings: false,
                      supportBigNumbers: true,
                      bigNumberStrings: true,
                      decimalNumbers: false,
                      typeCast: true,
                      multipleStatements: false,
                      stringifyObjects: false,
                      trace: false,
                      flags: [],
                      queryFormat: undefined,
                      debug: debugMode === DEBUG_ENABLED
                  })
        })) as MysqlPoolConnection;
    }

    protected createPdoConnection(connection: MysqlPoolConnection): PdoConnectionI {
        return new MysqlConnection(connection);
    }

    protected async closeConnection(connection: MysqlPoolConnection): Promise<void> {
        await connection.end();
        connection.removeAllListeners();
    }

    protected async destroyConnection(connection: MysqlPoolConnection): Promise<void> {
        // get new connection to force kill pending
        const newConn = await this.createConnection();
        await newConn.query('KILL QUERY ' + connection.threadId);
        await newConn.end();
        await connection.end();
        connection.removeAllListeners();
    }

    protected validateRawConnection(connection: protectedMysqlConnection): boolean {
        return connection != null && !connection._fatalError && !connection._protocolError && !connection._closing;
    }

    public getRawConnection(): PdoRawConnectionI {
        return new MysqlRawConnection(this.pool);
    }
}

export default MysqlDriver;
