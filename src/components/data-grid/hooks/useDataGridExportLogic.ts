
import { useCallback } from 'react';
import { useDataGridExport } from './useDataGridExport';
import type { ColumnDef } from '../DataGrid.types';

interface UseDataGridExportLogicProps<T> {
    isServerSide: boolean;
    queryRows?: T[];
    rawRows: T[];
    processedRows: T[];
    selection: {
        isRowSelected: (row: T) => boolean;
        selectedCount: number;
    };
    columns: ColumnDef<T>[];
}

export const useDataGridExportLogic = <T extends object>({
    isServerSide,
    queryRows,
    rawRows,
    processedRows,
    selection,
    columns
}: UseDataGridExportLogicProps<T>) => {
    const { exportToCsv } = useDataGridExport<T>();

    const handleExport = useCallback((type: 'all' | 'filtered' | 'selected') => {
        let dataToExport: T[] = [];

        if (isServerSide) {
            // Server Side Best Effort (Only what's in memory)
            const visibleData = queryRows || [];
            if (type === 'selected') {
                dataToExport = visibleData.filter(r => selection.isRowSelected(r));
            } else {
                // 'all' or 'filtered' both mean the current server response (which is likely filtered/paginated)
                dataToExport = visibleData;
            }
        } else {
            // Client Side
            if (type === 'selected') {
                // Export all selected items (even those on other pages)
                dataToExport = rawRows.filter(r => selection.isRowSelected(r));
            } else if (type === 'filtered') {
                dataToExport = processedRows;
            } else {
                // 'all'
                dataToExport = rawRows;
            }
        }

        exportToCsv(dataToExport, columns);
    }, [isServerSide, queryRows, rawRows, processedRows, selection, columns, exportToCsv]);

    return { handleExport };
};
