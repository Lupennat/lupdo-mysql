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
    mysql8: {
        host: 'localhost',
        port: 5307,
        user: 'lupdo',
        password: 'lupdo@s3cRet',
        database: 'test_db'
    },
    mariadb: {
        host: 'localhost',
        port: 5308,
        user: 'lupdo',
        password: 'lupdo@s3cRet',
        database: 'test_db'
    }
};

const currentDB: string = process.env.DB as string;

export const pdoData: { driver: string; config: MysqlOptions } = {
    driver: currentDB === 'mariadb' ? 'mariadb' : 'mysql',
    config: drivers[currentDB]
};
