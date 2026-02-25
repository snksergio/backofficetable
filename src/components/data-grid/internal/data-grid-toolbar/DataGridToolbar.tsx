import React from 'react';
import { Search, Filter, ChevronDown, Download } from 'lucide-react';
import type { DataGridToolbarProps } from './DataGridToolbar.types';
import type { DataGridDensity } from '../../DataGrid.types';

import { toolbarStyles } from './DataGridToolbar.styles';
import { useDataGridToolbar } from './useDataGridToolbar';
import { DataGridMoreOptions } from './DataGridMoreOptions';

export const DataGridToolbar: React.FC<DataGridToolbarProps> = ({ config }) => {

    const {
        enableSearch = true,
        enableFilters = true,
        enableColumnConfig = true,
        slots,
        onSearch,
        onOpenFilters,
        onOpenColumns,
        searchValue,

        // New Props
        columns,
        searchField,
        onSearchFieldChange,
        enableSearchColumnSelector = true, // Default true
        activeFiltersCount = 0,
        enableExport,
        enableDensitySelector,
        density,
        onDensityChange
    } = config;

    const styles = toolbarStyles();
    const { isExportMenuOpen, toggleExportMenu, closeExportMenu, handleExport } = useDataGridToolbar(config);

    return (
        <div className={styles.container()}>
            {/* Top Row: Title + Actions */}
            {/* Top Row: Search + Actions */}
            <div className={styles.topRow()}>

                {/* Left: Search (Priority) */}
                {enableSearch && onSearch && (
                    <div className={styles.searchGroup()}>
                        {/* Column Selector */}
                        {enableSearchColumnSelector && (
                            <div className={styles.searchSelectWrapper()}>
                                <select
                                    value={searchField || 'all'}
                                    onChange={(e) => onSearchFieldChange?.(e.target.value)}
                                    className={styles.searchSelect()}
                                >
                                    <option value="all">Todas</option>
                                    {columns?.map((col) => (
                                        <option key={String(col.field)} value={String(col.field)}>
                                            {col.headerName || String(col.field)}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className={styles.chevronIcon()} />
                            </div>
                        )}

                        {/* Input */}
                        <div className={styles.searchInputWrapper()}>
                            <Search className={styles.searchIcon()} />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchValue || ''}
                                onChange={(e) => onSearch(e.target.value)}
                                className={styles.searchInput()}
                            />
                        </div>
                    </div>
                )}

                {/* Right: Actions (Density, Filters, Columns, Export, CTA) */}
                <div className={styles.actionsSection()}>

                    {/* Density Selector (Now looks like a button "Standard v") */}
                    {enableDensitySelector && (
                        <div className={`${styles.filterButton()} relative`}>
                            <span>
                                {density === 'compact' ? 'Compact' : density === 'comfortable' ? 'Comfortable' : 'Standard'}
                            </span>
                            <ChevronDown className={styles.filterIcon()} />
                            <select
                                value={density || 'standard'}
                                onChange={(e) => onDensityChange?.(e.target.value as DataGridDensity)}
                                className={styles.densitySelectInput()}
                            >
                                <option value="compact">Compact</option>
                                <option value="standard">Standard</option>
                                <option value="comfortable">Comfortable</option>
                            </select>
                        </div>
                    )}

                    {/* Filter Button */}
                    {enableFilters && (
                        <button
                            onClick={onOpenFilters}
                            className={activeFiltersCount > 0 ? `${styles.filterButton()} ${styles.filterButtonActive()}` : styles.filterButton()}
                        >
                            <Filter className={styles.filterIcon()} />
                            <span className={styles.buttonLabel()}>Filters</span>
                            {activeFiltersCount > 0 && (
                                <span className={styles.badge()}>
                                    {activeFiltersCount}
                                </span>
                            )}
                        </button>
                    )}

                    {/* Columns Button (Customize) */}
                    {enableColumnConfig && (
                        <button
                            onClick={onOpenColumns}
                            className={styles.filterButton()}
                        >
                            <div className={styles.customizeButtonContent()}> {/* Wrapper for icon alignment */}
                                {/* Settings Icon for Customize */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.columnsIcon()} aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                <span className={styles.buttonLabel()}>Customize</span>
                            </div>
                        </button>
                    )}

                    {/* Separator if Export is present */}
                    {enableExport && <div className={styles.separator()}></div>}

                    {/* Export Button */}
                    {enableExport && (
                        <div className={styles.exportWrapper()}>
                            <button
                                onClick={toggleExportMenu}
                                className={styles.filterButton()}
                            >
                                <Download className={styles.filterIcon()} />
                                <span className={styles.buttonLabel()}>Export</span>
                            </button>

                            {isExportMenuOpen && (
                                <div className={styles.exportDropdown()}>
                                    {/* Overlay to close */}
                                    <div
                                        className={styles.exportOverlay()}
                                        onClick={closeExportMenu}
                                    />

                                    <div className={styles.exportMenuContent()}>
                                        <button
                                            className={styles.exportMenuItem()}
                                            onClick={() => handleExport('all')}
                                        >
                                            Export All
                                        </button>

                                        {activeFiltersCount > 0 && (
                                            <button
                                                className={styles.exportMenuItem()}
                                                onClick={() => handleExport('filtered')}
                                            >
                                                <span>Export Filtered</span>
                                                <span className={`${styles.exportMenuItemCount()} ${styles.exportMenuItemCountActive()}`}>
                                                    {activeFiltersCount}
                                                </span>
                                            </button>
                                        )}

                                        {(config.selectedCount || 0) > 0 && (
                                            <button
                                                className={styles.exportMenuItem()}
                                                onClick={() => handleExport('selected')}
                                            >
                                                <span>Export Selected</span>
                                                <span className={`${styles.exportMenuItemCount()} ${styles.exportMenuItemCountActive()}`}>
                                                    {config.selectedCount}
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* CTA Button */}
                    {config.ctaButton && (
                        <button
                            onClick={() => config.ctaButton?.()}
                            className={styles.ctaButton()}
                        >
                            {config.ctaIcon}
                            {config.ctaLabel || 'Novo Item'}
                        </button>
                    )}

                    {/* More Options Menu (Keep as icon only as requested) */}
                    {config.moreActions && config.moreActions.length > 0 && (
                        <DataGridMoreOptions actions={config.moreActions} />
                    )}

                    {slots?.end}
                </div>
            </div>

            {/* Bottom Slot */}
            {slots?.bottom}
        </div >
    );
};
