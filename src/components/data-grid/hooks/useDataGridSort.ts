import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import type { SortDirection, ColumnDef, SortModel } from '../DataGrid.types';
import { getCellValue } from '../DataGrid.utils';

interface UseDataGridSortProps<T> {
    rows: T[];
    effectiveColumns: ColumnDef<T>[];
    sortMode?: 'client' | 'server';
    sortModel?: SortModel | null;
    onSortModelChange?: (model: SortModel | null) => void;
}

export const useDataGridSort = <T>({
    rows,
    effectiveColumns,
    sortMode = 'client',
    sortModel: controlledModel,
    onSortModelChange
}: UseDataGridSortProps<T>) => {
    const [internalModel, setInternalModel] = useState<SortModel | null>(null);

    const isControlled = controlledModel !== undefined;
    const sortConfig = isControlled ? controlledModel : internalModel;

    const sortConfigRef = useRef(sortConfig);
    useEffect(() => { sortConfigRef.current = sortConfig; }, [sortConfig]);

    const handleSort = useCallback((field: string, direction?: SortDirection) => {
        let newModel: SortModel | null = null;
        const currentConfig = sortConfigRef.current;

        // Calculate new sort config based on current state or provided direction
        if (direction !== undefined) {
            newModel = direction === null ? null : { field, direction };
        } else {
            // Cycle: asc -> desc -> null
            if (currentConfig?.field === field) {
                if (currentConfig.direction === 'asc') newModel = { field, direction: 'desc' };
                else if (currentConfig.direction === 'desc') newModel = null;
                else newModel = { field, direction: 'asc' };
            } else {
                newModel = { field, direction: 'asc' };
            }
        }

        if (!isControlled) {
            setInternalModel(newModel);
        }
        onSortModelChange?.(newModel);
    }, [isControlled, onSortModelChange]);

    const sortedRows = useMemo(() => {
        if (sortMode === 'server') {
            return rows;
        }

        if (!sortConfig || !sortConfig.direction) return rows;

        const sorted = [...rows].sort((a, b) => {
            const colDef = effectiveColumns.find((c) => String(c.field) === sortConfig.field);
            if (!colDef) return 0;

            const aValue = getCellValue(a, colDef);
            const bValue = getCellValue(b, colDef);

            if (aValue === bValue) return 0;

            if (aValue === null || aValue === undefined) return 1;
            if (bValue === null || bValue === undefined) return -1;

            const comparison = aValue < bValue ? -1 : 1;
            return sortConfig.direction === 'asc' ? comparison : -comparison;
        });

        return sorted;
    }, [rows, sortConfig, effectiveColumns, sortMode]);

    return {
        sortConfig: sortConfig ? { field: sortConfig.field, direction: sortConfig.direction } : null,
        handleSort,
        sortedRows
    };
};
