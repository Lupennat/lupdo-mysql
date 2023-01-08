import PdoColumnValue from 'lupdo/dist/typings/types/pdo-column-value';
import PdoRowData from 'lupdo/dist/typings/types/pdo-raw-data';
import { FieldPacket, RowDataPacket } from 'mysql2';
interface FieldPacketColumnLength extends FieldPacket {
    columnLength: number;
}
function applyPad(value: PdoColumnValue, field?: FieldPacketColumnLength): PdoColumnValue {
    if (field == null) {
        return value;
    }

    if (
        (typeof value === 'number' || typeof value === 'bigint' || typeof value === 'string') &&
        field.flags &&
        field.flags >= 64 &&
        field.flags < 128
    ) {
        const columnLength = field.columnLength || 0;
        const negative = value < 0;
        const str = value.toString().replace('-', '');

        if (columnLength > 0) {
            return (negative ? '-' : '') + str.padStart(columnLength, '0');
        }
    }
    return value;
}

export function applyPadToRow(row: RowDataPacket[], columns: FieldPacket[]): PdoRowData {
    return row.map((row: RowDataPacket, index: number) => {
        return applyPad(row as PdoColumnValue, columns[index] as FieldPacketColumnLength);
    });
}

export function geometryToJson(value: string | Object): string {
    return typeof value === 'string' ? value : JSON.stringify(value);
}
