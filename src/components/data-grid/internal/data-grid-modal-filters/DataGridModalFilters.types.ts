import type { ColumnDef, FilterModel } from '../../DataGrid.types';

export interface DataGridModalFiltersProps<T> {
    isOpen: boolean;
    onClose: () => void;
    columns: ColumnDef<T>[];
    filterModel: FilterModel;
    onApply: (model: FilterModel) => void;
    gridId?: string; // New Prop
}
