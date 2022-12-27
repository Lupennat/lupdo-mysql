import { Pdo } from 'lupdo';
import MysqlDriver from './mysql-driver';
Pdo.addDriver('mysql', MysqlDriver);
Pdo.addDriver('mariadb', MysqlDriver);

export { default as MysqlDriver } from './mysql-driver';
export * from './types';
