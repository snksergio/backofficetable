import type { ColumnDef } from '../../DataGrid.types';

export interface FastFilterMenuProps {
    column: ColumnDef<any>;
    value: any;
    onChange: (value: any) => void;
    onClose: () => void;
    // Opções calculadas ou manuais
    options?: Array<{ label: string; value: any; color?: string }>;
}
