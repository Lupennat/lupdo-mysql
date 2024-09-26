import { MysqlOptions } from '../../src';

const currentDB: string = process.env.DB as string;
const currentHost: string =
  (process.env.CI ?? '') != '' ? 'localhost' : currentDB;

export const drivers: {
  [key: string]: MysqlOptions;
} = {
  mysql57: {
    host: currentHost,
    port: 3306,
    user: 'lupdo',
    password: 'lupdo@s3cRet',
    database: 'test_db',
  },
  mysql80: {
    host: currentHost,
    port: 3306,
    user: 'lupdo',
    password: 'lupdo@s3cRet',
    database: 'test_db',
  },
  mysql84: {
    host: currentHost,
    port: 3306,
    user: 'lupdo',
    password: 'lupdo@s3cRet',
    database: 'test_db',
  },
  mysql90: {
    host: currentHost,
    port: 3306,
    user: 'lupdo',
    password: 'lupdo@s3cRet',
    database: 'test_db',
  },
  mariadb1004: {
    host: currentHost,
    port: 3306,
    user: 'lupdo',
    password: 'lupdo@s3cRet',
    database: 'test_db',
  },
  mariadb1005: {
    host: currentHost,
    port: 3306,
    user: 'lupdo',
    password: 'lupdo@s3cRet',
    database: 'test_db',
  },
  mariadb1006: {
    host: currentHost,
    port: 3306,
    user: 'lupdo',
    password: 'lupdo@s3cRet',
    database: 'test_db',
  },
  mariadb1011: {
    host: currentHost,
    port: 3306,
    user: 'lupdo',
    password: 'lupdo@s3cRet',
    database: 'test_db',
  },
  mariadb1104: {
    host: currentHost,
    port: 3306,
    user: 'lupdo',
    password: 'lupdo@s3cRet',
    database: 'test_db',
  },
};

export function isMysqlGreatearThen56(): boolean {
  return isMysql() && Number(currentDB.replace('mysql', '')) > 56;
}

export function isMariaGreaterThen1004(): boolean {
  return !isMysql() && Number(currentDB.replace('mariadb', '')) > 1004;
}

export function isMariaGreaterThen1006(): boolean {
  return !isMysql() && Number(currentDB.replace('mariadb', '')) > 1006;
}

export function isMariaGreaterThen1009(): boolean {
  return !isMysql() && Number(currentDB.replace('mariadb', '')) > 1009;
}

export function isMysql(): boolean {
  return currentDB.startsWith('mysql');
}

export const pdoData: { driver: string; config: MysqlOptions } = {
  driver: currentDB.startsWith('maria') ? 'mariadb' : 'mysql',
  config: drivers[currentDB],
};
