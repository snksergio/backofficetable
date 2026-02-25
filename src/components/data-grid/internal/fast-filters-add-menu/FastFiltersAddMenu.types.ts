
import type { ColumnDef } from '../../DataGrid.types';

export interface FastFiltersAddMenuProps {
    columns: ColumnDef<any>[];
    onAdd: (field: string) => void;
    onClose: () => void;
}
