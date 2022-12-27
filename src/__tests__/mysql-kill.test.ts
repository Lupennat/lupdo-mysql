import { Pdo, PdoError } from 'lupdo';
import { tests } from './fixtures/config';

describe('Mysql Kill', () => {
    // sometimes sql sleep to simulate long query doesn't work -_-
    jest.retryTimes(3);

    it.each(tests)('Works $connection Destroy Connection Does not kill connection', async ({ driver, options }) => {
        const events: {
            killed: {
                [key: string]: number;
            };
        } = {
            killed: {}
        };

        const pdo = new Pdo(driver, options, {
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
