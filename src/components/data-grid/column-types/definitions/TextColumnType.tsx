import type { ColumnTypeDefinition, FilterInputProps, FastFilterInputProps } from '../ColumnTypes.types';
import { columnTypeStyles } from '../ColumnTypes.styles';

export const TextColumnType: ColumnTypeDefinition = {
    type: 'text',
    renderFilterInput: (props: FilterInputProps) => {
        const { itemValue, onChange } = props;
        const styles = columnTypeStyles();
        return (
            <input
                type="text"
                className={styles.input()}
                value={itemValue || ''}
                placeholder="Value..."
                onChange={(e) => onChange(e.target.value)}
            />
        );
    },
    renderFastFilterInput: (props: FastFilterInputProps) => {
        const { value, onChange, column } = props;
        const styles = columnTypeStyles();
        return (
            <div className={styles.cellContentWrapper()}>
                <input
                    autoFocus
                    type="text"
                    placeholder={`Filtrar ${column.headerName}...`}
                    className={styles.input()}
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        );
    }
};
