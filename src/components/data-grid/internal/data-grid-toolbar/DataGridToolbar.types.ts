
import type { ReactNode } from 'react';
import type { ColumnDef, DataGridDensity } from '../../DataGrid.types';

export interface DataGridToolbarConfig {
    title?: string;
    description?: string;

    // Actions
    enableSearch?: boolean;
    enableFilters?: boolean;
    enableColumnConfig?: boolean;

    // Slots
    slots?: {
        start?: ReactNode;
        end?: ReactNode;
        bottom?: ReactNode;
    };

    // Events
    onSearch?: (term: string) => void;
    onOpenFilters?: () => void;
    onOpenColumns?: () => void;

    // State (Controlled)
    searchValue?: string;
    activeFiltersCount?: number;

    // CTA
    ctaLabel?: string;
    ctaIcon?: ReactNode;
    ctaButton?: () => void;

    // Search Field
    searchField?: string; // Acts as default value if passed in initial config, and controlled value in render
    onSearchFieldChange?: (field: string) => void;
    enableSearchColumnSelector?: boolean; // New: Toggle dropdown visibility
    columns?: ColumnDef<any>[];
    enableExport?: boolean;
    onExport?: (type: 'all' | 'filtered' | 'selected') => void; // Optional override
    selectedCount?: number;

    enableDensitySelector?: boolean;
    density?: DataGridDensity;
    onDensityChange?: (density: DataGridDensity) => void;

    // Persistence
    persistId?: string;

    // More Options (Generic Actions)
    moreActions?: Array<{
        label: string;
        icon?: ReactNode;
        onClick: () => void;
        variant?: 'default' | 'danger';
    }>;
}

export interface DataGridToolbarProps {
    config: DataGridToolbarConfig;
}
