
import { useCallback } from 'react';
import type { FastFilterMenuProps } from './FastFilterMenu.types';

export const useFastFilterMenu = (props: FastFilterMenuProps) => {
    const { column, value, onChange } = props;

    // Type definition helper
    const type = column.filterType || 'text';

    // MultiSelect Logic
    const toggleOption = useCallback((optionVal: any) => {
        const selectedValues = Array.isArray(value) ? value : [];

        if (selectedValues.includes(optionVal)) {
            onChange(selectedValues.filter((v: any) => v !== optionVal));
        } else {
            onChange([...selectedValues, optionVal]);
        }
    }, [value, onChange]);

    return {
        type,
        toggleOption
    };
};
