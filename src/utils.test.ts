import { FieldPacket, RowDataPacket } from 'mysql2';

import { applyPadToRow, geometryToJson } from './utils';

describe('Utils', () => {
  it('Works apply Pad To Row', async () => {
    const row = [
      1,
      -1,
      BigInt('1000'),
      BigInt('9007199254740992'),
      BigInt('-9007199254740992'),
      '1234.667',
      '-1234.667',
      1,
      -1,
      BigInt('1000'),
      BigInt('9007199254740992'),
      BigInt('-9007199254740992'),
      '1234.667',
      '-1234.667',
      null,
      Buffer.from('text'),
    ];
    let fields: { flags?: number; columnLength?: number }[] = [];

    expect(
      applyPadToRow(row as RowDataPacket[], fields as FieldPacket[]),
    ).toEqual(row);
    fields = [
      { flags: 64, columnLength: 10 },
      { flags: 64, columnLength: 10 },
      { flags: 64, columnLength: 20 },
      { flags: 64, columnLength: 20 },
      { flags: 64, columnLength: 20 },
      { flags: 64, columnLength: 15 },
      { flags: 64, columnLength: 15 },
      { flags: 64 },
      { flags: 64 },
      { flags: 32 },
      { flags: 128 },
      {},
    ];
    expect(
      applyPadToRow(row as RowDataPacket[], fields as FieldPacket[]),
    ).toEqual([
      '0000000001',
      '-0000000001',
      '00000000000000001000',
      '00009007199254740992',
      '-00009007199254740992',
      '00000001234.667',
      '-00000001234.667',
      1,
      -1,
      BigInt('1000'),
      BigInt('9007199254740992'),
      BigInt('-9007199254740992'),
      '1234.667',
      '-1234.667',
      null,
      Buffer.from('text'),
    ]);
  });

  it('Works Geometry To Json', () => {
    expect(geometryToJson('string')).toBe('string');
    expect(geometryToJson({ x: 1, y: 1 })).toBe('{"x":1,"y":1}');
  });
});
