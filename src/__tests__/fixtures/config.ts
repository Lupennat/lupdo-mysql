import { MysqlOptions } from '../../types';

export const drivers: {
    [key: string]: {
        [key: string]: MysqlOptions;
    };
} = {
    mysql: {
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
        }
    },
    mariadb: {
        mariadb: {
            host: 'localhost',
            port: 5308,
            user: 'lupdo',
            password: 'lupdo@s3cRet',
            database: 'test_db'
        }
    }
};

export const tests: Array<{ driver: string; options: MysqlOptions; connection: string }> = [];

for (const driver in drivers) {
    for (const connection in drivers[driver]) {
        tests.push({ driver, options: drivers[driver][connection], connection });
    }
}
