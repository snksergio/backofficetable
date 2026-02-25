import { useMemo, useState, useEffect } from 'react';
import type { ColumnDef, FilterModel, SortModel, PaginationModel } from '../DataGrid.types';
import { getNestedValue, matchesFilter, matchesSearch, compareValues } from '../utils/dataUtils';

interface UseDataGridProcessorProps<T> {
    rows: T[];
    columns: ColumnDef<T>[];
    filterModel: FilterModel;
    sortModel?: SortModel;
    paginationModel: PaginationModel;
    search: string;
    searchField: string;
}

interface UseDataGridProcessorResult<T> {
    processedRows: T[];
    total: number;
}

/**
 * The "Brain" of the Client-Side DataGrid.
 * handling Filtering, Searching, Sorting, and Pagination locally.
 */
export const useDataGridProcessor = <T>({
    rows,
    columns,
    filterModel,
    sortModel,
    paginationModel,
    search,
    searchField
}: UseDataGridProcessorProps<T>): UseDataGridProcessorResult<T> => {

    // 1. Debounce Search to improve performance on large datasets
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300); // 300ms delay

        return () => clearTimeout(timer);
    }, [search]);



    // 3. The Processing Pipeline

    // A. Filter & Search (Expensive O(N))
    const filteredRows = useMemo(() => {
        let currentRows = rows; // Don't copy yet if not needed, filter creates new array

        // Global Search
        if (debouncedSearch) {
            currentRows = currentRows.filter(row =>
                matchesSearch(row, debouncedSearch, columns, searchField)
            );
        }

        // Advanced Filters
        if (filterModel && filterModel.items.length > 0) {
            currentRows = currentRows.filter(row => {
                return filterModel.items.every(filter => {
                    const rowValue = getNestedValue(row, filter.field);
                    return matchesFilter(rowValue, filter);
                });
            });
        }

        return currentRows;
    }, [rows, debouncedSearch, columns, searchField, filterModel]);

    // Capture total AFTER filtering but BEFORE pagination
    const totalCount = filteredRows.length;

    // B. Sorting (Expensive O(N log N))
    const sortedRows = useMemo(() => {
        if (!sortModel || !sortModel.direction) {
            return filteredRows;
        }

        // Create a copy to sort
        const toSort = [...filteredRows];

        toSort.sort((a, b) => {
            const valA = getNestedValue(a, sortModel.field);
            const valB = getNestedValue(b, sortModel.field);
            return compareValues(valA, valB, sortModel.direction!);
        });

        return toSort;
    }, [filteredRows, sortModel]);

    // C. Pagination (Cheap O(1)/O(pageSize))
    const processedRows = useMemo(() => {
        const pageSize = paginationModel.pageSize;
        const page = paginationModel.page;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;

        return sortedRows.slice(start, end);
    }, [sortedRows, paginationModel.page, paginationModel.pageSize]);

    return {
        processedRows,
        total: totalCount
    };
};
