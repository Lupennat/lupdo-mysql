import { Pdo } from 'lupdo';
import { ValidBindings } from 'lupdo/dist/typings/types/pdo-prepared-statement';
import {
    isMariaGreaterThen1004,
    isMariaGreaterThen1006,
    isMariaGreaterThen1009,
    isMysql,
    isMysqlGreatearThen56,
    pdoData
} from './fixtures/config';

describe('Mysql BigInt Cast', () => {
    it('Works Cast', async () => {
        const pdo = new Pdo(pdoData.driver, pdoData.config);

        let stmt = await pdo.query("SELECT CAST('9007199254740992' as SIGNED INTEGER)");
        expect(stmt.fetchColumn(0).get()).toEqual(BigInt('9007199254740992'));

        stmt = await pdo.query("SELECT CAST('-9007199254740992' as SIGNED INTEGER)");
        expect(stmt.fetchColumn(0).get()).toEqual(BigInt('-9007199254740992'));

        stmt = await pdo.query("SELECT CAST('9007199254740991' as SIGNED INTEGER)");
        expect(stmt.fetchColumn(0).get()).toBe(9007199254740991);

        stmt = await pdo.query("SELECT CAST('-9007199254740991' as SIGNED INTEGER)");
        expect(stmt.fetchColumn(0).get()).toBe(-9007199254740991);

        await pdo.disconnect();
    });

    if (isMysql()) {
        it('Works All Columns Types', async () => {
            const pdo = new Pdo(pdoData.driver, pdoData.config, {
                created: async (uuid, connection) => {
                    await connection.query("SET time_zone='UTC';");
                }
            });
            const stmt = await pdo.prepare(
                'INSERT INTO types (`char`,`varchar`,`binary`,`varbinary`,`tinyblob`,`tinytext`,`text`,`blob`,`mediumtext`,`mediumblob`,`longtext`,`longblob`,`enum`,`set`,`bit`,`tinyint`,`bool`,`boolean`,`smallint`,`mediumint`,`int`,`integer`,`bigint`,`decimal`,`dec`,`float`,`double`,`double_precision`,`tinyint_zero`,`smallint_zero`,`mediumint_zero`,`int_zero`,`integer_zero`,`bigint_zero`,`decimal_zero`,`dec_zero`,`float_zero`,`double_zero`,`double_precision_zero`,`date`,`datetime`,`timestamp`,`time`,`year`,`geometry`,`point`,`linestring`,`polygon`,`multipoint`,`multilinestring`,`multipolygon`,`geometrycollection`,`floatp`,`floatp_zero`' +
                    (isMysqlGreatearThen56() ? ',`json`' : '') +
                    ')' +
                    ' VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,ST_GeomFromText(?),ST_GeomFromText(?),ST_GeomFromText(?),ST_GeomFromText(?),ST_GeomFromText(?),ST_GeomFromText(?),ST_GeomFromText(?),ST_GeomFromText(?),?,?' +
                    (isMysqlGreatearThen56() ? ',?' : '') +
                    ');'
            );

            let params: ValidBindings = [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ];
            if (isMysqlGreatearThen56()) {
                params.push(null);
            }

            await stmt.execute(params);

            params = [
                'c',
                'varchar',
                '1',
                '101',
                Buffer.from('tinyblob'),
                'tinytext',
                'text',
                Buffer.from('blob'),
                'mediumtext',
                Buffer.from('mediumblob'),
                'longtext',
                Buffer.from('longblob'),
                'x-small',
                'a,b,c,d',
                0x01,
                1,
                false,
                true,
                3,
                45,
                1090,
                1090,
                BigInt('9223372036854775807'),
                '12345.67890',
                '98765.43210',
                '12345678901234567890123456789012345.123456789012345678901234567890',
                '12345678901234567890123456789012345.123456789012345678901234567890',
                '12345678901234567890123456789012345.123456789012345678901234567890',
                1,
                2,
                3,
                4,
                5,
                BigInt('9007199254740992'),
                '1.2',
                '1.3',
                '1.4',
                '1.5',
                '1.6',
                new Date('2023-01-01'),
                '2023-01-01 23:22:20.999999',
                new Date(Date.UTC(2023, 0, 1, 23, 22, 20, 123)),
                '838:59:59',
                '2023',
                'POINT(1 1)',
                'POINT(1 1)',
                'LINESTRING(0 0,1 1,2 2)',
                'POLYGON((0 0,10 0,10 10,0 10,0 0),(5 5,7 5,7 7,5 7, 5 5))',
                'MULTIPOINT(0 0, 20 20, 60 60)',
                'MULTILINESTRING((10 10, 20 20), (15 15, 30 15))',
                'MULTIPOLYGON(((0 0,10 0,10 10,0 10,0 0)),((5 5,7 5,7 7,5 7, 5 5)))',
                'GEOMETRYCOLLECTION(POINT(1 1),LINESTRING(0 0,1 1,2 2,3 3,4 4))',
                '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890.123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
                '1.7'
            ];

            if (isMysqlGreatearThen56()) {
                params.push('{"foo": {"bar":"baz"}}');
            }
            await stmt.execute(params);

            await stmt.close();

            const query = await pdo.query('SELECT * FROM types LIMIT 2;');

            let row = query.fetchDictionary().get() as { [key: string]: ValidBindings };
            expect(row.char).toBeNull();
            expect(row.varchar).toBeNull();
            expect(row.binary).toBeNull();
            expect(row.varbinary).toBeNull();
            expect(row.tinyblob).toBeNull();
            expect(row.tinytext).toBeNull();
            expect(row.text).toBeNull();
            expect(row.blob).toBeNull();
            expect(row.mediumtext).toBeNull();
            expect(row.mediumblob).toBeNull();
            expect(row.longtext).toBeNull();
            expect(row.longblob).toBeNull();
            expect(row.enum).toBeNull();
            expect(row.set).toBeNull();
            expect(row.bit).toBeNull();
            expect(row.tinyint).toBeNull();
            expect(row.bool).toBeNull();
            expect(row.boolean).toBeNull();
            expect(row.smallint).toBeNull();
            expect(row.mediumint).toBeNull();
            expect(row.int).toBeNull();
            expect(row.integer).toBeNull();
            expect(row.bigint).toBeNull();
            expect(row.decimal).toBeNull();
            expect(row.dec).toBeNull();
            expect(row.float).toBeNull();
            expect(row.double).toBeNull();
            expect(row.double_precision).toBeNull();
            expect(row.tinyint_zero).toBeNull();
            expect(row.smallint_zero).toBeNull();
            expect(row.mediumint_zero).toBeNull();
            expect(row.int_zero).toBeNull();
            expect(row.integer_zero).toBeNull();
            expect(row.bigint_zero).toBeNull();
            expect(row.decimal_zero).toBeNull();
            expect(row.dec_zero).toBeNull();
            expect(row.float_zero).toBeNull();
            expect(row.double_zero).toBeNull();
            expect(row.double_precision_zero).toBeNull();
            expect(row.date).toBeNull();
            expect(row.datetime).toBeNull();
            expect(row.timestamp).toBeNull();
            expect(row.time).toBeNull();
            expect(row.year).toBeNull();
            expect(row.geometry).toBeNull();
            expect(row.point).toBeNull();
            expect(row.linestring).toBeNull();
            expect(row.polygon).toBeNull();
            expect(row.multipoint).toBeNull();
            expect(row.multilinestring).toBeNull();
            expect(row.multipolygon).toBeNull();
            expect(row.geometrycollection).toBeNull();
            expect(row.floatp).toBeNull();
            expect(row.floatp_zero).toBeNull();
            if (isMysqlGreatearThen56()) {
                expect(row.json).toBeNull();
            }

            row = query.fetchDictionary().get() as { [key: string]: ValidBindings };
            expect(row.char).toBe('c');
            expect(row.varchar).toBe('varchar');
            expect(row.binary).toEqual(Buffer.concat([Buffer.from('1'), Buffer.from([0x00, 0x00])]));
            expect(row.varbinary?.toString()).toEqual('101');
            expect(row.tinyblob).toEqual(Buffer.from('tinyblob'));
            expect(row.tinytext).toBe('tinytext');
            expect(row.text).toBe('text');
            expect(row.blob).toEqual(Buffer.from('blob'));
            expect(row.mediumtext).toBe('mediumtext');
            expect(row.mediumblob).toEqual(Buffer.from('mediumblob'));
            expect(row.longtext).toBe('longtext');
            expect(row.longblob).toEqual(Buffer.from('longblob'));
            expect(row.enum).toBe('x-small');
            expect(row.set).toBe('a,b,c,d');
            expect(row.bit).toEqual(Buffer.from([0x01]));
            expect(row.tinyint).toBe(1);
            expect(row.bool).toBe(0);
            expect(row.boolean).toBe(1);
            expect(row.smallint).toBe(3);
            expect(row.mediumint).toBe(45);
            expect(row.int).toBe(1090);
            expect(row.integer).toBe(1090);
            expect(row.bigint).toEqual(BigInt('9223372036854775807'));
            expect(row.decimal).toBe('12345.678900000000000000000000000000');
            expect(row.dec).toBe('98765.432100000000000000000000000000');
            expect(row.float).toBe('12345678906183670000000000000000000.000000000000000000000000000000');
            expect(row.double).toBe('12345678901234570000000000000000000.000000000000000000000000000000');
            expect(row.double_precision).toBe('12345678901234570000000000000000000.000000000000000000000000000000');
            expect(row.tinyint_zero).toBe('001');
            expect(row.smallint_zero).toBe('00002');
            expect(row.mediumint_zero).toBe('0000003');
            expect(row.int_zero).toBe('0000000004');
            expect(row.integer_zero).toBe('0000000005');
            expect(row.bigint_zero).toBe('00009007199254740992');
            expect(row.decimal_zero).toBe('00000000000000000000000000000000001.200000000000000000000000000000');
            expect(row.dec_zero).toBe('00000000000000000000000000000000001.300000000000000000000000000000');
            expect(row.float_zero).toBe('0000000000000000000000000000000001.399999976158142000000000000000');
            expect(row.double_zero).toBe('0000000000000000000000000000000001.500000000000000000000000000000');
            expect(row.double_precision_zero).toBe('0000000000000000000000000000000001.600000000000000000000000000000');
            expect(row.date).toBe(isMariaGreaterThen1009() ? '2023-01-01 00:00:00' : '2023-01-01');
            expect(row.datetime).toBe('2023-01-01 23:22:20.999999');
            expect(row.timestamp).toBe('2023-01-01 23:22:20.123');
            expect(row.time).toBe('838:59:59');
            expect(row.year).toBe('2023');
            expect(row.geometry).toBe('{"x":1,"y":1}');
            expect(row.point).toBe('{"x":1,"y":1}');
            expect(row.linestring).toBe('[{"x":0,"y":0},{"x":1,"y":1},{"x":2,"y":2}]');
            expect(row.polygon).toBe(
                '[[{"x":0,"y":0},{"x":10,"y":0},{"x":10,"y":10},{"x":0,"y":10},{"x":0,"y":0}],[{"x":5,"y":5},{"x":7,"y":5},{"x":7,"y":7},{"x":5,"y":7},{"x":5,"y":5}]]'
            );
            expect(row.multipoint).toBe('[{"x":0,"y":0},{"x":20,"y":20},{"x":60,"y":60}]');
            expect(row.multilinestring).toBe('[[{"x":10,"y":10},{"x":20,"y":20}],[{"x":15,"y":15},{"x":30,"y":15}]]');
            expect(row.multipolygon).toBe(
                '[[[{"x":0,"y":0},{"x":10,"y":0},{"x":10,"y":10},{"x":0,"y":10},{"x":0,"y":0}]],[[{"x":5,"y":5},{"x":7,"y":5},{"x":7,"y":7},{"x":5,"y":7},{"x":5,"y":5}]]]'
            );
            expect(row.geometrycollection).toBe(
                '[{"x":1,"y":1},[{"x":0,"y":0},{"x":1,"y":1},{"x":2,"y":2},{"x":3,"y":3},{"x":4,"y":4}]]'
            );
            expect(row.floatp).toBe('1.2345678901234568e89');
            expect(row.floatp_zero).toBe('00000000000000000001.7');
            if (isMysqlGreatearThen56()) {
                expect(row.json).toBe('{"foo": {"bar": "baz"}}');
            }

            await pdo.disconnect();
        });
    } else {
        it('Works All Columns Types', async () => {
            const pdo = new Pdo(pdoData.driver, pdoData.config, {
                created: async (uuid, connection) => {
                    await connection.query("SET time_zone='UTC';");
                }
            });
            const stmt = await pdo.prepare(
                'INSERT INTO types (`char`,`varchar`,`binary`,`varbinary`,`tinyblob`,`tinytext`,`text`,`blob`,`mediumtext`,`mediumblob`,`longtext`,`longblob`,`enum`,`set`,`bit`,`tinyint`,`bool`,`boolean`,`smallint`,`mediumint`,`int`,`integer`,`bigint`,`decimal`,`dec`,`float`,`double`,`double_precision`,`tinyint_zero`,`smallint_zero`,`mediumint_zero`,`int_zero`,`integer_zero`,`bigint_zero`,`decimal_zero`,`dec_zero`,`float_zero`,`double_zero`,`double_precision_zero`,`date`,`datetime`,`timestamp`,`time`,`year`,`geometry`,`point`,`linestring`,`polygon`,`multipoint`,`multilinestring`,`multipolygon`,`geometrycollection`,`json`,`char_byte`,`long`,`long_varchar`,`int1`,`int2`,`int3`,`int4`,`int8`,`numeric`,`fixed`,`real`' +
                    (isMariaGreaterThen1004() ? ',`inet6`' : '') +
                    (isMariaGreaterThen1006() ? ',`uuid`' : '') +
                    (isMariaGreaterThen1009() ? ',`inet4`,`number`' : '') +
                    ')' +
                    ' VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,ST_GeomFromText(?),ST_GeomFromText(?),ST_GeomFromText(?),ST_GeomFromText(?),ST_GeomFromText(?),ST_GeomFromText(?),ST_GeomFromText(?),ST_GeomFromText(?),?,?,?,?,?,?,?,?,?,?,?,?' +
                    (isMariaGreaterThen1004() ? ',?' : '') +
                    (isMariaGreaterThen1006() ? ',?' : '') +
                    (isMariaGreaterThen1009() ? ',?,?' : '') +
                    ')'
            );

            let params: ValidBindings = [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ];

            if (isMariaGreaterThen1004()) {
                params.push(null);
            }
            if (isMariaGreaterThen1006()) {
                params.push(null);
            }
            if (isMariaGreaterThen1009()) {
                params.push(null, null);
            }

            await stmt.execute(params);

            params = [
                'c',
                'varchar',
                '1',
                '101',
                Buffer.from('tinyblob'),
                'tinytext',
                'text',
                Buffer.from('blob'),
                'mediumtext',
                Buffer.from('mediumblob'),
                'longtext',
                Buffer.from('longblob'),
                'x-small',
                'a,b,c,d',
                0x01,
                1,
                false,
                true,
                3,
                45,
                1090,
                1090,
                BigInt('9223372036854775807'),
                '12345.67890',
                '98765.43210',
                '12345678901234567890123456789012345.123456789012345678901234567890',
                '12345678901234567890123456789012345.123456789012345678901234567890',
                '12345678901234567890123456789012345.123456789012345678901234567890',
                1,
                2,
                3,
                4,
                5,
                BigInt('9007199254740992'),
                '1.2',
                '1.3',
                '1.4',
                '1.5',
                '1.6',
                new Date('2023-01-01'),
                '2023-01-01 23:22:20.999999',
                new Date(Date.UTC(2023, 0, 1, 23, 22, 20, 123)),
                '838:59:59',
                '2023',
                'POINT(1 1)',
                'POINT(1 1)',
                'LINESTRING(0 0,1 1,2 2)',
                'POLYGON((0 0,10 0,10 10,0 10,0 0),(5 5,7 5,7 7,5 7, 5 5))',
                'MULTIPOINT(0 0, 20 20, 60 60)',
                'MULTILINESTRING((10 10, 20 20), (15 15, 30 15))',
                'MULTIPOLYGON(((0 0,10 0,10 10,0 10,0 0)),((5 5,7 5,7 7,5 7, 5 5)))',
                'GEOMETRYCOLLECTION(POINT(1 1),LINESTRING(0 0,1 1,2 2,3 3,4 4))',
                '{"foo": {"bar":"baz"}}',
                'c',
                'long',
                'long_varchar',
                1,
                3,
                45,
                1090,
                BigInt('-9223372036854775807'),
                '12345678901234567890123456789012345.123456789012345678901234567890',
                '12345678901234567890123456789012345.123456789012345678901234567890',
                '12345678901234567890123456789012345.123456789012345678901234567890'
            ];

            if (isMariaGreaterThen1004()) {
                params.push('2001:db8::ff00:42:8329');
            }
            if (isMariaGreaterThen1006()) {
                params.push('a0ee-bc99-9c0b-4ef8-bb6d-6bb9-bd38-0a11');
            }
            if (isMariaGreaterThen1009()) {
                params.push('192.168.0.1', '12345678901234567890123456789012345.123456789012345678901234567890');
            }

            await stmt.execute(params);

            await stmt.close();

            const query = await pdo.query('SELECT * FROM types LIMIT 2;');

            let row = query.fetchDictionary().get() as { [key: string]: ValidBindings };
            expect(row.char).toBeNull();
            expect(row.varchar).toBeNull();
            expect(row.binary).toBeNull();
            expect(row.varbinary).toBeNull();
            expect(row.tinyblob).toBeNull();
            expect(row.tinytext).toBeNull();
            expect(row.text).toBeNull();
            expect(row.blob).toBeNull();
            expect(row.mediumtext).toBeNull();
            expect(row.mediumblob).toBeNull();
            expect(row.longtext).toBeNull();
            expect(row.longblob).toBeNull();
            expect(row.enum).toBeNull();
            expect(row.set).toBeNull();
            expect(row.bit).toBeNull();
            expect(row.tinyint).toBeNull();
            expect(row.bool).toBeNull();
            expect(row.boolean).toBeNull();
            expect(row.smallint).toBeNull();
            expect(row.mediumint).toBeNull();
            expect(row.int).toBeNull();
            expect(row.integer).toBeNull();
            expect(row.bigint).toBeNull();
            expect(row.decimal).toBeNull();
            expect(row.dec).toBeNull();
            expect(row.float).toBeNull();
            expect(row.double).toBeNull();
            expect(row.double_precision).toBeNull();
            expect(row.tinyint_zero).toBeNull();
            expect(row.smallint_zero).toBeNull();
            expect(row.mediumint_zero).toBeNull();
            expect(row.int_zero).toBeNull();
            expect(row.integer_zero).toBeNull();
            expect(row.bigint_zero).toBeNull();
            expect(row.decimal_zero).toBeNull();
            expect(row.dec_zero).toBeNull();
            expect(row.float_zero).toBeNull();
            expect(row.double_zero).toBeNull();
            expect(row.double_precision_zero).toBeNull();
            expect(row.date).toBeNull();
            expect(row.datetime).toBeNull();
            expect(row.timestamp).toBeNull();
            expect(row.time).toBeNull();
            expect(row.year).toBeNull();
            expect(row.geometry).toBeNull();
            expect(row.point).toBeNull();
            expect(row.linestring).toBeNull();
            expect(row.polygon).toBeNull();
            expect(row.multipoint).toBeNull();
            expect(row.multilinestring).toBeNull();
            expect(row.multipolygon).toBeNull();
            expect(row.geometrycollection).toBeNull();
            expect(row.json).toBeNull();
            expect(row.char_byte).toBeNull();
            expect(row.long).toBeNull();
            expect(row.long_varchar).toBeNull();
            expect(row.int1).toBeNull();
            expect(row.int2).toBeNull();
            expect(row.int3).toBeNull();
            expect(row.int4).toBeNull();
            expect(row.int8).toBeNull();
            expect(row.numeric).toBeNull();
            expect(row.fixed).toBeNull();
            expect(row.real).toBeNull();
            if (isMariaGreaterThen1004()) {
                expect(row.inet6).toBeNull();
            }
            if (isMariaGreaterThen1006()) {
                expect(row.uuid).toBeNull();
            }
            if (isMariaGreaterThen1009()) {
                expect(row.inet4).toBeNull();
                expect(row.number).toBeNull();
            }

            row = query.fetchDictionary().get() as { [key: string]: ValidBindings };
            expect(row.char).toBe('c');
            expect(row.varchar).toBe('varchar');
            expect(row.binary).toEqual(Buffer.concat([Buffer.from('1'), Buffer.from([0x00, 0x00])]));
            expect(row.varbinary?.toString()).toEqual('101');
            expect(row.tinyblob).toEqual(Buffer.from('tinyblob'));
            expect(row.tinytext).toBe('tinytext');
            expect(row.text).toBe('text');
            expect(row.blob).toEqual(Buffer.from('blob'));
            expect(row.mediumtext).toBe('mediumtext');
            expect(row.mediumblob).toEqual(Buffer.from('mediumblob'));
            expect(row.longtext).toBe('longtext');
            expect(row.longblob).toEqual(Buffer.from('longblob'));
            expect(row.enum).toBe('x-small');
            expect(row.set).toBe('a,b,c,d');
            expect(row.bit).toEqual(Buffer.from([0x01]));
            expect(row.tinyint).toBe(1);
            expect(row.bool).toBe(0);
            expect(row.boolean).toBe(1);
            expect(row.smallint).toBe(3);
            expect(row.mediumint).toBe(45);
            expect(row.int).toBe(1090);
            expect(row.integer).toBe(1090);
            expect(row.bigint).toEqual(BigInt('9223372036854775807'));
            expect(row.decimal).toBe('12345.678900000000000000000000000000');
            expect(row.dec).toBe('98765.432100000000000000000000000000');
            expect(row.float).toBe('12345678906183670000000000000000000.000000000000000000000000000000');
            expect(row.double).toBe('12345678901234570000000000000000000.000000000000000000000000000000');
            expect(row.double_precision).toBe('12345678901234570000000000000000000.000000000000000000000000000000');
            expect(row.tinyint_zero).toBe('001');
            expect(row.smallint_zero).toBe('00002');
            expect(row.mediumint_zero).toBe('0000003');
            expect(row.int_zero).toBe('0000000004');
            expect(row.integer_zero).toBe('0000000005');
            expect(row.bigint_zero).toBe('00009007199254740992');
            expect(row.decimal_zero).toBe('00000000000000000000000000000000001.200000000000000000000000000000');
            expect(row.dec_zero).toBe('00000000000000000000000000000000001.300000000000000000000000000000');
            expect(row.float_zero).toBe('0000000000000000000000000000000001.399999976158142000000000000000');
            expect(row.double_zero).toBe('0000000000000000000000000000000001.500000000000000000000000000000');
            expect(row.double_precision_zero).toBe('0000000000000000000000000000000001.600000000000000000000000000000');
            expect(row.date).toBe(isMariaGreaterThen1009() ? '2023-01-01 00:00:00' : '2023-01-01');
            expect(row.datetime).toBe('2023-01-01 23:22:20.999999');
            expect(row.timestamp).toBe('2023-01-01 23:22:20.123');
            expect(row.time).toBe('838:59:59');
            expect(row.year).toBe('2023');
            expect(row.geometry).toBe('{"x":1,"y":1}');
            expect(row.point).toBe('{"x":1,"y":1}');
            expect(row.linestring).toBe('[{"x":0,"y":0},{"x":1,"y":1},{"x":2,"y":2}]');
            expect(row.polygon).toBe(
                '[[{"x":0,"y":0},{"x":10,"y":0},{"x":10,"y":10},{"x":0,"y":10},{"x":0,"y":0}],[{"x":5,"y":5},{"x":7,"y":5},{"x":7,"y":7},{"x":5,"y":7},{"x":5,"y":5}]]'
            );
            expect(row.multipoint).toBe('[{"x":0,"y":0},{"x":20,"y":20},{"x":60,"y":60}]');
            expect(row.multilinestring).toBe('[[{"x":10,"y":10},{"x":20,"y":20}],[{"x":15,"y":15},{"x":30,"y":15}]]');
            expect(row.multipolygon).toBe(
                '[[[{"x":0,"y":0},{"x":10,"y":0},{"x":10,"y":10},{"x":0,"y":10},{"x":0,"y":0}]],[[{"x":5,"y":5},{"x":7,"y":5},{"x":7,"y":7},{"x":5,"y":7},{"x":5,"y":5}]]]'
            );
            expect(row.geometrycollection).toBe(
                '[{"x":1,"y":1},[{"x":0,"y":0},{"x":1,"y":1},{"x":2,"y":2},{"x":3,"y":3},{"x":4,"y":4}]]'
            );
            expect(row.json).toBe('{"foo": {"bar":"baz"}}');
            expect(row.char_byte).toEqual(Buffer.from('c'));
            expect(row.long).toBe('long');
            expect(row.long_varchar).toBe('long_varchar');
            expect(row.int4).toBe(1090);
            expect(row.int1).toBe(1);
            expect(row.int2).toBe(3);
            expect(row.int3).toBe(45);
            expect(row.int8).toEqual(BigInt('-9223372036854775807'));
            expect(row.numeric).toBe('12345678901234567890123456789012345.123456789012345678901234567890');
            expect(row.fixed).toBe('12345678901234567890123456789012345.123456789012345678901234567890');
            expect(row.real).toBe('12345678901234570000000000000000000.000000000000000000000000000000');
            if (isMariaGreaterThen1004()) {
                expect(row.inet6).toBe('2001:db8::ff00:42:8329');
            }
            if (isMariaGreaterThen1006()) {
                expect(row.uuid).toBe('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11');
            }
            if (isMariaGreaterThen1009()) {
                expect(row.inet4).toBe('192.168.0.1');
                expect(row.number).toBe('12345678901234567890123456789012345.123456789012345678901234567890');
            }

            await pdo.disconnect();
        });
    }
});
