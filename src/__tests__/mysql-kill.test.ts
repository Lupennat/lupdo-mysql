import { Pdo, PdoError } from 'lupdo';
import { pdoData } from './fixtures/config';

describe('Mysql Kill', () => {
    // sometimes sql sleep to simulate long query doesn't work -_-
    jest.retryTimes(6);

    it('Works Destroy Connection Does not kill connection', async () => {
        const events: {
            killed: {
                [key: string]: number;
            };
        } = {
            killed: {}
        };

        const pdo = new Pdo(pdoData.driver, pdoData.config, {
            killTimeoutMillis: 500,
            killResource: true,
            max: 1,
            min: 1,
            acquired: () => {
                setTimeout(async () => {
                    await pdo.disconnect();
                }, 1500);
            },
            killed(uuid: string): void {
                events.killed[uuid] = events.killed[uuid] == null ? 1 : events.killed[uuid] + 1;
            }
        });

        await expect(pdo.exec('SELECT id FROM users WHERE id = 1 OR sleep(10) = 1;')).rejects.toThrow(PdoError);

        expect(Object.keys(events.killed).length).toBe(1);
    });
});
