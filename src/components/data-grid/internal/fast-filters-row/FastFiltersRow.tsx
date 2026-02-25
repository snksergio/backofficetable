import React from 'react';
import { fastFiltersRowStyles } from './FastFiltersRow.styles';
import type { FastFiltersRowProps } from './FastFiltersRow.types';
import { SimplePopover } from '../../../simple-popover/SimplePopover';
import { FastFilterChip } from '../fast-filter-chip';
import { FastFilterMenu } from '../fast-filter-menu';
import { FastFiltersAddMenu } from '../fast-filters-add-menu'; // Import
import { useFastFiltersRow } from './useFastFiltersRow';

export const FastFiltersRow: React.FC<FastFiltersRowProps> = (props) => {
    const {
        columns,
        fastFilters,
        activeFilterColumn,
        setActiveFilterColumn,
        handleFilterChange,
        clearFilter,
        hiddenColumns,
        optionsCache
    } = props;

    const { container, clearAllButton } = fastFiltersRowStyles();
    const {
        filterableColumns,
        availableColumnsToAdd,
        showFilter,
        hideFilter
    } = useFastFiltersRow({ columns, fastFilters, activeFilterColumn: null, setActiveFilterColumn: () => { }, handleFilterChange: () => { }, clearFilter: () => { }, clearAllFilters: () => { }, optionsCache: {}, hiddenColumns });

    const handleClear = (e: React.MouseEvent, field: string, col: any) => {
        e.stopPropagation();
        clearFilter(field);
        // Hide if not initially visible
        if (col.filterVisibleInitially === false) {
            hideFilter(field);
        }
    };

    if (filterableColumns.length === 0 && availableColumnsToAdd.length === 0) {
        return null;
    }

    return (
        <div className={container()}>
            {/* Render Visible Filters */}
            {filterableColumns.map(col => {
                const field = String(col.field);
                const isActive = field in fastFilters;
                const value = fastFilters[field];
                const options = col.filterOptions || optionsCache[field] || [];

                const displayValue = isActive ? getDisplayValue(value, col, options) : '';

                return (
                    <SimplePopover
                        key={field}
                        isOpen={activeFilterColumn === field}
                        onClose={() => setActiveFilterColumn(null)}
                        trigger={
                            <FastFilterChip
                                label={col.headerName}
                                active={isActive}
                                isOpen={activeFilterColumn === field}
                                displayValue={displayValue}
                                onClick={() => setActiveFilterColumn(activeFilterColumn === field ? null : field)}
                                onClear={(e) => handleClear(e, field, col)}
                            />
                        }
                        content={
                            <FastFilterMenu
                                column={col}
                                value={value}
                                options={options}
                                onChange={(val) => handleFilterChange(field, val)}
                                onClose={() => setActiveFilterColumn(null)}
                            />
                        }
                    />
                );
            })}

            {/* Render Add Filter Button */}
            {availableColumnsToAdd.length > 0 && (
                <SimplePopover
                    isOpen={activeFilterColumn === 'ADD_FILTER'}
                    onClose={() => setActiveFilterColumn(null)}
                    trigger={
                        <FastFilterChip
                            label="+ Filtro"
                            active={false}
                            onClick={() => setActiveFilterColumn(activeFilterColumn === 'ADD_FILTER' ? null : 'ADD_FILTER')}
                        />
                    }
                    content={
                        <FastFiltersAddMenu
                            columns={availableColumnsToAdd}
                            onAdd={(field) => {
                                showFilter(field);
                                setActiveFilterColumn(field); // Abre o filtro recém adicionado imediatamente
                            }}
                            onClose={() => setActiveFilterColumn(null)}
                        />
                    }
                />
            )}

            {Object.keys(fastFilters).length > 0 && (
                <button
                    onClick={props.clearAllFilters}
                    className={clearAllButton()}
                >
                    Limpar filtros
                </button>
            )}
        </div>
    );
};

// --- View Helper ---
const getDisplayValue = (value: any, column: any, options: any[]) => {
    if (Array.isArray(value)) {
        if (value.length === 0) return '';

        if (value.length > 2) {
            return `${value.length} selecionados`;
        }

        if (column.renderFilterOption) {
            return (
                <div className="flex gap-1">
                    {value.map((v: any) => {
                        const option = options.find((o: any) => o.value === v) || { label: v, value: v };
                        return (
                            <React.Fragment key={String(v)}>
                                {column.renderFilterOption(option)}
                            </React.Fragment>
                        );
                    })}
                </div>
            );
        }

        return (
            <div className="flex gap-1">
                {value.map((v: any) => {
                    const label = options.find((o: any) => o.value === v)?.label || v;
                    return (
                        <span key={String(v)} className="bg-[#F2F4F7] dark:bg-gray-700 text-[#344054] dark:text-gray-300 px-2 py-0.5 rounded-md text-[11px] font-bold whitespace-nowrap">
                            {label}
                        </span>
                    )
                })}
            </div>
        );
    }

    // Single Value
    if (column.renderFilterOption) {
        const option = options.find((o: any) => o.value === value) || { label: value, value: value };
        return column.renderFilterOption(option);
    }

    const option = options.find((o: any) => o.value === value);
    return option ? option.label : String(value);
};
