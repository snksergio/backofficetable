import { useState, useEffect } from 'react';
import type { FilterItem } from '../../DataGrid.types';
import type { DataGridModalFiltersProps } from './DataGridModalFilters.types';

export const useDataGridModalFilters = <T,>(props: DataGridModalFiltersProps<T>) => {
    const {
        isOpen,
        onClose,
        columns,
        filterModel,
        onApply
    } = props;

    const [localItems, setLocalItems] = useState<FilterItem[]>(filterModel.items);

    // Sync on open
    useEffect(() => {
        if (isOpen) {
            // Auto-add one item if empty
            if (filterModel.items.length === 0) {
                const firstField = String(columns[0]?.field || '');
                setLocalItems([{
                    id: Math.random().toString(36).substr(2, 9),
                    field: firstField,
                    operator: 'contains',
                    value: ''
                }]);
            } else {
                setLocalItems(filterModel.items);
            }
        }
    }, [isOpen, filterModel, columns]);

    const handleAddItem = () => {
        const firstField = String(columns[0]?.field || '');
        const newItem: FilterItem = {
            id: Math.random().toString(36).substr(2, 9),
            field: firstField,
            operator: 'contains',
            value: ''
        };
        setLocalItems([...localItems, newItem]);
    };

    const handleRemoveItem = (id: string) => {
        setLocalItems(localItems.filter(i => i.id !== id));
    };

    const handleUpdateItem = (id: string, updates: Partial<FilterItem>) => {
        setLocalItems(localItems.map(i => i.id === id ? { ...i, ...updates } : i));
    };

    const handleClearAll = () => {
        setLocalItems([]);
    };

    const handleApply = () => {
        // Clean empty items unless operator allows empty
        const cleanItems = localItems.filter(i =>
            (i.value !== '' && i.value !== null && i.value !== undefined) ||
            i.operator === 'isEmpty' ||
            i.operator === 'isNotEmpty'
        );

        onApply({ ...filterModel, items: cleanItems });
        onClose();
    };

    return {
        localItems,
        handleAddItem,
        handleRemoveItem,
        handleUpdateItem,
        handleClearAll,
        handleApply
    };
};
