import type { ColumnDef } from '../../DataGrid.types';

export interface DataGridModalColumnsProps<T> {
    isOpen: boolean;
    onClose: () => void;

    // State from Hook
    allColumns: ColumnDef<T>[]; // Raw columns
    columnOrder: string[];      // Order
    hiddenColumns: Record<string, boolean>;
    pinnedColumns: Record<string, 'left' | 'right' | null | undefined>;

    onReorder: (newOrder: string[]) => void;
    onApply: (hidden: Record<string, boolean>, pinned: Record<string, 'left' | 'right' | null | undefined>) => void;
}
