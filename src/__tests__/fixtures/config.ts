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
        port: 5307,
        user: 'lupdo',
        password: 'lupdo@s3cRet',
        database: 'test_db'
    },
    mysql8: {
        host: 'localhost',
        port: 5308,
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

export function isMysqlGreatearThen56(): boolean {
    return ['mysql57', 'mysql8'].includes(currentDB);
}

export function isMariaGreaterThen1004(): boolean {
    return isMariaGreaterThen1006() || ['mariadb1005', 'mariadb1006'].includes(currentDB);
}

export function isMariaGreaterThen1006(): boolean {
    return isMariaGreaterThen1009() || ['mariadb1007', 'mariadb1008', 'mariadb1009'].includes(currentDB);
}

export function isMariaGreaterThen1009(): boolean {
    return ['mariadb1010', 'mariadb1011'].includes(currentDB);
}

export function isMysql(): boolean {
    return ['mysql56', 'mysql57', 'mysql8'].includes(currentDB);
}

const currentDB: string = process.env.DB as string;

export const pdoData: { driver: string; config: MysqlOptions } = {
    driver: currentDB.startsWith('maria') ? 'mariadb' : 'mysql',
    config: drivers[currentDB]
};
