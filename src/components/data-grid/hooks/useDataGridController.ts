import { useState, useRef, useMemo, useEffect, useCallback, useImperativeHandle, type Ref } from 'react';
import type { DataGridProps, DataGridRef, DataGridToolbarConfig, DataGridDensity, DataGridState } from '../DataGrid.types';
import { dataGridStyles } from '../DataGrid.styles';
import type { DataGridContextType } from '../context/DataGridContext';

// Hooks
import { useDataGridColumns } from './useDataGridColumns';
import { useDataGridSort } from './useDataGridSort';
import { useDataGridPagination } from './useDataGridPagination';
import { useDataGridQuery } from './useDataGridQuery';
import { useDataGridFilters } from './useDataGridFilters';
import { useDataGridProcessor } from './useDataGridProcessor';
import { useDataGridSelection } from './useDataGridSelection';
import { useDataGridExportLogic } from './useDataGridExportLogic';
import { useDataGridStatePersistence } from './useDataGridStatePersistence';
import { useDataGridFastFilters } from './useDataGridFastFilters';
import { useDataGridScrollState } from './useDataGridScrollState';

export const useDataGridController = <T extends { id: string | number }>(
    props: DataGridProps<T>,
    ref: Ref<DataGridRef>
) => {
    const {
        rows: propRows,
        columns = [],
        fetchData,
        loading: propLoading,
        toolbar,
        paginationConfig,
        selectionConfig,
        initialFilterModel,
        autoHeight = false,
        autoFit = false,
        onRowChange,
        onRowsChange,
        getRowClassName,
        className,
        // slots, // unused
        sortModel,
        onSortModelChange,
        paginationModel,
        onPaginationModelChange,
        rowCount: propRowCount,
        selectionModel,
        onSelectionModelChange,
        getRowId,
        density: propDensity,
        onDensityChange,
        persistId,
    } = props;

    // --- Config Extraction ---
    const initialSearchField = toolbar?.searchField || 'all';

    // --- 1. UI State ---
    const [activeMenuColumn, setActiveMenuColumn] = useState<string | null>(null);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [currentSearchField, setCurrentSearchField] = useState(initialSearchField);

    // Density State
    const [internalDensity, setInternalDensity] = useState<DataGridDensity>('standard');
    const density = propDensity ?? internalDensity;
    const handleSetDensity = useCallback((d: DataGridDensity) => {
        setInternalDensity(d);
        onDensityChange?.(d);
    }, [onDensityChange]);

    // Visual State
    const [hoveredResizeColumn, setHoveredResizeColumn] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    const styles = useMemo(() => dataGridStyles({ autoHeight }), [autoHeight]);

    // --- 2. Hooks Initialization ---

    // A. Filters
    const { filterModel, setFilterModel } = useDataGridFilters({ initialFilters: initialFilterModel });

    // --- Fast Filters Integration ---
    const {
        fastFilters,
        activeFilterColumn,
        setActiveFilterColumn,
        handleFilterChange,
        clearFilter,
        clearAllFilters,
        optionsCache,
        effectiveFilterModel: fastFilterModelResult,
        setFastFilters // Capture setter for persistence restoration
    } = useDataGridFastFilters({
        columns,
        rows: (fetchData) ? [] : (propRows || []),
    });

    const mergedFilterModel = useMemo(() => ({
        items: [...filterModel.items, ...fastFilterModelResult.items],
        logicOperator: 'AND' as const
    }), [filterModel, fastFilterModelResult]);

    // B. Pagination
    const {
        setPage,
        setPageSize,
        paginationModel: activePaginationModel,
    } = useDataGridPagination({
        rows: [],
        initialPageSize: paginationConfig?.initialPageSize || 10,
        paginationMode: paginationConfig?.mode ?? (fetchData ? 'server' : 'client'),
        paginationModel,
        onPaginationModelChange
    });

    // C. Server Query
    const isServerSide = !!fetchData;
    const { queryRows, setQueryData, queryTotal, queryLoading, refetch } = useDataGridQuery({
        fetchData,
        paginationModel: activePaginationModel,
        sortModel: sortModel || null,
        filterModel: mergedFilterModel,
        searchValue,
        enabled: isServerSide
    });

    // --- 3. Imperative Handle (Refresh) ---
    useImperativeHandle(ref, () => ({
        refresh: () => {
            if (isServerSide) {
                refetch();
            } else {
                console.warn('DataGrid: refresh() called but table is in Client-Side mode (fetchData not provided). Ignoring.');
            }
        }
    }));

    // D. Raw Rows (Server vs Client)
    const rawRows = isServerSide ? (queryRows || []) : (propRows || []);

    // E. Columns
    const {
        columnWidths, setColumnWidths, effectiveColumns, stickyOffsets,
        handleMouseDown: handleResize, handlePin, handleHide, hiddenColumns, pinnedColumns, columnOrder, handleReorder,
        setHiddenColumns, setPinnedColumns
    } = useDataGridColumns({ columns, rows: rawRows, bodyRef, autoFit });

    // F. Sorting
    const { sortConfig, handleSort } = useDataGridSort({
        rows: [],
        effectiveColumns,
        sortMode: 'server', // Logic handled at Processor or Query level mostly
        sortModel,
        onSortModelChange
    });

    // G. Processor (Client Side Logic)
    const { processedRows, total: processedTotal } = useDataGridProcessor({
        rows: isServerSide ? [] : rawRows,
        columns,
        filterModel: mergedFilterModel,
        sortModel: sortConfig || undefined,
        paginationModel: activePaginationModel,
        search: searchValue,
        searchField: currentSearchField
    });

    // Derived Data
    const rowsToRender = isServerSide ? (queryRows || []) : processedRows;
    const effectiveTotal = propRowCount ?? (isServerSide ? queryTotal : processedTotal);

    // H. Selection
    const selection = useDataGridSelection({
        rows: rawRows,
        visibleRows: rowsToRender,
        getRowId: getRowId,
        selectionModel: selectionModel,
        onSelectionModelChange: onSelectionModelChange,
        totalCount: effectiveTotal
    });

    // Types required for View
    const isLoading = propLoading || queryLoading;
    const isDataEmpty = !isLoading && rawRows.length === 0;
    const isNoResults = !isLoading && rawRows.length > 0 && rowsToRender.length === 0;
    const showPagination = paginationConfig?.enabled !== false && !isDataEmpty;

    // Export Logic
    const { handleExport } = useDataGridExportLogic({
        isServerSide,
        queryRows,
        rawRows,
        processedRows,
        selection,
        columns
    });

    // I. Scroll State
    const scrollState = useDataGridScrollState(bodyRef);
    const isScrolled = scrollState.left;

    // J. Persistence Logic
    useEffect(() => {
        if (selectionConfig?.keepOnPageChange === false && selection.selectedCount > 0) {
            selection.handleClearSelection();
        }
    }, [activePaginationModel.page, selectionConfig?.keepOnPageChange]);

    // Optimize: Use ref to access latest toolbar callbacks without breaking memoization
    const toolbarRef = useRef(toolbar);
    useEffect(() => { toolbarRef.current = toolbar; }, [toolbar]);

    const handleSearch = useCallback((val: string) => {
        setSearchValue(val);
        toolbarRef.current?.onSearchFieldChange?.(val);
    }, []);

    const handleSetSearchField = useCallback((field: string) => {
        setCurrentSearchField(field);
        toolbarRef.current?.onSearchFieldChange?.(field);
    }, []);

    const toolbarConfig: DataGridToolbarConfig = useMemo(() => ({
        ...toolbar,
        enableSearch: toolbar?.enableSearch ?? true,
        enableFilters: toolbar?.enableFilters ?? true,
        enableColumnConfig: toolbar?.enableColumnConfig ?? true,
        searchValue: searchValue,
        onSearch: handleSearch,
        onOpenFilters: () => setIsFilterModalOpen(true),
        onOpenColumns: () => setIsColumnModalOpen(true),
        activeFiltersCount: filterModel.items.filter(i => (i.value !== '' && i.value !== null)).length || 0,
        columns: columns,
        searchField: currentSearchField,
        onSearchFieldChange: handleSetSearchField,
        enableSearchColumnSelector: toolbar?.enableSearchColumnSelector !== false,
        enableExport: toolbar?.enableExport,
        selectedCount: selection.selectedCount,
        onExport: handleExport,
        moreActions: toolbar?.moreActions,
        enableDensitySelector: toolbar?.enableDensitySelector ?? false, // Default false until requested
        density: density,
        onDensityChange: handleSetDensity,
        persistId: persistId
    }), [toolbar, searchValue, handleSearch, filterModel.items, columns, currentSearchField, handleSetSearchField, handleExport, density, handleSetDensity, persistId, selection.selectedCount]);

    const latestRowsRef = useRef(rawRows);
    useEffect(() => { latestRowsRef.current = rawRows; }, [rawRows]);

    const handleRowChangeContext = useCallback((newRow: T) => {
        onRowChange?.(newRow);
        if (onRowsChange) {
            const currentRows = latestRowsRef.current;
            const newRows = currentRows.map(r => r.id === newRow.id ? newRow : r);
            onRowsChange(newRows);
        }
        if (isServerSide && setQueryData) {
            setQueryData(prev => prev.map(r => r.id === newRow.id ? newRow : r));
        }
    }, [onRowChange, onRowsChange, isServerSide, setQueryData]);

    // K. State Persistence Logic (Unified)
    const restoreState = useCallback((newState: DataGridState) => {
        if (newState.filterModel) setFilterModel(newState.filterModel);
        if (newState.sortModel !== undefined) onSortModelChange?.(newState.sortModel);
        if (newState.paginationModel) {
            setPage(newState.paginationModel.page);
            setPageSize(newState.paginationModel.pageSize);
        }
        if (newState.density) handleSetDensity(newState.density);
        if (newState.fastFilters) setFastFilters(newState.fastFilters);
        if (newState.columnVisibilityModel) setHiddenColumns(newState.columnVisibilityModel);
        if (newState.pinnedColumns) setPinnedColumns(newState.pinnedColumns);
        if (newState.columnOrder) handleReorder(newState.columnOrder);
    }, [setFilterModel, onSortModelChange, setPage, setPageSize, handleSetDensity, setFastFilters, setHiddenColumns, setPinnedColumns, handleReorder]);

    const gridState: DataGridState = useMemo(() => ({
        filterModel,
        sortModel: sortConfig || null,
        paginationModel: activePaginationModel, // Fixed duplicate
        density,
        fastFilters: fastFilters, // Include in persisted state
        columnVisibilityModel: hiddenColumns,
        pinnedColumns: pinnedColumns,
        columnOrder: columnOrder
    }), [filterModel, sortConfig, activePaginationModel, density, fastFilters, hiddenColumns, pinnedColumns, columnOrder]);

    // L. Auto-Clear Filters for Hidden Columns
    useEffect(() => {
        Object.keys(hiddenColumns).forEach(field => {
            if (hiddenColumns[field] === true) {
                // If there's an active fast filter, clear it
                if (fastFilters[field] !== undefined && fastFilters[field] !== '') {
                    clearFilter(field);
                }
                // Also check deep filterModel if needed, but fastFilters syncs to it. 
                // Ideally we should clear the main filterModel item too if it exists.
                const existsInMain = filterModel.items.find(i => i.field === field);
                if (existsInMain) {
                    // We need a way to remove it from main model too, but 'clearFilter' currently only handles fastFilters state?
                    // No, useDataGridFastFilters usually manages its own state which is then merged.
                    // If the user used the Advanced Modal, it's in `filterModel`.
                    // We should probably remove it from `filterModel` as well.
                    const newItems = filterModel.items.filter(i => i.field !== field);
                    if (newItems.length !== filterModel.items.length) {
                        setFilterModel({ ...filterModel, items: newItems });
                    }
                }
            }
        });
    }, [hiddenColumns, fastFilters, clearFilter, filterModel, setFilterModel]);

    useDataGridStatePersistence({
        gridId: persistId,
        onStateChange: restoreState,
        currentState: gridState
    });

    const contextValue: DataGridContextType<T> = useMemo(() => ({
        rows: rowsToRender,
        total: effectiveTotal,
        isLoading: !!isLoading,
        columns: effectiveColumns,
        columnWidths,
        stickyOffsets,
        setColumnWidths,
        state: gridState,
        restoreState,
        sort: { config: sortConfig, handleSort },
        filters: { model: filterModel, setModel: setFilterModel, isOpen: isFilterModalOpen, setIsOpen: setIsFilterModalOpen },
        pagination: { model: activePaginationModel, setPage, setPageSize },
        columnMenu: {
            activeColumn: activeMenuColumn,
            setActiveColumn: setActiveMenuColumn,
            modalIsOpen: false,
            setModalIsOpen: () => { }
        },
        search: { value: searchValue, setValue: setSearchValue, field: currentSearchField, setField: setCurrentSearchField },
        density: { value: density, setValue: handleSetDensity },
        selection: {
            field: 'id',
            count: selection.selectedCount,
            selectedIds: selection.selectedIds,
            selectAll: selection.handleSelectAll,
            selectGlobal: selection.handleSelectGlobal,
            clear: selection.handleClearSelection,
            toggleRow: selection.toggleRow,
            isRowSelected: selection.isRowSelected
        },
        styles,
        toolbarConfig: toolbarConfig,
        containerRef: containerRef as React.RefObject<HTMLDivElement>,
        headerRef: headerRef as React.RefObject<HTMLDivElement>,
        bodyRef: bodyRef as React.RefObject<HTMLDivElement>,
        onResize: handleResize,
        onPin: handlePin,
        onHide: handleHide,
        onReorder: handleReorder,
        onRowChange: handleRowChangeContext,
        hoveredResizeColumn,
        setHoveredResizeColumn,
        isScrolled,
        scrollState
    }), [
        rowsToRender, effectiveTotal, isLoading, effectiveColumns, columnWidths, stickyOffsets, setColumnWidths,
        sortConfig, handleSort,
        filterModel, setFilterModel, isFilterModalOpen,
        activePaginationModel, setPage, setPageSize,
        activeMenuColumn, hoveredResizeColumn, isScrolled,
        searchValue, currentSearchField,
        selection.selectedCount, selection.selectedIds, selection.handleSelectAll, selection.handleClearSelection, selection.toggleRow, selection.isRowSelected,
        styles, toolbarConfig,
        handleResize, handlePin, handleHide, handleReorder, handleRowChangeContext,
        containerRef, headerRef, bodyRef,
        gridState
    ]);

    const handleHeaderCheckboxChange = useCallback((_field: string, checked: boolean) => {
        if (checked) {
            selection.handleSelectAll();
        } else {
            selection.handleClearSelection();
        }
    }, [selection.handleSelectAll, selection.handleClearSelection]);

    return {
        // Core Logic
        contextValue,

        // Data for View
        rowsToRender,
        effectiveTotal,
        isLoading,
        isDataEmpty,
        isNoResults,
        showPagination,
        activePaginationModel,

        // Configs & Styles
        styles,
        toolbarConfig,
        className,

        // Handlers (Directly needed by View outside Context)
        setPage,
        setPageSize,
        handleHeaderCheckboxChange,
        getRowClassName,

        // Modal State
        modals: {
            filter: { isOpen: isFilterModalOpen, onClose: () => setIsFilterModalOpen(false), onApply: setFilterModel },
            column: {
                isOpen: isColumnModalOpen,
                onClose: () => setIsColumnModalOpen(false),
                onApply: (h: Record<string, boolean>, p: Record<string, 'left' | 'right' | null | undefined>) => {
                    setHiddenColumns(h);
                    setPinnedColumns(p);
                }
            },
            menu: { activeColumn: activeMenuColumn, setActiveColumn: setActiveMenuColumn }
        },

        // Fast Filters (Directly needed by View)
        fastFilters: {
            data: fastFilters,
            activeColumn: activeFilterColumn,
            setActiveColumn: setActiveFilterColumn,
            onChange: handleFilterChange,
            onClear: clearFilter,
            onClearAll: clearAllFilters,
            optionsCache
        },

        // Selection Floating Bar Logic
        selectionBar: {
            hasSelection: (selectionModel || selection.selectedCount > 0),
            selectedCount: selection.selectedCount,
            totalCount: effectiveTotal,
            onSelectAll: selection.handleSelectAll,
            onSelectGlobal: selection.handleSelectGlobal,
            onClear: selection.handleClearSelection,
            selectedIds: selection.selectedIds,
            isPageSelected: selection.isPageSelected
        },

        // Columns Data needed for modals
        columns,
        columnOrder,
        hiddenColumns,
        pinnedColumns,
        handleReorder,
        effectiveColumns,
        handleSort,
        handlePin,
        handleHide,
        onHide: handleHide,
        sortConfig,
        onRowChange: handleRowChangeContext,
        scrollState // Expose new state
    };
};
