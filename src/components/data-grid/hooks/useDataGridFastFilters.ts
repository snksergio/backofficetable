import { useState, useMemo, useCallback } from 'react';
import type { ColumnDef, FilterModel, FilterOperator } from '../DataGrid.types';

interface UseDataGridFastFiltersProps<T> {
    columns: ColumnDef<T>[];
    rows: T[]; // Para extração automática
    // onFilterChange removed as it was unused
}

export const useDataGridFastFilters = <T>({
    columns,
    rows,
}: UseDataGridFastFiltersProps<T>) => {
    // Estado local dos filtros rápidos: { 'status': ['active', 'pending'], 'name': 'John' }
    const [fastFilters, setFastFilters] = useState<Record<string, any>>(() => {
        const initial: Record<string, any> = {};
        columns.forEach(col => {
            if (col.defaultFilterValue !== undefined) {
                initial[col.field as string] = col.defaultFilterValue;
            }
        });
        return initial;
    });

    // Estado para controlar qual popover está aberto
    const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(null);

    // 1. Extração Automática de Opções (Memoizada)
    const optionsCache = useMemo(() => {
        const cache: Record<string, Array<{ label: string; value: any }>> = {};

        if (!columns) return cache;

        columns.forEach(col => {
            if (col.enableColumnFilter && (col.filterType === 'select' || col.filterType === 'multiSelect')) {
                // Se não tem opções manuais, extrai dos dados
                if (!col.filterOptions) {
                    const uniqueValues = new Set<string>();
                    rows.forEach(row => {
                        const val = (row as any)[col.field as string];
                        if (val !== undefined && val !== null) {
                            uniqueValues.add(String(val));
                        }
                    });
                    cache[col.field as string] = Array.from(uniqueValues).map(v => ({ label: v, value: v }));
                }
            }
        });
        return cache;
    }, [columns, rows]); // Recalcula se as linhas mudarem (importante para client-side)

    // 2. Helpers de Atualização
    const handleFilterChange = useCallback((field: string, value: any) => {
        setFastFilters(prev => {
            const next = { ...prev };

            // Se valor vazio/nulo/array vazio, remove a chave
            if (value === '' || value === null || (Array.isArray(value) && value.length === 0)) {
                delete next[field];
            } else {
                next[field] = value;
            }
            return next;
        });
    }, []);

    const clearFilter = useCallback((field: string) => {
        setFastFilters(prev => {
            const next = { ...prev };
            delete next[field];
            return next;
        });
    }, []);

    // 3. Conversão para FilterModel (Integração com o resto da tabela)
    // Transforma o objeto simples { status: ['active'] } no formato complexo do QueryBuilder
    const effectiveFilterModel = useMemo((): FilterModel => {
        if (!columns) return { items: [], logicOperator: 'AND' };

        const items = Object.entries(fastFilters).map(([field, value]) => {
            const col = columns.find(c => c.field === field);

            // Lógica de operador baseada no tipo
            let operator: FilterOperator = 'contains';
            if (col?.filterType === 'select' || col?.filterType === 'multiSelect') {
                operator = 'isAnyOf';
            } else if (col?.filterType === 'date') {
                operator = 'equals';
            } else if (col?.filterType === 'boolean') {
                operator = 'equals';
            }

            return {
                id: `fast-${field}`,
                field,
                operator,
                value
            };
        });

        return {
            items,
            logicOperator: 'AND' // Fast Filters sempre somam com AND
        };
    }, [fastFilters, columns]);

    return {
        fastFilters,
        activeFilterColumn,
        setActiveFilterColumn,
        handleFilterChange,
        clearFilter,
        clearAllFilters: () => setFastFilters({}),
        optionsCache,
        effectiveFilterModel,
        setFastFilters // Exposed for persistence restoration
    };
};
