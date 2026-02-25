import { useState, useMemo } from 'react';
import type { FastFiltersAddMenuProps } from './FastFiltersAddMenu.types';

export const useFastFiltersAddMenu = (props: FastFiltersAddMenuProps) => {
    const { columns, onAdd } = props;
    const [search, setSearch] = useState('');

    const filteredColumns = useMemo(() => {
        if (!search) return columns;
        return columns.filter(col =>
            col.headerName.toLowerCase().includes(search.toLowerCase())
        );
    }, [columns, search]);

    const handleAdd = (field: string) => {
        onAdd(field);
    };

    return {
        search,
        setSearch,
        filteredColumns,
        handleAdd
    };
};
