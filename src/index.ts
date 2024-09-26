import { Pdo, PdoAttributes, PdoPoolOptions } from 'lupdo';

import MysqlDriver from './mysql-driver';
import { MysqlOptions } from './types';

Pdo.addDriver('mysql', MysqlDriver);
Pdo.addDriver('mariadb', MysqlDriver);

export function createMysqlPdo(
  options: MysqlOptions,
  poolOptions?: PdoPoolOptions,
  attributes?: PdoAttributes,
): Pdo {
  return new Pdo('mysql', options, poolOptions, attributes);
}

export { default as MysqlDriver } from './mysql-driver';
export * from './types';
