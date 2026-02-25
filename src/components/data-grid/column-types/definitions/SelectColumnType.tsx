import React from 'react';
import type { ColumnTypeDefinition, FilterInputProps, FastFilterInputProps } from '../ColumnTypes.types';
import { columnTypeStyles } from '../ColumnTypes.styles';

// Helper for rendering checkboxes in fast filter
const SelectFastFilterRenderer = (props: FastFilterInputProps) => {
    const { value, onChange, column } = props;
    const styles = columnTypeStyles();
    const selectedValues = Array.isArray(value) ? value : [];
    // Prioritize options passed dynamically (e.g. from optionsCache), fallback to static column options
    const options = props.options || column.filterOptions || [];

    // Using inline styles for simplicity here, but could be extracted
    // Replicating logic from FastFilterMenu.tsx

    const toggleOption = (val: any) => {
        const newValues = selectedValues.includes(val)
            ? selectedValues.filter((v: any) => v !== val)
            : [...selectedValues, val];
        onChange(newValues);
    };

    return (
        <div className={styles.listContainer()}>
            {options.length === 0 && <div className={styles.emptyState()}>Sem opções</div>}
            {options.map((opt) => {
                const isSelected = selectedValues.includes(opt.value);
                return (
                    <label key={String(opt.value)} className={styles.optionLabel()}>
                        <input
                            type="checkbox"
                            className={styles.checkbox()}
                            checked={isSelected}
                            onChange={() => toggleOption(opt.value)}
                        />
                        {column.renderFilterOption ? column.renderFilterOption(opt) : (
                            <span className={styles.optionText(isSelected)}>
                                {opt.label}
                            </span>
                        )}
                    </label>
                )
            })}
        </div>
    )
}

export const SelectColumnType: ColumnTypeDefinition = {
    type: 'select',
    renderFilterInput: (props: FilterInputProps) => {
        const { itemValue, onChange, column } = props;
        const styles = columnTypeStyles();
        const options = column.filterOptions || [];

        return (
            <select
                className={styles.select()}
                value={itemValue || ''}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">Selecione...</option>
                {options.map(opt => (
                    <option key={String(opt.value)} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        );
    },
    renderFastFilterInput: (props: FastFilterInputProps) => {
        const styles = columnTypeStyles();
        // Pass styles down or use hook inside renderer (Renderer is inside the module so hook call is safe if componentized)
        // Since SelectFastFilterRenderer is a component, we can call hook inside.
        return <SelectFastFilterRenderer {...props} />;
    }
};
