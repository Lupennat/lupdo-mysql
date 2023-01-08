import PdoColumnValue from 'lupdo/dist/typings/types/pdo-column-value';
import { geometryToJson } from './utils';

export default function (field: any, next: () => void): PdoColumnValue | void {
    if (field.type === 'LONGLONG') {
        const value = field.string();
        if (value === null) {
            return null;
        }
        const bigint = BigInt(value);
        if (bigint > Number.MAX_SAFE_INTEGER || bigint < Number.MIN_SAFE_INTEGER) {
            return bigint;
        }
        return Number(value);
    }

    if (field.type === 'JSON') {
        // MYSQL JSON TYPE IS DIFFERENT FROM MARIADB
        return field.string();
    }

    if (field.type === 'TIMESTAMP' || field.type === 'DATETIME' || field.type === 'DATE') {
        return field.string();
    }

    if (field.type === 'FLOAT' || field.type === 'DOUBLE') {
        return field.string();
    }

    if (field.type === 'GEOMETRY') {
        const value = field.geometry();
        if (value === null) {
            return null;
        }
        return geometryToJson(value);
    }

    return next();
}
