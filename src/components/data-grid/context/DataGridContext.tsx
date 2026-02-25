import { createContext, useContext } from 'react';
import type {
    ColumnDef,
    SortModel,
    FilterModel,
    PaginationModel,
    DataGridToolbarConfig,
    SortDirection,
    DataGridDensity,
    DataGridState
} from '../DataGrid.types';

export interface DataGridContextType<T> {
    // Data
    rows: T[];
    total: number;
    isLoading: boolean;

    // Columns
    columns: ColumnDef<T>[];
    columnWidths: Record<string, number>;
    stickyOffsets: Record<string, number>;
    setColumnWidths: React.Dispatch<React.SetStateAction<Record<string, number>>>;

    // Global State Snapshot
    state: DataGridState;
    restoreState: (newState: DataGridState) => void;

    // State
    sort: {
        config: SortModel | null;
        handleSort: (field: string, direction?: SortDirection) => void;
    };

    filters: {
        model: FilterModel;
        setModel: (model: FilterModel) => void;
        isOpen: boolean;
        setIsOpen: (isOpen: boolean) => void;
    };

    pagination: {
        model: PaginationModel;
        setPage: (page: number) => void;
        setPageSize: (size: number) => void;
    };

    columnMenu: {
        activeColumn: string | null;
        setActiveColumn: (col: string | null) => void;
        modalIsOpen: boolean;
        setModalIsOpen: (isOpen: boolean) => void;
    };

    search: {
        value: string;
        setValue: (val: string) => void;
        field: string;
        setField: (field: string) => void;
    };

    density: {
        value: DataGridDensity;
        setValue: (d: DataGridDensity) => void;
    };

    // Selection
    // Selection
    selection: {
        field?: string; // Kept for backwards compatibility logic if needed
        count: number;
        selectedIds: (string | number)[];
        selectAll: () => void;
        selectGlobal: () => void;
        clear: () => void;
        toggleRow: (row: T) => void;
        isRowSelected: (row: T) => boolean;
    };

    // UI & Config
    styles: ReturnType<typeof import('../DataGrid.styles').dataGridStyles>;
    toolbarConfig: DataGridToolbarConfig;
    containerRef: React.RefObject<HTMLDivElement>;
    headerRef: React.RefObject<HTMLDivElement>;
    bodyRef: React.RefObject<HTMLDivElement>;

    // Handlers
    onResize: (e: React.MouseEvent, field: string) => void;
    onPin: (field: string, side: 'left' | 'right' | null) => void;
    onHide: (field: string) => void;
    onReorder: (newOrder: string[]) => void;
    onRowChange?: (row: T) => void;

    // Visual State
    hoveredResizeColumn: string | null;
    setHoveredResizeColumn: (columnKey: string | null) => void;
    isScrolled: boolean; // Kept for legacy/simple checks (equiv to scrollState.left)
    scrollState: { left: boolean; right: boolean; };
}

const DataGridContext = createContext<DataGridContextType<any> | null>(null);

export const DataGridProvider = DataGridContext.Provider;

export const useDataGridContext = <T,>() => {
    const context = useContext(DataGridContext);
    if (!context) {
        throw new Error('useDataGridContext must be used within a DataGridProvider');
    }
    return context as DataGridContextType<T>;
};
