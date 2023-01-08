import { Pdo } from 'lupdo';
import { Dictionary } from 'lupdo/dist/typings/types/pdo-statement';
import { pdoData } from './fixtures/config';

describe('Mysql Timezone', () => {
    it('Works Timezone', async () => {
        let pdo = new Pdo(pdoData.driver, pdoData.config, {
            min: 1,
            max: 1
        });

        let stmt = await pdo.query('SELECT * FROM companies LIMIT 1');
        let row = stmt.fetchDictionary().get() as Dictionary;
        expect(row.opened).toBe('2022-10-22 00:00:00');
        await pdo.disconnect();

        pdo = new Pdo(pdoData.driver, pdoData.config, {
            min: 1,
            max: 1,
            created: async (uuid, connection) => {
                await connection.query("SET time_zone='Europe/Rome';");
            }
        });

        stmt = await pdo.query('SELECT * FROM companies LIMIT 1');
        row = stmt.fetchDictionary().get() as Dictionary;
        expect(row.opened).toBe('2022-10-22 02:00:00');
        await pdo.disconnect();
    });
});
