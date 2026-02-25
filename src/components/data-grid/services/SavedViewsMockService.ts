import type { SavedView, DataGridState } from '../DataGrid.types';

const STORAGE_KEY = 'datagrid_saved_views';
const SIMULATED_LATENCY = 600;

export const SavedViewsMockService = {
    /**
     * Get all saved views from "Backend" (LocalStorage)
     */
    getViews: async (): Promise<SavedView[]> => {
        await new Promise(resolve => setTimeout(resolve, SIMULATED_LATENCY));

        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('Failed to load views', e);
            return [];
        }
    },

    /**
     * Save a new view
     */
    saveView: async (viewData: Omit<SavedView, 'id' | 'createdAt'>): Promise<SavedView> => {
        await new Promise(resolve => setTimeout(resolve, SIMULATED_LATENCY));

        const views = await SavedViewsMockService.getViews();

        const newView: SavedView = {
            createdBy: 'Usuário Demo',
            area: 'Geral',
            ...viewData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString()
        };

        const updatedViews = [...views, newView];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedViews));

        return newView;
    },

    /**
     * Delete a view by ID
     */
    deleteView: async (id: string): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, SIMULATED_LATENCY));

        const views = await SavedViewsMockService.getViews();
        const updatedViews = views.filter(v => v.id !== id);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedViews));
    }
};
