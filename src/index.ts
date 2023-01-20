import { Pdo } from 'lupdo';
import MysqlDriver from './mysql-driver';
import { MysqlOptions } from './types';

import PdoAttributes from 'lupdo/dist/typings/types/pdo-attributes';
import { PoolOptions } from 'lupdo/dist/typings/types/pdo-pool';
Pdo.addDriver('mysql', MysqlDriver);
Pdo.addDriver('mariadb', MysqlDriver);

export function createMysqlPdo(options: MysqlOptions, poolOptions?: PoolOptions, attributes?: PdoAttributes): Pdo {
    return new Pdo('mysql', options, poolOptions, attributes);
}

export { default as MysqlDriver } from './mysql-driver';
export * from './types';
