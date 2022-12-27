import { Pdo } from 'lupdo';
import { tests } from './fixtures/config';

describe('Mysql BigInt Cast', () => {
    it.each(tests)('Works $connection Cast', async ({ driver, options }) => {
        const pdo = new Pdo(driver, options);

        let stmt = await pdo.query("SELECT CAST('9007199254740992' as SIGNED INTEGER)");
        expect(stmt.fetchColumn(0).get()).toEqual(BigInt('9007199254740992'));

        stmt = await pdo.query("SELECT CAST('-9007199254740992' as SIGNED INTEGER)");
        expect(stmt.fetchColumn(0).get()).toEqual(BigInt('-9007199254740992'));

        stmt = await pdo.query("SELECT CAST('9007199254740991' as SIGNED INTEGER)");
        expect(stmt.fetchColumn(0).get()).toEqual(9007199254740991);

        stmt = await pdo.query("SELECT CAST('-9007199254740991' as SIGNED INTEGER)");
        expect(stmt.fetchColumn(0).get()).toEqual(-9007199254740991);

        await pdo.disconnect();
    });
});
