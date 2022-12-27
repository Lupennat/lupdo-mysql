/* eslint-disable @typescript-eslint/no-var-requires */
import {
    ATTR_DEBUG,
    DEBUG_ENABLED,
    Pdo,
    PdoConnectionI,
    PdoError,
    PdoI,
    PdoPreparedStatement,
    PdoStatement,
    PdoTransaction
} from 'lupdo';

import { tests } from './fixtures/config';
const { PromiseConnection } = require('mysql2/promise');

describe('Mysql Driver', () => {
    const pdos: { [key: string]: PdoI } = {};
    beforeAll(() => {
        for (const test of tests) {
            pdos[test.connection] = new Pdo(test.driver, test.options);
        }
    });

    afterAll(async () => {
        for (const connection in pdos) {
            await pdos[connection].disconnect();
        }
    });

    it('Works Driver Registration', () => {
        expect(Pdo.getAvailableDrivers()).toEqual(['mysql', 'mariadb']);
    });

    it.each(tests)('Works $connection BeginTransaction Return Transaction', async ({ connection }) => {
        const trx = await pdos[connection].beginTransaction();
        expect(trx).toBeInstanceOf(PdoTransaction);
        await trx.rollback();
    });

    it.each(tests)('Works $connection Exec Return Number', async ({ connection }) => {
        const res = await pdos[connection].exec('SELECT 1');
        expect(typeof res === 'number').toBeTruthy();
        expect(res).toEqual(0);
        const trx = await pdos[connection].beginTransaction();
        expect(await trx.exec("INSERT INTO users (name, gender) VALUES ('Claudio', 'All');")).toEqual(1);
        await trx.rollback();
    });

    it.each(tests)('Works $connection Exec Fails', async ({ connection }) => {
        await expect(pdos[connection].exec('SELECT ?')).rejects.toThrow(PdoError);
    });

    it.each(tests)('Works $connection Query Return PdoStatement', async ({ connection }) => {
        const stmt = await pdos[connection].query('SELECT 1');
        expect(stmt).toBeInstanceOf(PdoStatement);
    });

    it.each(tests)('Works $connection Query Fails', async ({ connection }) => {
        await expect(pdos[connection].query('SELECT ?')).rejects.toThrow(PdoError);
    });

    it.each(tests)('Works $connection Prepare Return PdoPreparedStatement', async ({ connection }) => {
        const stmt = await pdos[connection].prepare('SELECT 1');
        expect(stmt).toBeInstanceOf(PdoPreparedStatement);
        await stmt.execute();
        await stmt.close();
    });

    it.each(tests)('Works $connection Prepare Fails', async ({ connection }) => {
        await expect(pdos[connection].prepare('SELECT ??')).rejects.toThrow(PdoError);
    });

    it.each(tests)('Works $connection Execute Fails', async ({ connection }) => {
        const stmt = await pdos[connection].prepare('SELECT ? as spaccati');
        await expect(stmt.execute([])).rejects.toThrow(PdoError);
        await stmt.close();
    });

    it.each(tests)('Works $connection Get Raw Pool Connection', async ({ connection }) => {
        const raw = await pdos[connection].getRawPoolConnection();
        expect(raw.connection).toBeInstanceOf(PromiseConnection);
        await raw.release();
    });

    it.each(tests)('Works $connection Connection On Create', async ({ driver, options }) => {
        const pdo = new Pdo(
            driver,
            options,
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

    it.each(tests)('Works $connection Debug', async ({ driver, options }) => {
        console.log = jest.fn();
        console.trace = jest.fn();
        const pdo = new Pdo(driver, options, {}, { [ATTR_DEBUG]: DEBUG_ENABLED });
        await pdo.query('SELECT 1');
        expect(console.log).toHaveBeenCalled();
        await pdo.disconnect();
    });
});
