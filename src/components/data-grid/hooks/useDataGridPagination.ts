import { useState, useMemo, useEffect, useCallback } from 'react';
import type { PaginationModel } from '../DataGrid.types';

interface UseDataGridPaginationProps<T> {
    rows: T[];
    initialPageSize?: number;
    paginationMode?: 'client' | 'server';
    rowCount?: number;
    paginationModel?: PaginationModel;
    onPaginationModelChange?: (model: PaginationModel) => void;
}

export const useDataGridPagination = <T>({
    rows,
    initialPageSize = 10,
    paginationMode = 'client',
    rowCount,
    paginationModel: controlledModel,
    onPaginationModelChange
}: UseDataGridPaginationProps<T>) => {
    // Internal state for uncontrolled mode
    const [internalModel, setInternalModel] = useState<PaginationModel>({
        page: 1,
        pageSize: initialPageSize
    });

    const isControlled = controlledModel !== undefined;
    const model = isControlled ? controlledModel : internalModel;

    const setModel = useCallback((newModel: PaginationModel) => {
        if (!isControlled) {
            setInternalModel(newModel);
        }
        onPaginationModelChange?.(newModel);
    }, [isControlled, onPaginationModelChange]);

    // Helper setters for compatibility
    const setPage = useCallback((page: number) => setModel({ ...model, page }), [model, setModel]);

    // Reset to page 1 on size change
    const setPageSize = useCallback((pageSize: number) => setModel({ ...model, pageSize, page: 1 }), [model, setModel]);

    // Auto-fix page if out of bounds (Only for client side)
    useEffect(() => {
        if (paginationMode === 'server') return;

        const totalPages = Math.ceil(rows.length / model.pageSize);
        if (model.page > totalPages && totalPages > 0) {
            setPage(totalPages);
        }
    }, [rows.length, model.pageSize, model.page, paginationMode, setPage]);

    // Note: totalItems and paginatedRows are already calculated efficiently or memoized
    const paginatedRows = useMemo(() => {
        if (paginationMode === 'server') {
            return rows;
        }
        const start = (model.page - 1) * model.pageSize;
        const end = start + model.pageSize;
        return rows.slice(start, end);
    }, [rows, model.page, model.pageSize, paginationMode]);

    const totalItems = paginationMode === 'server' ? (rowCount ?? 0) : rows.length;

    return {
        page: model.page,
        setPage,
        pageSize: model.pageSize,
        setPageSize,
        paginatedRows,
        totalItems,
        paginationModel: model,
        setPaginationModel: setModel
    };
};
