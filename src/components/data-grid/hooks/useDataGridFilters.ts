import { useState, useCallback } from 'react';
import type { FilterModel, FilterItem } from '../DataGrid.types';

interface UseDataGridFiltersProps {
    initialFilters?: FilterModel;
    onFilterModelChange?: (model: FilterModel) => void;
}

export const useDataGridFilters = ({
    initialFilters,
    onFilterModelChange
}: UseDataGridFiltersProps = {}) => {
    const [filterModel, setFilterModel] = useState<FilterModel>(initialFilters || {
        items: [],
        logicOperator: 'AND'
    });

    // We can expose helper methods to add/remove filters
    const addFilter = useCallback((item: FilterItem) => {
        setFilterModel(prev => {
            const next = { ...prev, items: [...prev.items, item] };
            onFilterModelChange?.(next);
            return next;
        });
    }, [onFilterModelChange]);

    const removeFilter = useCallback((id: string) => {
        setFilterModel(prev => {
            const next = { ...prev, items: prev.items.filter(i => i.id !== id) };
            onFilterModelChange?.(next);
            return next;
        });
    }, [onFilterModelChange]);

    const updateFilter = useCallback((item: FilterItem) => {
        setFilterModel(prev => {
            const next = {
                ...prev,
                items: prev.items.map(i => i.id === item.id ? item : i)
            };
            onFilterModelChange?.(next);
            return next;
        });
    }, [onFilterModelChange]);

    const clearFilters = useCallback(() => {
        setFilterModel(prev => {
            const next = { ...prev, items: [] };
            onFilterModelChange?.(next);
            return next;
        });
    }, [onFilterModelChange]);

    return {
        filterModel,
        setFilterModel,
        addFilter,
        removeFilter,
        updateFilter,
        clearFilters
    };
};
