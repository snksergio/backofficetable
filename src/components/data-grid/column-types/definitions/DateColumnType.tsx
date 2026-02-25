import type { ColumnTypeDefinition, FilterInputProps, FastFilterInputProps } from '../ColumnTypes.types';
import { columnTypeStyles } from '../ColumnTypes.styles';

export const DateColumnType: ColumnTypeDefinition = {
    type: 'date',
    renderFilterInput: (props: FilterInputProps) => {
        const { itemValue, onChange } = props;
        const styles = columnTypeStyles();
        return (
            <input
                type="date"
                className={styles.input()}
                value={itemValue || ''}
                onChange={(e) => onChange(e.target.value)}
            />
        );
    },
    renderFastFilterInput: (props: FastFilterInputProps) => {
        const { value, onChange } = props;
        const styles = columnTypeStyles();
        return (
            <div className={styles.cellContentWrapper()}>
                <input
                    type="date"
                    className={styles.input()}
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        );
    }
};
