import type { ColumnDef, DataGridDensity } from '../../DataGrid.types';

export interface DataGridRowProps<T> {
    row: T;
    index: number;
    className?: string;
    onRowChange?: (row: T) => void;
    // Decoupled Props for Performance
    columns: ColumnDef<T>[];
    columnWidths: Record<string, number>;
    stickyOffsets: Record<string, number>;
    styles: any;
    isSelected: boolean;
    onToggleRow?: (row: T) => void;
    density: DataGridDensity;
}
