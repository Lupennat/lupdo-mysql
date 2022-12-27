# Lupdo-mysql

[Lupdo](https://www.npmjs.com/package/lupdo) Driver For Mysql.

## Supported Databases

-   [mysql](https://www.mysql.com/)
-   [mariadb](https://mariadb.org/)

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

By default Ludpo-mysql overrides user connection options with theese:

```ts
{
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
    debug: ${ATTR_DEBUG}
}
```

Internally lupdo-mysql convert string of type numbers to number or bigint to preserve precision.

> **Note**
> Custom Aggregate and Function must be adapted as required if using numbers.

## Kill Connection

Lupdo-mysql support kill query.
