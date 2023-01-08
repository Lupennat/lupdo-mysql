<p align="center">
	<a href="https://www.npmjs.com/package/lupdo-mysql" target="__blank"><img src="https://img.shields.io/npm/v/lupdo-mysql?color=0476bc&label=" alt="NPM version"></a>
	<a href="https://www.npmjs.com/package/lupdo-mysql" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/lupdo-mysql?color=3890aa&label="></a>
    <a href="https://codecov.io/github/Lupennat/lupdo-mysql" >
        <img src="https://codecov.io/github/Lupennat/lupdo-mysql/branch/main/graph/badge.svg?token=IOOU3AW039"/>
    </a>
</p>

# Lupdo-mysql

[Lupdo](https://www.npmjs.com/package/lupdo) Driver For Mysql.

## Supported Databases

-   [mysql](https://www.mysql.com/) (v5.6, 5.7, 8)
-   [mariadb](https://mariadb.org/) (v10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9, 10.10, 10.11)

## Third Party Library

Lupdo-mysql, under the hood, uses stable and performant npm packages:

-   [mysql2](https://github.com/sidorares/node-mysql2)

## Usage

Base Example

```js
const Pdo = require('lupdo');
require('lupdo-mysql');
// ES6 or Typescrypt
import Pdo from 'lupdo';
import 'ludpo-mysql';

const pdo = new Pdo(
    'mysql',
    {
        host: 'localhost',
        port: 3306,
        user: 'user',
        password: 'password',
        database: 'database'
    },
    { min: 2, max: 3 }
);

const run = async () => {
    const statement = await pdo.query('SELECT 2');
    const res = statement.fetchArray().all();
    console.log(res);
    await pdo.disconnect();
};

run();
```

## Driver Options

[https://github.com/mysqljs/mysql#connection-options](https://github.com/mysqljs/mysql#connection-options)

## Mysql2 Overrides

By default Ludpo-mysql overrides user connection options with this:

```ts
{
    rowsAsArray: true,
    namedPlaceholders: true,
    dateStrings: false,
    supportBigNumbers: true,
    bigNumberStrings: true,
    decimalNumbers: false,
    typeCast: typeCast,
    timezone: 'Z',
    stringifyObjects: true,
    multipleStatements: false,
    trace: false,
    flags: [],
    queryFormat: undefined,
    debug: ${ATTR_DEBUG}
}
```

Lupdo mysql has a custom type parser

-   `boolean` are returned as number 1 or 0.
-   `bigint` are returned as number or BigInt when necessary.
-   `binary` and `blob` are returned as Buffer.
-   `zerofill` numbers are returned as string.
-   all `geometry` are returned as json string, coordinates are identified as x,y.
-   all others types are always returned as string.

## Timezone and Charset

Lupdo mysql force `mysql2` timezone to `Z`, every Javascript `Date` bindings will be converted in String using UTC timezone.\
Lupdo mysql default `charset` is `UTF8MB4_UNICODE_CI`, you can override through config.\
You can assign timezone through lupdo create callback in this way.

```ts
const Pdo = require('lupdo');
require('lupdo-mysql');
// ES6 or Typescrypt
import Pdo from 'lupdo';
import 'ludpo-mysql';

const pdo = new Pdo(
    'mysql',
    {
        host: 'localhost',
        port: 3306,
        user: 'user',
        password: 'password',
        database: 'database'
    },
    { 
        min: 2,
        max: 3,
        created: async (uuid, connection) => {
            await connection.query("SET time_zone='Europe/Rome';");
        }
    }
);
```

## Kill Connection

Lupdo-mysql support kill query.
