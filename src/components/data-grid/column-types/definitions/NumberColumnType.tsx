import type { ColumnTypeDefinition, FilterInputProps, FastFilterInputProps } from '../ColumnTypes.types';
import { columnTypeStyles } from '../ColumnTypes.styles';

export const NumberColumnType: ColumnTypeDefinition = {
    type: 'number',
    renderFilterInput: (props: FilterInputProps) => {
        const { itemValue, onChange } = props;
        const styles = columnTypeStyles();
        return (
            <input
                type="number"
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
                    type="number"
                    placeholder={`Filtrar ${column.headerName}...`}
                    className={styles.input()}
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        );
    }
};
