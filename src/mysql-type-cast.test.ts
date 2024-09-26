import mysqlTypeCast from './mysql-type-cast';

describe('Mysql Cast', () => {
  const fakeField = {
    type: 'VAR_STRING',
    length: 1020,
    db: 'test_db',
    table: 'users',
    name: 'gender',
    string: jest.fn(),
    buffer: jest.fn(),
    geometry: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it.each([
    {
      test: 'when null value',
      value: null,
      res: null,
    },
    {
      test: 'when value = Number.MAX_SAFE_INTEGER',
      value: '9007199254740991',
      res: 9007199254740991,
    },
    {
      test: 'when value > Number.MAX_SAFE_INTEGER',
      value: '9007199254740992',
      res: BigInt('9007199254740992'),
    },
    {
      test: 'when value = Number.MIN_SAFE_INTEGER',
      value: '-9007199254740991',
      res: -9007199254740991,
    },
    {
      test: 'when value < Number.MIN_SAFE_INTEGER',
      value: '-9007199254740992',
      res: BigInt('-9007199254740992'),
    },
  ])('Works cast LONGLONG field $test', ({ value, res }) => {
    fakeField.string.mockReturnValueOnce(value);
    expect(mysqlTypeCast({ ...fakeField, type: 'LONGLONG' }, () => {})).toEqual(
      res,
    );
    expect(fakeField.string).toHaveBeenCalledTimes(1);
  });

  it.each(['TIMESTAMP', 'DATETIME', 'DATE', 'FLOAT', 'DOUBLE'] as const)(
    'works cast %s field',
    (type) => {
      fakeField.string.mockReturnValueOnce(type);
      expect(mysqlTypeCast({ ...fakeField, type }, () => {})).toEqual(type);
      expect(fakeField.string).toHaveBeenCalledTimes(1);
    },
  );

  it('works cast JSON field', () => {
    fakeField.string.mockReturnValueOnce('JSON');
    expect(mysqlTypeCast({ ...fakeField, type: 'JSON' }, () => {})).toEqual(
      'JSON',
    );
    expect(fakeField.string).toHaveBeenCalledTimes(1);
    expect(fakeField.string).toHaveBeenCalledWith('utf8');
  });
});
