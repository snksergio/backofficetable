import { useState, useEffect, useRef } from 'react';
import type { GridFetchParams, GridFetchResult, PaginationModel, SortModel, FilterModel } from '../DataGrid.types';

interface UseDataGridQueryProps<T> {
    fetchData?: (params: GridFetchParams) => Promise<GridFetchResult<T>>;
    paginationModel: PaginationModel;
    sortModel: SortModel | null;
    filterModel?: FilterModel; // New
    searchValue?: string;      // New
    enabled?: boolean;
}

export const useDataGridQuery = <T>({
    fetchData,
    paginationModel,
    sortModel,
    filterModel,
    searchValue,
    enabled = true
}: UseDataGridQueryProps<T>) => {
    const [data, setData] = useState<T[]>([]);
    const [total, setTotal] = useState<number>(0);
    // Initialize loading to TRUE if the query is enabled. 
    // This prevents a "flash of empty content" before the first useEffect runs.
    const [loading, setLoading] = useState(enabled);
    const [error, setError] = useState<Error | null>(null);

    // Keep track of the latest request to avoid race conditions
    const requestIdRef = useRef(0);

    // Refresh trigger
    const [refreshKey, setRefreshKey] = useState(0);

    const refetch = () => {
        setRefreshKey(prev => prev + 1);
    };

    // Debounce internal search state
    const [debouncedSearch, setDebouncedSearch] = useState(searchValue || '');

    // --- Developer Experience (DX) Checks ---
    const prevFetchDataRef = useRef(fetchData);

    useEffect(() => {
        if (import.meta.env.DEV) {
            if (prevFetchDataRef.current !== fetchData && enabled) {
                console.warn(
                    '%c[DataGrid Warning] %cfetchData prop reference is changing on every render!',
                    'font-weight:bold; color:orange',
                    'color:inherit'
                );
                console.warn('This will cause infinite loops or excessive API calls. Please wrap your fetchData function in useCallback().');
            }
            prevFetchDataRef.current = fetchData;
        }
    }, [fetchData, enabled]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchValue || '');
        }, 500); // 500ms debounce for server requests

        return () => clearTimeout(handler);
    }, [searchValue]);

    useEffect(() => {
        if (!fetchData || !enabled) return;

        const currentRequestId = ++requestIdRef.current;
        setLoading(true);
        setError(null);

        const params: GridFetchParams = {
            pagination: paginationModel,
            sort: sortModel,
            filters: filterModel || { items: [], logicOperator: 'AND' },
            search: debouncedSearch
        };

        fetchData(params)
            .then((result) => {
                if (currentRequestId === requestIdRef.current) {
                    setData(result.data);
                    setTotal(result.total);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (currentRequestId === requestIdRef.current) {
                    console.error('DataGrid Fetch Error:', err);
                    setError(err);
                    setLoading(false);
                }
            });

    }, [fetchData, paginationModel.page, paginationModel.pageSize, sortModel, filterModel, debouncedSearch, enabled, refreshKey]);

    return {
        queryRows: data,
        setQueryData: setData,
        queryTotal: total,
        queryLoading: loading,
        queryError: error,
        refetch
    };
};
