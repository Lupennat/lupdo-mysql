import { MysqlOptions } from '../../types';

export const drivers: {
    [key: string]: MysqlOptions;
} = {
    mysql56: {
        host: 'localhost',
        port: 5306,
        user: 'lupdo',
        password: 'lupdo@s3cRet',
        database: 'test_db'
    },
    mysql57: {
        host: 'localhost',
        port: 5309,
        user: 'lupdo',
        password: 'lupdo@s3cRet',
        database: 'test_db'
    },
    mysql8: {
        host: 'localhost',
        port: 5307,
        user: 'lupdo',
        password: 'lupdo@s3cRet',
        database: 'test_db'
    },
    mariadb1003: {
        host: 'localhost',
        port: 31003,
        user: 'lupdo',
        password: 'lupdo@s3cRet',
        database: 'test_db'
    },
    mariadb1004: {
        host: 'localhost',
        port: 31004,
        user: 'lupdo',
        password: 'lupdo@s3cRet',
        database: 'test_db'
    },
    mariadb1005: {
        host: 'localhost',
        port: 31005,
        user: 'lupdo',
        password: 'lupdo@s3cRet',
        database: 'test_db'
    },
    mariadb1006: {
        host: 'localhost',
        port: 31006,
        user: 'lupdo',
        password: 'lupdo@s3cRet',
        database: 'test_db'
    },
    mariadb1007: {
        host: 'localhost',
        port: 31007,
        user: 'lupdo',
        password: 'lupdo@s3cRet',
        database: 'test_db'
    },
    mariadb1008: {
        host: 'localhost',
        port: 31008,
        user: 'lupdo',
        password: 'lupdo@s3cRet',
        database: 'test_db'
    },
    mariadb1009: {
        host: 'localhost',
        port: 31009,
        user: 'lupdo',
        password: 'lupdo@s3cRet',
        database: 'test_db'
    },
    mariadb1010: {
        host: 'localhost',
        port: 31010,
        user: 'lupdo',
        password: 'lupdo@s3cRet',
        database: 'test_db'
    },
    mariadb1011: {
        host: 'localhost',
        port: 31011,
        user: 'lupdo',
        password: 'lupdo@s3cRet',
        database: 'test_db'
    }
};

const currentDB: string = process.env.DB as string;

export const pdoData: { driver: string; config: MysqlOptions } = {
    driver: currentDB.startsWith('maria') ? 'mariadb' : 'mysql',
    config: drivers[currentDB]
};
