import { Pdo, PdoI, PdoStatement, PdoTransaction, PdoTransactionPreparedStatement } from 'lupdo';
import { tests } from './fixtures/config';

describe('Mysql Transactions', () => {
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

    afterEach(() => {
        Pdo.setLogger(() => {});
    });

    it.each(tests)('Works $connection Transaction Rollback && Commit', async ({ connection }) => {
        const countBefore = await pdos[connection].query('SELECT count(*) as total FROM users');
        const counter = countBefore.fetchColumn<number>(0).get() as number;
        let trx = await pdos[connection].beginTransaction();
        expect(trx).toBeInstanceOf(PdoTransaction);
        let executed = await trx.exec("INSERT INTO users (name, gender) VALUES ('Claudio', 'All');");
        expect(executed).toBe(1);
        await trx.rollback();
        let countAfter = await pdos[connection].query('SELECT count(*) as total FROM users');
        expect(countAfter.fetchColumn<number>(0).get()).toBe(counter);

        trx = await pdos[connection].beginTransaction();
        expect(trx).toBeInstanceOf(PdoTransaction);
        executed = await trx.exec("INSERT INTO users (name, gender) VALUES ('Claudio', 'All');");
        expect(executed).toBe(1);
        await trx.commit();
        countAfter = await pdos[connection].query('SELECT count(*) as total FROM users');
        expect(countAfter.fetchColumn<number>(0).get()).toBe(counter + 1);

        const stmt = await pdos[connection].query("SELECT id FROM users where name = 'Claudio';");
        const id = stmt.fetchColumn<number>(0).get() as number;
        expect(await pdos[connection].exec('DELETE FROM users WHERE (id = ' + id + ');')).toBe(1);
    });

    it.each(tests)('Works $connection Transaction Exec Return Number', async ({ connection }) => {
        const trx = await pdos[connection].beginTransaction();
        const res = await trx.exec('SELECT 1');
        expect(typeof res === 'number').toBeTruthy();
        expect(res).toEqual(0);
        await trx.rollback();
    });

    it.each(tests)('Works $connection Transaction Query Return PdoStatement', async ({ connection }) => {
        const trx = await pdos[connection].beginTransaction();
        const stmt = await trx.query('SELECT 1');
        expect(stmt).toBeInstanceOf(PdoStatement);
        await trx.rollback();
    });

    it.each(tests)(
        'Works $connection Transaction Prepare Return PdoTransactionPreparedStatement',
        async ({ connection }) => {
            const trx = await pdos[connection].beginTransaction();
            const stmt = await trx.prepare('SELECT 1');
            expect(stmt).toBeInstanceOf(PdoTransactionPreparedStatement);
            await stmt.execute();
            await trx.rollback();
        }
    );
});
