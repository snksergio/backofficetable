import { useMemo, useState, useCallback } from 'react';
import type { FastFiltersRowProps } from './FastFiltersRow.types';

export const useFastFiltersRow = (props: FastFiltersRowProps) => {
    const { columns, fastFilters, hiddenColumns } = props;

    // 1. All columns that support filtering AND are not hidden
    const allFilterableColumns = useMemo(() => {
        return columns.filter(c => c.enableColumnFilter && !hiddenColumns[String(c.field)]);
    }, [columns, hiddenColumns]);

    // 2. Visible Fields State
    const [manualVisibleFields, setManualVisibleFields] = useState<Set<string>>(() => {
        const initial = new Set<string>();
        allFilterableColumns.forEach(c => {
            if (c.filterVisibleInitially !== false) {
                initial.add(String(c.field));
            }
        });
        return initial;
    });

    // 3. Computed visible columns (Manual + Active) - RENDERED IN INSERTION ORDER
    const filterableColumns = useMemo(() => {
        const orderedFields = Array.from(manualVisibleFields);

        // Include any active filters that might not be in manual list (edge case)
        Object.keys(fastFilters).forEach(key => {
            if (!manualVisibleFields.has(key)) {
                orderedFields.push(key);
            }
        });

        // Map to column definitions
        return orderedFields
            .map(field => allFilterableColumns.find(c => String(c.field) === field))
            .filter((c): c is typeof c & {} => !!c);
    }, [allFilterableColumns, manualVisibleFields, fastFilters]);

    // 4. Available to Add
    const availableColumnsToAdd = useMemo(() => {
        return allFilterableColumns.filter(c => {
            const field = String(c.field);
            const isVisible = manualVisibleFields.has(field) || (fastFilters[field] !== undefined && fastFilters[field] !== '');
            return !isVisible;
        });
    }, [allFilterableColumns, manualVisibleFields, fastFilters]);

    // Actions
    const showFilter = useCallback((field: string) => {
        setManualVisibleFields(prev => {
            const next = new Set(prev);
            next.add(field); // Adds to end of Set (insertion order)
            return next;
        });
    }, []);

    const hideFilter = useCallback((field: string) => {
        setManualVisibleFields(prev => {
            const next = new Set(prev);
            next.delete(field);
            return next;
        });
    }, []);

    return {
        filterableColumns,
        availableColumnsToAdd,
        showFilter,
        hideFilter
    };
};
