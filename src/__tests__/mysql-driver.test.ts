/* eslint-disable @typescript-eslint/no-var-requires */
import {
    ATTR_DEBUG,
    DEBUG_ENABLED,
    Pdo,
    PdoConnectionI,
    PdoError,
    PdoPreparedStatement,
    PdoStatement,
    PdoTransaction
} from 'lupdo';

import { Connection, RowDataPacket } from 'mysql2/promise';
import { createMysqlPdo } from '..';
import { pdoData } from './fixtures/config';
const { PromiseConnection } = require('mysql2/promise');

describe('Mysql Driver', () => {
    const pdo = new Pdo(pdoData.driver, pdoData.config);

    afterAll(async () => {
        await pdo.disconnect();
    });

    afterEach(() => {
        Pdo.setLogger(() => {});
    });

    it('Works Driver Registration', () => {
        expect(Pdo.getAvailableDrivers()).toEqual(['mysql', 'mariadb']);
    });

    it('Works Random Host From List', async () => {
        const config = pdoData.config;
        config.host = [`${config.host}:${config.port}`, `${config.host}:${config.port}`];
        config.port = undefined;
        const pdo = new Pdo(pdoData.driver, config);
        const stmt = await pdo.query('SELECT 1');
        expect(stmt.fetchColumn(0).all()).toEqual([1]);
        await pdo.disconnect();
    });

    it('Works BeginTransaction Return Transaction', async () => {
        const trx = await pdo.beginTransaction();
        expect(trx).toBeInstanceOf(PdoTransaction);
        await trx.rollback();
    });

    it('Works Exec Return Number', async () => {
        const res = await pdo.exec('SELECT 1');
        expect(typeof res === 'number').toBeTruthy();
        expect(res).toEqual(0);
        const trx = await pdo.beginTransaction();
        expect(await trx.exec("INSERT INTO users (name, gender) VALUES ('Claudio', 'All');")).toEqual(1);
        await trx.rollback();
    });

    it('Works Exec Fails', async () => {
        await expect(pdo.exec('SELECT ?')).rejects.toThrow(PdoError);
    });

    it('Works Query Return PdoStatement', async () => {
        const stmt = await pdo.query('SELECT 1');
        expect(stmt).toBeInstanceOf(PdoStatement);
    });

    it('Works Query Fails', async () => {
        await expect(pdo.query('SELECT ?')).rejects.toThrow(PdoError);
    });

    it('Works Prepare Return PdoPreparedStatement', async () => {
        const stmt = await pdo.prepare('SELECT 1');
        expect(stmt).toBeInstanceOf(PdoPreparedStatement);
        await stmt.execute();
        await stmt.close();
    });

    it('Works Execute Fails', async () => {
        const stmt = await pdo.prepare('SELECT ? as spaccati');
        await expect(stmt.execute([])).rejects.toThrow(PdoError);
        await stmt.close();
    });

    it('Works Get Raw Pool Connection', async () => {
        const raw = await pdo.getRawPoolConnection();
        expect(raw.connection).toBeInstanceOf(PromiseConnection);
        await raw.release();
    });

    it('Works Get Raw Driver Connection', async () => {
        const conn = await pdo.getRawDriverConnection<Connection>();
        const res = await conn.query('SELECT * FROM users WHERE id = 1');
        expect((res as RowDataPacket[])[0][0]).toEqual({ id: 1, name: 'Edmund', gender: 'Multigender' });
        await conn.end();
    });

    it('Work Get Version', async () => {
        const pdo = createMysqlPdo(pdoData.config);
        expect((await pdo.getVersion()).length).toBeGreaterThan(1);
    });

    it('Works Pdo Connection Version', async () => {
        const pdo = createMysqlPdo(pdoData.config, {
            created: (uuid, connection) => {
                expect(connection.version.length).toBeTruthy();
            }
        });
        await pdo.query('SELECT 1');
        await pdo.disconnect();
    });

    it('Works Connection On Create', async () => {
        const pdo = new Pdo(
            pdoData.driver,
            pdoData.config,
            {
                created: async (uuid: string, connection: PdoConnectionI) => {
                    await connection.query('SET SESSION wait_timeout=28000');
                }
            },
            {}
        );

        const stmt = await pdo.query(`SHOW VARIABLES LIKE 'wait_timeout';`);
        expect(stmt.fetchColumn<string>(1).get()).toBe('28000');
        await pdo.disconnect();
    });

    it('Works Debug', async () => {
        console.log = jest.fn();
        console.trace = jest.fn();
        const pdo = new Pdo(pdoData.driver, pdoData.config, {}, { [ATTR_DEBUG]: DEBUG_ENABLED });
        await pdo.query('SELECT 1');
        expect(console.log).toHaveBeenCalled();
        await pdo.disconnect();
    });

    it('Works createMysqlPdo', async () => {
        const pdo = createMysqlPdo(pdoData.config);
        expect(pdo).toBeInstanceOf(Pdo);
        await pdo.disconnect();
    });
});
