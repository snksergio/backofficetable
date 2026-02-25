import type { SortDirection } from '../../DataGrid.types';

export interface GridColumnMenuProps {
    sortConfig: { field: string; direction: SortDirection } | null;
    currentColumn: string;
    onSort: (direction: SortDirection) => void;
    onClose: () => void;
    onPin: (side: 'left' | 'right' | null) => void;
    onHide: () => void;
    currentPinned?: 'left' | 'right';
    extraItems?: React.ReactNode;
    showSort?: boolean;
    showPin?: boolean;
    showHide?: boolean;
    showClose?: boolean;
}
