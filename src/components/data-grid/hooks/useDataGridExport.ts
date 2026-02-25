
import { useCallback } from 'react';
import type { ColumnDef } from '../DataGrid.types';



export const useDataGridExport = <T extends object>() => {
    const exportToCsv = useCallback((rows: T[], columns: ColumnDef<T>[], fileName: string = 'export') => {
        if (!rows.length) return;

        // 1. Get Headers
        const headers = columns
            .filter(col => col.field !== 'actions' && col.type !== 'actions') // Skip action columns
            .map(col => `"${col.headerName || String(col.field)}"`);

        // 2. Map Rows
        const csvRows = rows.map(row => {
            return columns
                .filter(col => col.field !== 'actions' && col.type !== 'actions')
                .map(col => {
                    let value: any;

                    // Support valueGetter
                    if (col.valueGetter) {
                        value = col.valueGetter(row);
                    } else {
                        // Support nested properties (dot notation)
                        const fieldPath = (col.field as string).split('.');
                        value = fieldPath.reduce((obj: any, key) => obj?.[key], row);
                    }

                    // Handle null/undefined
                    if (value === null || value === undefined) {
                        return '""';
                    }

                    // Handle objects/arrays (stringify)
                    if (typeof value === 'object') {
                        value = JSON.stringify(value);
                    }

                    // Escape quotes and wrap in quotes
                    const stringValue = String(value).replace(/"/g, '""');
                    return `"${stringValue}"`;
                })
                .join(',');
        });

        // 3. Assemble CSV
        const csvContent = [headers.join(','), ...csvRows].join('\n');

        // 4. Trigger Download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `${fileName}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, []);

    return { exportToCsv };
};
