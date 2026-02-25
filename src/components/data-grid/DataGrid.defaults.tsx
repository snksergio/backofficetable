import type { ColumnType } from './DataGrid.types';
import React from 'react';
import { dataGridStyles } from './DataGrid.styles';

const styles = dataGridStyles();

export interface ColumnTypeConfig {
    width: number;
    ellipsis: boolean;
    autoWidth?: boolean; // If true, calculates width based on content sampling
    formatter?: (value: any) => React.ReactNode;
    sortable?: boolean;
    resizable?: boolean;
    enableColumnMenu?: boolean;
}

export const COLUMN_TYPE_DEFAULTS: Record<ColumnType, ColumnTypeConfig> = {
    id: { width: 70, ellipsis: true, autoWidth: true },
    number: { width: 100, ellipsis: true, autoWidth: true },
    currency: {
        width: 120,
        ellipsis: true,
        autoWidth: true,
        formatter: (val) => typeof val === 'number' ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val) : val
    },
    percent: {
        width: 100,
        ellipsis: true,
        autoWidth: true,
        formatter: (val) => typeof val === 'number' ? `${(val * 100).toFixed(1)}%` : val
    },
    date: {
        width: 120,
        ellipsis: true,
        formatter: (val) => val instanceof Date ? val.toLocaleDateString() : val
    },
    datetime: {
        width: 180,
        ellipsis: true,
        formatter: (val) => val instanceof Date ? val.toLocaleString() : val
    },
    time: {
        width: 100,
        ellipsis: true,
        formatter: (val) => val instanceof Date ? val.toLocaleTimeString() : val
    },
    text: { width: 150, ellipsis: true, autoWidth: true },
    longText: { width: 300, ellipsis: true, autoWidth: true },
    status: { width: 120, ellipsis: true },
    boolean: {
        width: 80,
        ellipsis: false,
        formatter: (val) => val ? 'Yes' : 'No'
    },
    actions: { width: 50, ellipsis: false },
    user: { width: 200, ellipsis: true, autoWidth: true },
    tags: { width: 150, ellipsis: false, autoWidth: true },
    link: {
        width: 200,
        ellipsis: true,
        autoWidth: true
    },
    checkbox: {
        width: 60,
        ellipsis: false,
        sortable: false,
        resizable: false,
        enableColumnMenu: false,
        formatter: (val) => <input type="checkbox" checked={!!val} readOnly className={styles.defaultCheckbox()} />
    }
};

export const getColumnConfig = (type: ColumnType = 'text'): ColumnTypeConfig => {
    return COLUMN_TYPE_DEFAULTS[type] || COLUMN_TYPE_DEFAULTS.text;
};
