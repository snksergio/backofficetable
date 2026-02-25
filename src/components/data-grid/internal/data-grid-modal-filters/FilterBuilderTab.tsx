import { Plus, Trash2, XCircle } from 'lucide-react';
import type { FilterOperator } from '../../DataGrid.types';
import type { DataGridModalFiltersProps } from './DataGridModalFilters.types';
import { modalFiltersStyles } from './DataGridModalFilters.styles';
import { useDataGridModalFilters } from './useDataGridModalFilters';
import { FilterValueInput } from './FilterValueInput';
import { FILTER_OPERATORS, getOperatorsForColumn } from '../../DataGrid.constants';

export const FilterBuilderTab = <T,>(props: DataGridModalFiltersProps<T>) => {
    const {
        localItems,
        handleAddItem,
        handleRemoveItem,
        handleUpdateItem,
        handleClearAll,
        handleApply
    } = useDataGridModalFilters(props);

    const { onClose, columns } = props;
    const styles = modalFiltersStyles();

    return (
        <div className={styles.filterBuilderContainer()}>
            <div className={styles.list()}>
                {localItems.length === 0 && (
                    <div className={styles.emptyState()}>
                        No filters applied.
                    </div>
                )}

                {localItems.map((item) => (
                    <div key={item.id} className={styles.itemConfig()}>
                        {/* Column Select */}
                        <select
                            className={styles.fieldSelect()}
                            value={item.field}
                            onChange={(e) => {
                                const newField = e.target.value;
                                const newCol = columns.find(c => String(c.field) === newField);

                                // Reset operator and value when field changes to avoid invalid states
                                let defaultOp: FilterOperator = 'contains';
                                if (newCol?.type === 'date' || newCol?.type === 'datetime' || newCol?.type === 'boolean') {
                                    defaultOp = 'equals';
                                } else if (newCol?.type === 'number') {
                                    defaultOp = 'equals';
                                }

                                handleUpdateItem(item.id, {
                                    field: newField,
                                    operator: defaultOp,
                                    value: '' // Clear value to avoid type mismatch
                                });
                            }}
                        >
                            {columns.map(col => (
                                <option key={String(col.field)} value={String(col.field)}>
                                    {col.headerName || String(col.field)}
                                </option>
                            ))}
                        </select>

                        {/* Operator Select */}
                        <select
                            className={styles.operatorSelect()}
                            value={item.operator}
                            onChange={(e) => handleUpdateItem(item.id, { operator: e.target.value as FilterOperator })}
                        >
                            {/* Dynamically filter operators based on column type */}
                            {getOperatorsForColumn(columns.find(c => String(c.field) === item.field)).map(op => (
                                <option key={op.value} value={op.value}>{op.label}</option>
                            ))}
                        </select>

                        {/* Dynamic Value Input */}
                        <FilterValueInput
                            itemValue={item.value}
                            itemOperator={item.operator}
                            column={columns.find(c => String(c.field) === item.field)}
                            onChange={(val) => handleUpdateItem(item.id, { value: val })}
                        />

                        {/* Remove Button */}
                        <button
                            onClick={() => handleRemoveItem(item.id)}
                            className={styles.removeButton()}
                        >
                            <Trash2 className={styles.icon()} />
                        </button>
                    </div>
                ))}
            </div>

            <div className={styles.footer()}>
                <div className={styles.footerLeft()}>
                    <button onClick={handleAddItem} className={styles.addButton()}>
                        <Plus className={styles.icon()} />
                        Add Filter
                    </button>
                    <button onClick={handleClearAll} className={styles.clearButton()}>
                        <XCircle className={styles.icon()} />
                        Clear All
                    </button>
                </div>

                <div className={styles.footerRight()}>
                    <button onClick={onClose} className={styles.cancelButton()}>
                        Cancel
                    </button>
                    <button onClick={handleApply} className={styles.applyButton()}>
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    );
};
