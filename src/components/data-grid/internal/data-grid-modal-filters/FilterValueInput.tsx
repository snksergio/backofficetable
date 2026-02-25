import type { ColumnDef, FilterOperator } from '../../DataGrid.types';
import { columnTypeRegistry } from '../../column-types/ColumnTypeRegistry';

interface FilterValueInputProps<T> {
    itemValue: any;
    itemOperator: FilterOperator;
    column?: ColumnDef<T>;
    onChange: (value: any) => void;
}

export const FilterValueInput = <T,>({ itemValue, itemOperator, column, onChange }: FilterValueInputProps<T>) => {
    // 1. Check if operator is "Empty" type (Hide Input)
    if (itemOperator === 'isEmpty' || itemOperator === 'isNotEmpty') {
        return null;
    }

    // 2. Determine Type
    // Priority: Explicit filterType -> Column Type -> Default 'text'
    const type = column?.filterType || column?.type || 'text';

    // 3. Delegate to Registry
    const strategy = columnTypeRegistry.get(type);

    return (
        <>
            {strategy.renderFilterInput({
                itemValue,
                itemOperator,
                column: column as any, // Cast to generic
                onChange
            })}
        </>
    );
};
