import { forwardRef, type Ref } from 'react';
import type { DataGridProps, DataGridRef } from './DataGrid.types';
import { DataGridProvider } from './context/DataGridContext';
import { useDataGridController } from './hooks/useDataGridController';

// Components (Standardized)
import { DataGridToolbar } from './internal/data-grid-toolbar/DataGridToolbar';
import { DataGridHeaderRow } from './internal/data-grid-header-row';
import { DataGridRow } from './internal/data-grid-row';
import { DataGridPagination } from './internal/data-grid-pagination';
import { DataGridFloatingChecked } from './internal/data-grid-floating-checked';
import { DataGridModalFilters } from './internal/data-grid-modal-filters';
import { DataGridModalColumns } from './internal/data-grid-modal-columns';
import { DataGridOverlay } from './internal/data-grid-overlay';
import { SimpleModal } from '../modal/SimpleModal';
import { DataGridColumnMenu } from './internal/data-grid-column-menu';
import { FastFiltersRow } from './internal/fast-filters-row';


const DataGridInternal = <T extends { id: string | number }>(
    props: DataGridProps<T>,
    ref: Ref<DataGridRef>
) => {
    // MVC: Controller Handles Logic
    const controller = useDataGridController(props, ref);

    // Destructure for View Readability
    const {
        styles,
        contextValue,
        toolbarConfig,
        className,

        // Data & State 
        isLoading, isDataEmpty, isNoResults, rowsToRender, effectiveTotal,

        // Pagination
        showPagination, activePaginationModel, setPage, setPageSize,

        // Handlers
        handleHeaderCheckboxChange, getRowClassName,

        // Modals & fastFilters
        modals, fastFilters, selectionBar,

        // Columns (For Modals)
        columns, columnOrder, hiddenColumns, pinnedColumns, handleReorder, effectiveColumns,
        handleSort, handlePin, handleHide, sortConfig

    } = controller;

    const { optionsCache } = fastFilters;
    const { selectionConfig, paginationConfig, slots } = props;

    const ColumnMenuComponent = slots?.columnMenu || DataGridColumnMenu;

    return (
        <DataGridProvider value={contextValue}>
            <div className={`${styles.wrapper()} ${className || ''}`} ref={contextValue.containerRef}>
                {/* Toolbar (Fixed Top) */}
                <DataGridToolbar config={toolbarConfig} />

                {/* --- FAST FILTERS ROW (Fixed horizontally & vertically) --- */}
                <FastFiltersRow
                    columns={columns}
                    hiddenColumns={hiddenColumns}
                    fastFilters={fastFilters.data}
                    activeFilterColumn={fastFilters.activeColumn}
                    setActiveFilterColumn={fastFilters.setActiveColumn}
                    handleFilterChange={fastFilters.onChange}
                    clearFilter={fastFilters.onClear}
                    clearAllFilters={fastFilters.onClearAll}
                    optionsCache={optionsCache}
                />

                {/* Unified Scroll Container (Handles X / Y scroll for everything) */}
                <div className={styles.scrollContainer()} ref={contextValue.bodyRef}>

                    {/* Viewport for Headers (Sticky Top) */}
                    <div className={styles.headerViewport()}>
                        <DataGridHeaderRow
                            onHeaderCheckboxChange={handleHeaderCheckboxChange}
                        />
                    </div>

                    {/* Body Content */}
                    <div className={styles.bodyViewport()}>
                        <div className={styles.bodyContent()}>
                            <DataGridOverlay
                                loading={isLoading}
                                isDataEmpty={isDataEmpty}
                                isNoResults={isNoResults}
                                renderLoading={props.renderLoading}
                                renderEmpty={props.renderEmpty}
                                renderNoResults={props.renderNoResults}
                                hasData={rowsToRender && rowsToRender.length > 0}
                            />

                            {/* Render rows */}
                            {!isDataEmpty && !isNoResults && rowsToRender?.map((row, index) => (
                                <DataGridRow
                                    key={row.id}
                                    row={row}
                                    index={index}
                                    onRowChange={controller.onRowChange}
                                    className={getRowClassName?.({ row, index })}
                                    columns={effectiveColumns}
                                    columnWidths={contextValue.columnWidths}
                                    stickyOffsets={contextValue.stickyOffsets}
                                    styles={styles}
                                    isSelected={contextValue.selection.isRowSelected(row)}
                                    onToggleRow={contextValue.selection.toggleRow}
                                    density={contextValue.density.value}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Footer (Inside scroll? Typically fixed or sticky bottom. User moved pagination inside wrapper in previous files?) 
                        If we want pagination fixed at bottom of wrapper, it should be OUTSIDE scrollContainer.
                        Let's check where it was: It was inside 'wrapper', after 'bodyViewport'.
                        So it should be outside scrollContainer to remain fixed.
                    */}
                </div>

                {/* Footer (Fixed Bottom) */}
                {showPagination && (
                    <DataGridPagination
                        page={activePaginationModel.page}
                        pageSize={activePaginationModel.pageSize}
                        totalItems={effectiveTotal}
                        onPageChange={setPage}
                        onPageSizeChange={setPageSize}
                        pageSizeOptions={paginationConfig?.pageSizeOptions}
                        className={styles.pagination()}
                    />
                )}
            </div>

            {/* Floating Selection */}
            {selectionBar.hasSelection && (
                <DataGridFloatingChecked
                    count={selectionBar.selectedCount}
                    totalCount={selectionConfig?.enableGlobal !== false ? selectionBar.totalCount : undefined}
                    onSelectAll={selectionBar.onSelectAll}
                    onSelectGlobal={selectionConfig?.enableGlobal !== false ? selectionBar.onSelectGlobal : undefined}
                    onClear={selectionBar.onClear}
                    actions={selectionConfig?.actions ? selectionConfig.actions(selectionBar.selectedIds, selectionBar.onClear) : undefined}
                    isPageSelected={selectionBar.isPageSelected}
                />
            )}

            {/* Modals */}
            <DataGridModalFilters
                isOpen={modals.filter.isOpen}
                onClose={modals.filter.onClose}
                columns={columns}
                filterModel={contextValue.filters.model}
                onApply={contextValue.filters.setModel}
                gridId={toolbarConfig.persistId}
            />

            <DataGridModalColumns
                isOpen={modals.column.isOpen}
                onClose={modals.column.onClose}
                allColumns={columns}
                columnOrder={columnOrder}
                hiddenColumns={hiddenColumns}
                pinnedColumns={pinnedColumns}
                onReorder={handleReorder}
                onApply={modals.column.onApply}
            />

            {/* Column Menu Modal */}
            <SimpleModal isOpen={!!modals.menu.activeColumn} onClose={() => modals.menu.setActiveColumn(null)}>
                {modals.menu.activeColumn && (() => {
                    const colDef = effectiveColumns.find(c => String(c.field) === modals.menu.activeColumn);
                    const extraItems = colDef?.renderMenuItems?.({
                        onClose: () => modals.menu.setActiveColumn(null),
                        column: colDef
                    });

                    return (
                        <ColumnMenuComponent
                            currentColumn={modals.menu.activeColumn}
                            sortConfig={sortConfig}
                            onSort={(direction) => handleSort(modals.menu.activeColumn!, direction)}
                            onPin={(side) => handlePin(modals.menu.activeColumn!, side)}
                            currentPinned={colDef?.pinned}
                            onClose={() => modals.menu.setActiveColumn(null)}
                            onHide={() => handleHide(modals.menu.activeColumn!)}
                            extraItems={extraItems}
                            showSort={colDef?.columnMenuConfig?.showSort ?? colDef?.sortable ?? true}
                            showPin={colDef?.columnMenuConfig?.showPin ?? true}
                            showHide={colDef?.columnMenuConfig?.showHide ?? true}
                            showClose={colDef?.columnMenuConfig?.showClose ?? true}
                        />
                    );
                })()}
            </SimpleModal>

        </DataGridProvider >
    );
};

// Helper type for forwardRef with Generics
type DataGridComponent = <T extends { id: string | number }>(
    props: DataGridProps<T> & { ref?: Ref<DataGridRef> }
) => React.ReactElement;

export const DataGrid = forwardRef(DataGridInternal) as DataGridComponent;
