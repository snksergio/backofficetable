import { useState, useCallback } from 'react';
import type { DataGridToolbarConfig } from './DataGridToolbar.types';

export const useDataGridToolbar = (config: DataGridToolbarConfig) => {
    const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

    const toggleExportMenu = useCallback(() => {
        setIsExportMenuOpen(prev => !prev);
    }, []);

    const closeExportMenu = useCallback(() => {
        setIsExportMenuOpen(false);
    }, []);

    const handleExport = useCallback((type: 'all' | 'filtered' | 'selected') => {
        config.onExport?.(type);
        closeExportMenu();
    }, [config.onExport, closeExportMenu]);

    return {
        isExportMenuOpen,
        toggleExportMenu,
        closeExportMenu,
        handleExport
    };
};
