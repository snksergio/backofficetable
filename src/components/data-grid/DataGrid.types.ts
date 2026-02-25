import React from 'react';
import type { GridColumnMenuProps } from './internal/data-grid-column-menu';
import type { DataGridToolbarConfig } from './internal/data-grid-toolbar/DataGridToolbar.types';
export type { DataGridToolbarConfig };

export type ColumnType =
    | 'id'
    | 'number'
    | 'currency'
    | 'percent'
    | 'date'
    | 'datetime'
    | 'time'
    | 'text'
    | 'longText'
    | 'status'
    | 'boolean'
    | 'actions'
    | 'user'
    | 'tags'
    | 'link'
    | 'checkbox';

export type SortDirection = 'asc' | 'desc' | null;

export type DataGridDensity = 'compact' | 'standard' | 'comfortable';

export type GridRowId = string | number;

export interface GridSelectionState {
    type: 'include' | 'exclude';
    ids: Set<GridRowId>;
}

export interface ColumnDef<T> {
    field: keyof T | string;
    headerName: string;
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    pinned?: 'left' | 'right';
    flex?: number; // Flex-grow factor for fluid width
    type?: ColumnType;
    ellipsis?: boolean;
    className?: string;
    align?: 'left' | 'center' | 'right';

    // Novas props para Fast Filters
    enableColumnFilter?: boolean;
    filterType?: 'text' | 'select' | 'multiSelect' | 'date' | 'boolean' | 'number';
    filterOptions?: Array<{ label: string; value: any; color?: string }>;
    // Se false, o filtro começa oculto e só aparece ao clicar em "+ Filtro" ou se tiver valor ativo
    filterVisibleInitially?: boolean;
    // Valor inicial do filtro (ex: ['Active'] para multiSelect)
    defaultFilterValue?: any;
    // Função opcional para customizar a renderização da opção no menu de filtro
    renderFilterOption?: (option: { label: string; value: any; color?: string }) => React.ReactNode;
    // Função para renderizar completamente o componente de filtro (ex: DatePicker customizado)
    renderColumnFilter?: (params: {
        value: any;
        onChange: (value: any) => void;
        onClose: () => void
    }) => React.ReactNode;

    render?: (params: { row: T; value: any }) => React.ReactNode;
    valueGetter?: (row: T) => any;
    valueFormatter?: (value: any) => string; // Used for export and search matching
    sortable?: boolean;
    copyable?: boolean;
    filterable?: boolean;
    enableColumnMenu?: boolean;
    renderMenuItems?: (params: { onClose: () => void; column: ColumnDef<T> }) => React.ReactNode;
    columnMenuConfig?: {
        showSort?: boolean;
        showPin?: boolean;
        showHide?: boolean;
        showClose?: boolean;
    };
    resizable?: boolean;
}

export interface DataGridSlots {
    columnMenu?: React.ComponentType<GridColumnMenuProps>;
    // You could add header slots here too if you wanted to override component entirely
}

export interface PaginationModel {
    page: number;
    pageSize: number;
}

export interface SortModel {
    field: string;
    direction: SortDirection;
}

// Filter Types
export type FilterOperator = 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'isEmpty' | 'isNotEmpty' | 'isAnyOf';

export interface FilterItem {
    id: string;
    field: string;
    operator: FilterOperator;
    value?: any;
}

export interface FilterModel {
    items: FilterItem[];
    logicOperator: 'AND' | 'OR';
}

export interface DataGridState {
    filterModel?: FilterModel;
    sortModel?: SortModel | null;
    paginationModel?: PaginationModel;
    density?: DataGridDensity;
    fastFilters?: Record<string, any>; // Persisted fast filters state
    columnVisibilityModel?: Record<string, boolean>;
    pinnedColumns?: Record<string, 'left' | 'right' | null | undefined>;
    columnOrder?: string[];
}

export interface SavedView {
    id: string;
    name: string;
    state: DataGridState;
    createdAt: string; // ISO Date
    createdBy?: string; // e.g., "User 1"
    area?: string; // e.g., "Atendimento"
}

// Fetch Types
export interface GridFetchParams {
    pagination: PaginationModel;
    sort: SortModel | null;
    filters: FilterModel;
    search: string;
    searchField?: string; // New: which column to search in (or 'all')
}

export interface GridFetchResult<T> {
    data: T[];
    total: number;
}


export interface DataGridPaginationConfig {
    enabled?: boolean;
    pageSizeOptions?: number[];
    initialPageSize?: number;
    mode?: 'client' | 'server';
    labelRowsPerPage?: string;
}

export interface DataGridSelectionConfig {
    enabled?: boolean;
    mode?: 'include' | 'exclude'; // Initial mode if needed, usually managed by selectionModel
    enableGlobal?: boolean;
    keepOnPageChange?: boolean;
    actions?: (selectedIds: (string | number)[], clearSelection: () => void) => React.ReactNode;
}

export interface DataGridProps<T> {
    // Identity
    persistId?: string; // Unique ID for LocalStorage persistence

    rows?: T[];
    columns: ColumnDef<T>[];

    // Data Source
    fetchData?: (params: GridFetchParams) => Promise<GridFetchResult<T>>;
    loading?: boolean;
    initialFilterModel?: FilterModel;

    // Toolbar Config
    toolbar?: DataGridToolbarConfig;

    // Density
    density?: DataGridDensity;
    onDensityChange?: (density: DataGridDensity) => void;

    // Column Config
    autoHeight?: boolean;
    autoFit?: boolean;
    onRowChange?: (row: T) => void;
    onRowsChange?: (rows: T[]) => void;
    getRowClassName?: (params: { row: T; index: number }) => string;

    // Selection
    getRowId?: (row: T) => GridRowId;
    selectionModel?: GridSelectionState;
    onSelectionModelChange?: (model: GridSelectionState) => void;
    selectionConfig?: DataGridSelectionConfig;

    className?: string;
    slots?: DataGridSlots;

    // Sorting
    sortModel?: SortModel | null;
    onSortModelChange?: (model: SortModel | null) => void;
    sortMode?: 'client' | 'server';

    // Pagination
    paginationModel?: PaginationModel;
    onPaginationModelChange?: (model: PaginationModel) => void;
    paginationConfig?: DataGridPaginationConfig;
    rowCount?: number;

    /**
     * Custom renderer for the loading state.
     * Defaults to <LayoutFeedback variant="loading" />
     */
    renderLoading?: React.ReactNode;

    /**
     * Custom renderer for the empty state (no data provided).
     * Defaults to <LayoutFeedback variant="empty" />
     */
    renderEmpty?: React.ReactNode;

    /**
     * Custom renderer for the no results state (search/filters active but no matches).
     * Defaults to <LayoutFeedback variant="notFound" />
     */
    renderNoResults?: React.ReactNode;
}

export interface DataGridRef {
    /**
     * Forces a refresh of the data when in server-side mode (fetchData provided).
     * If in client-side mode, this method does nothing.
     */
    refresh: () => void;
}

export interface FastFilterState {
    [field: string]: any;
}
