import { useState, useCallback, useEffect } from 'react';
import type { DataGridState, SavedView } from '../DataGrid.types';
import { SavedViewsMockService } from '../services/SavedViewsMockService';

interface PersistenceConfig {
    gridId?: string; // Optional: if provided, enables auto-save to localStorage
    onStateChange: (newState: DataGridState) => void;
    currentState: DataGridState;
}

export const useDataGridStatePersistence = ({
    gridId,
    onStateChange,
    currentState
}: PersistenceConfig) => {
    const [savedViews, setSavedViews] = useState<SavedView[]>([]);
    const [isLoadingViews, setIsLoadingViews] = useState(false);

    /**
     * 0. Auto-Persistence (Silent Mode)
     */
    // Restore on Mount
    useEffect(() => {
        if (!gridId) return;

        try {
            const saved = localStorage.getItem(`datagrid_persistence_${gridId}`);
            if (saved) {
                const parsed = JSON.parse(saved);
                // We might want to wrap this in a timeout to ensure everything is initialized?
                // Or just call it directly.
                console.log('Restoring Persistence for', gridId, parsed);
                onStateChange(parsed);
            }
        } catch (e) {
            console.error('Failed to restore auto-saved state', e);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Run ONCE on mount

    // Save on Change
    useEffect(() => {
        if (!gridId || !currentState) return;

        const key = `datagrid_persistence_${gridId}`;
        const timeout = setTimeout(() => {
            localStorage.setItem(key, JSON.stringify(currentState));
        }, 500); // 500ms debounce

        return () => clearTimeout(timeout);
    }, [currentState, gridId]);

    /**
     * 1. Export State to JSON File
     */
    const exportState = useCallback(() => {
        const stateToExport = currentState;
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(stateToExport, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `datagrid_state_${new Date().getTime()}.json`);
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }, [currentState]);

    /**
     * 2. Import State from JSON File
     */
    const importState = useCallback((file: File) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                // Basic Validation could go here
                if (typeof json === 'object') {
                    onStateChange(json as DataGridState);
                }
            } catch (err) {
                console.error('Failed to parse state file', err);
            }
        };
        reader.readAsText(file);
    }, [onStateChange]);

    /**
     * 3. Saved Views Integration
     */
    const loadViews = useCallback(async () => {
        setIsLoadingViews(true);
        try {
            const views = await SavedViewsMockService.getViews();
            setSavedViews(views);
        } finally {
            setIsLoadingViews(false);
        }
    }, []);

    const saveCurrentView = useCallback(async (name: string, metadata?: { createdBy?: string; area?: string }) => {
        setIsLoadingViews(true);
        try {
            await SavedViewsMockService.saveView({
                name,
                state: currentState,
                ...metadata
            });
            await loadViews(); // Refresh list
        } finally {
            setIsLoadingViews(false);
        }
    }, [currentState, loadViews]);

    const applyView = useCallback((view: SavedView) => {
        onStateChange(view.state);
    }, [onStateChange]);

    const deleteView = useCallback(async (id: string) => {
        setIsLoadingViews(true);
        try {
            await SavedViewsMockService.deleteView(id);
            await loadViews();
        } finally {
            setIsLoadingViews(false);
        }
    }, [loadViews]);

    return {
        // Actions
        exportState,
        importState,
        saveCurrentView,
        applyView,
        deleteView,
        loadViews,

        // State
        savedViews,
        isLoadingViews
    };
};
