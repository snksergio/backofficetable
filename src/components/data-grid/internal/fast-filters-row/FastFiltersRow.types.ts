import type { ColumnDef } from '../../DataGrid.types';

export interface FastFiltersRowProps {
    columns: ColumnDef<any>[];
    hiddenColumns: Record<string, boolean>;
    fastFilters: Record<string, any>;
    activeFilterColumn: string | null;
    setActiveFilterColumn: (field: string | null) => void;
    handleFilterChange: (field: string, value: any) => void;
    clearFilter: (field: string) => void;
    clearAllFilters: () => void;
    optionsCache: Record<string, Array<{ label: string; value: any }>>;
}
