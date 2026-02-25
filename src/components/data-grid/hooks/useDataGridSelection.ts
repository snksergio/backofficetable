import { useMemo, useCallback, useState } from 'react';
import type { GridSelectionState, GridRowId } from '../DataGrid.types';

interface UseDataGridSelectionProps<T> {
    rows: T[];
    visibleRows?: T[];
    getRowId?: (row: T) => GridRowId;
    selectionModel?: GridSelectionState;
    onSelectionModelChange?: (model: GridSelectionState) => void;
    totalCount?: number; // Needed for exclude mode count
}

export const useDataGridSelection = <T>({
    rows: _rows, // Only used as fallback or for ID extraction if needed
    visibleRows = [],
    getRowId = (row) => (row as any).id,
    selectionModel: propModel,
    onSelectionModelChange,
    totalCount = 0
}: UseDataGridSelectionProps<T>) => {

    // Internal state for uncontrolled mode
    const [internalModel, setInternalModel] = useState<GridSelectionState>({
        type: 'include',
        ids: new Set()
    });

    const model = propModel || internalModel;
    const setModel = useCallback((newModel: GridSelectionState) => {
        if (onSelectionModelChange) {
            onSelectionModelChange(newModel);
        } else {
            setInternalModel(newModel);
        }
    }, [onSelectionModelChange]);

    // Count logic
    const selectedCount = useMemo(() => {
        if (model.type === 'include') {
            return model.ids.size;
        } else {
            // Exclude mode: Total - Excluded
            return Math.max(0, totalCount - model.ids.size);
        }
    }, [model, totalCount]);

    const isRowSelected = useCallback((row: T) => {
        const id = getRowId(row);
        if (model.type === 'include') {
            return model.ids.has(id);
        } else {
            return !model.ids.has(id); // Selected unless excluded
        }
    }, [model, getRowId]);

    const toggleRow = useCallback((row: T) => {
        const id = getRowId(row);
        const newIds = new Set(model.ids);

        if (model.type === 'include') {
            if (newIds.has(id)) newIds.delete(id);
            else newIds.add(id);
        } else {
            // Exclude mode: Toggle means adding/removing from EXCLUSION list
            // If it is 'selected' (not in exclude list), we 'deselect' it (add to exclude list)
            if (newIds.has(id)) newIds.delete(id); // Was excluded (deselected) -> Now included (selected)
            else newIds.add(id); // Was included -> Now excluded
        }

        setModel({ ...model, ids: newIds });
    }, [model, getRowId, setModel]);

    const handleSelectAll = useCallback(() => {
        // Select all VISIBLE rows (Page)
        // This is always an append to 'include' or remove from 'exclude'
        const visibleIds = visibleRows.map(getRowId);
        const newIds = new Set(model.ids);

        if (model.type === 'include') {
            visibleIds.forEach(id => newIds.add(id));
        } else {
            // Exclude mode: "Selecting" means Removing from exclude list
            visibleIds.forEach(id => newIds.delete(id));
        }

        setModel({ ...model, ids: newIds });
    }, [model, visibleRows, getRowId, setModel]);

    const handleSelectGlobal = useCallback(() => {
        // "Select All 208 lines"
        setModel({
            type: 'exclude',
            ids: new Set() // Exclude nothing = Include Everything
        });
    }, [setModel]);

    const handleClearSelection = useCallback(() => {
        setModel({
            type: 'include',
            ids: new Set()
        });
    }, [setModel]);

    const isPageSelected = useMemo(() => {
        if (visibleRows.length === 0) return false;
        return visibleRows.every(row => {
            const id = getRowId(row);
            if (model.type === 'include') return model.ids.has(id);
            return !model.ids.has(id); // In exclude mode, row is selected if NOT in ids
        });
    }, [model, visibleRows, getRowId]);

    return {
        model,
        selectedCount,
        selectedIds: Array.from(model.ids),
        handleSelectAll,
        handleSelectGlobal,
        handleClearSelection,
        toggleRow,
        isRowSelected,
        isPageSelected
    };
};
