import type { ColumnDef, DataGridDensity } from '../../DataGrid.types';
import type { CSSProperties } from 'react';

export interface DataGridCellProps<T = any> {
    col: ColumnDef<T>;
    row: T;
    rowIndex: number;
    style?: CSSProperties;
    onRowChange?: (row: T) => void;
    isSelected?: boolean;
    onToggleRow?: (row: T) => void;
}

export interface ExtendedDataGridCellProps<T> extends DataGridCellProps<T> {
    width?: number;
    stickyOffset?: number;
    styles?: any; // Grid styles
    density?: DataGridDensity;
}
