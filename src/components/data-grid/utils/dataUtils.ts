import type { SortDirection, FilterItem, ColumnDef, ColumnType } from '../DataGrid.types';

/**
 * Safely accesses nested properties in an object.
 * @example getNestedValue(user, 'hair.color')
 */
export const getNestedValue = (obj: any, path: string): any => {
    if (!obj || !path) return undefined;
    if (!path.includes('.')) return obj[path];
    return path.split('.').reduce((o, key) => (o ? o[key] : undefined), obj);
};

/**
 * Gets the value of a cell, handling valueGetter and nested fields.
 * Centralizes logic from DataGrid.utils.ts
 */
export const getCellValue = (row: any, column: ColumnDef<any>): any => {
    if (column.valueGetter) {
        return column.valueGetter(row);
    }
    return getNestedValue(row, String(column.field));
};

/**
 * Checks if a value is effectively empty (null, undefined, or empty string)
 */
export const isEmpty = (value: any): boolean => {
    return value === null || value === undefined || value === '';
};

/**
 * Standardizes values for case-insensitive string comparison.
 */
export const normalizeString = (value: any): string => {
    if (value === null || value === undefined) return '';
    return String(value).toLowerCase();
};

/**
 * Standard Formatters used for Display and Search.
 * Mimics DataGrid.defaults.tsx logic.
 */
export const valueFormatters: Partial<Record<ColumnType, (val: any) => string>> = {
    currency: (val) => typeof val === 'number' ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val) : String(val),
    percent: (val) => typeof val === 'number' ? `${(val * 100).toFixed(1)}%` : String(val),
    date: (val) => val instanceof Date ? val.toLocaleDateString() : String(val),
    datetime: (val) => val instanceof Date ? val.toLocaleString() : String(val),
    time: (val) => val instanceof Date ? val.toLocaleTimeString() : String(val),
    boolean: (val) => val ? 'Yes' : 'No',
    checkbox: (val) => val ? 'true' : 'false' // For search text matching
};

/**
 * Gets the display value of a cell for searching.
 * If a custom render function fits, we can't easily guess the output without rendering (too expensive/unsafe).
 * But for standard types, we can format it.
 */
export const getFormattedValue = (value: any, column?: ColumnDef<any>): string => {
    if (!column) return String(value);

    // If there's a custom render, we fallback to raw value because we can't execute React render for search text
    // Exception: If the user provides a 'valueFormatter' in the future (good practice for DataGrids).

    // Check standard type formatters
    if (column.valueFormatter) {
        return column.valueFormatter(value);
    }

    if (column.type && valueFormatters[column.type]) {
        return valueFormatters[column.type]!(value);
    }

    return String(value ?? '');
};

/**
 * Type-aware comparator for sorting.
 * Handles Numbers, Dates, and Strings correctly.
 */
export const compareValues = (a: any, b: any, direction: SortDirection): number => {
    if (a === b) return 0;

    // Handle nulls: null/undefined always go to the bottom
    if (a === null || a === undefined) return 1;
    if (b === null || b === undefined) return -1;

    // Numeric Comparison
    if (typeof a === 'number' && typeof b === 'number') {
        return direction === 'asc' ? a - b : b - a;
    }

    // Date Comparison
    if (a instanceof Date && b instanceof Date) {
        return direction === 'asc' ? a.getTime() - b.getTime() : b.getTime() - a.getTime();
    }

    // String Comparison (Default)
    const strA = normalizeString(a);
    const strB = normalizeString(b);

    if (strA < strB) return direction === 'asc' ? -1 : 1;
    if (strA > strB) return direction === 'asc' ? 1 : -1;
    return 0;
};

/**
 * Checks if a row value matches the given filter item.
 */
export const matchesFilter = (rowValue: any, filter: FilterItem): boolean => {
    const val = normalizeString(rowValue);
    const filterVal = normalizeString(filter.value);

    switch (filter.operator) {
        case 'contains':
            return val.includes(filterVal);
        case 'equals':
            return val === filterVal;
        case 'startsWith':
            return val.startsWith(filterVal);
        case 'endsWith':
            return val.endsWith(filterVal);
        case 'isAnyOf':
            if (Array.isArray(filter.value)) {
                return filter.value.some((v: any) => normalizeString(v) === val);
            }
            return val === filterVal;
        case 'isEmpty':
            return isEmpty(rowValue);
        case 'isNotEmpty':
            return !isEmpty(rowValue);
        default:
            return true;
    }
};

/**
 * Checks if a row matches the global search string.
 * Now supports formatted values (e.g. searching "$1,000" finds number 1000).
 * 
 * @param row The data object
 * @param search The search string
 * @param columns The column definitions (needed for formatting)
 * @param specificField If provided, only searches this field
 */
export const matchesSearch = (row: any, search: string, columns: ColumnDef<any>[], specificField?: string): boolean => {
    if (!search) return true;

    const searchLower = normalizeString(search);

    // Determine fields to check
    const columnsToCheck = specificField && specificField !== 'all'
        ? columns.filter(c => String(c.field) === specificField)
        : columns; // Search all columns

    return columnsToCheck.some(col => {
        const rawValue = getNestedValue(row, String(col.field));

        // 1. Check Raw Value
        if (normalizeString(rawValue).includes(searchLower)) {
            return true;
        }

        // 2. Check Formatted Value (e.g. Currency, Percent, Date)
        const formattedValue = getFormattedValue(rawValue, col);
        if (normalizeString(formattedValue).includes(searchLower)) {
            return true;
        }

        return false;
    });
};
