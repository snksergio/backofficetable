
import React from 'react';
import { fastFiltersAddMenuStyles } from './FastFiltersAddMenu.styles';
import type { FastFiltersAddMenuProps } from './FastFiltersAddMenu.types';
import { useFastFiltersAddMenu } from './useFastFiltersAddMenu';

export const FastFiltersAddMenu: React.FC<FastFiltersAddMenuProps> = (props) => {
    const { container, searchInput, listContainer, item, emptyCheck, emptyText } = fastFiltersAddMenuStyles();
    const { search, setSearch, filteredColumns, handleAdd } = useFastFiltersAddMenu(props);

    return (
        <div className={container()}>
            <input
                autoFocus
                type="text"
                placeholder="Buscar filtro..."
                className={searchInput()}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className={listContainer()}>
                {filteredColumns.length === 0 && (
                    <div className={emptyText()}>Nenhum filtro encontrado</div>
                )}

                {filteredColumns.map(col => (
                    <div
                        key={String(col.field)}
                        className={item()}
                        onClick={() => handleAdd(String(col.field))}
                    >
                        <div className={emptyCheck()} />
                        <span>{col.headerName}</span>
                    </div>
                ))}
            </div>
        </div >
    );
};
