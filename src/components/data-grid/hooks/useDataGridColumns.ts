import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import type { ColumnDef } from '../DataGrid.types';
import { calculateColumnWidths, getDefaultWidth, normalizeColumns } from '../DataGrid.utils';

interface UseDataGridColumnsProps<T> {
    columns: ColumnDef<T>[];
    rows: T[];
    bodyRef: React.RefObject<HTMLDivElement | null>;
    autoFit?: boolean;
}

export const useDataGridColumns = <T>({ columns, rows, bodyRef, autoFit }: UseDataGridColumnsProps<T>) => {
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
    const [pinnedColumns, setPinnedColumns] = useState<Record<string, 'left' | 'right' | null | undefined>>({});
    const [hiddenColumns, setHiddenColumns] = useState<Record<string, boolean>>({});
    const [columnOrder, setColumnOrder] = useState<string[]>([]);

    const resizingRef = useRef<{ field: string; startX: number; startWidth: number } | null>(null);
    const manualResizedColumns = useRef<Set<string>>(new Set());

    // Initialize column order if empty or columns change length significantly?
    // Actually we only want to init logic once usually, or sync. 
    // If columns prop changes (added/removed), we should probably update order.
    // If columns prop changes (added/removed), we should probably update order.
    useEffect(() => {
        if (columns && columns.length > 0) {
            // 1. Order
            setColumnOrder(prev => {
                if (prev.length > 0) {
                    const currSet = new Set(prev);
                    const newCols = columns.filter(c => !currSet.has(String(c.field))).map(c => String(c.field));
                    const propSet = new Set(columns.map(c => String(c.field)));
                    const content = prev.filter(f => propSet.has(f));
                    return [...content, ...newCols];
                }
                return columns.map(c => String(c.field));
            });

            // 2. Init Pinned State (if empty)
            setPinnedColumns(prev => {
                const hasState = Object.keys(prev).length > 0;
                if (hasState) return prev; // Don't overwrite user interaction? Or should we sync? Usually props match init.

                const defaults: Record<string, 'left' | 'right'> = {};
                let hasDefaults = false;
                columns.forEach(c => {
                    if (c.pinned) {
                        defaults[String(c.field)] = c.pinned;
                        hasDefaults = true;
                    }
                });
                return hasDefaults ? defaults : prev;
            });
        }
    }, [columns]);

    // Merge props columns with local pinned state and REORDER them
    const effectiveColumns = useMemo(() => {
        if (!columns) return [];

        const normalized = normalizeColumns(columns);
        const colMap = new Map(normalized.map(c => [String(c.field), c]));

        // Determine field list based on columnOrder + any missing from props
        const allFields = new Set([...columnOrder, ...columns.map(c => String(c.field))]);
        const propFields = new Set(columns.map(c => String(c.field)));
        const orderedFields = Array.from(allFields).filter(field => propFields.has(field));

        // Sort
        orderedFields.sort((a, b) => {
            const idxA = columnOrder.indexOf(a);
            const idxB = columnOrder.indexOf(b);
            // If unknown (shouldn't happen due to filter), put at end
            if (idxA === -1) return 1;
            if (idxB === -1) return -1;
            return idxA - idxB;
        });

        const mappedCols = orderedFields.map(field => {
            const col = colMap.get(field)!;
            const statePinned = pinnedColumns[field];
            const effectivePinned = statePinned === undefined ? col.pinned : (statePinned === null ? undefined : statePinned);
            const isHidden = hiddenColumns[field] || false;

            return {
                ...col,
                pinned: effectivePinned,
                hidden: isHidden
            };
        }).filter(col => !col.hidden);

        const leftPinned = mappedCols.filter(c => c.pinned === 'left');
        const rightPinned = mappedCols.filter(c => c.pinned === 'right');
        const unpinned = mappedCols.filter(c => c.pinned !== 'left' && c.pinned !== 'right');

        return [...leftPinned, ...unpinned, ...rightPinned];
    }, [columns, pinnedColumns, hiddenColumns, columnOrder]);

    const handleReorder = (newOrder: string[]) => {
        setColumnOrder(newOrder);
    };

    // Initial Auto-Sizing
    const hasData = rows.length > 0;

    useEffect(() => {
        if (!bodyRef.current) return;

        const observer = new ResizeObserver((entries) => {
            const body = bodyRef.current;
            if (!body) return;

            const width = entries[0].contentRect.width;

            // Only calculate if autoFit is enabled OR we have no widths yet (initial load)
            const measuredWidths = calculateColumnWidths(effectiveColumns, rows, width, 20, autoFit);

            setColumnWidths(prev => {
                const NextWidths = { ...prev };

                Object.entries(measuredWidths).forEach(([field, width]) => {
                    if (!manualResizedColumns.current.has(field)) {
                        NextWidths[field] = width;
                    }
                });

                return NextWidths;
            });
        });

        observer.observe(bodyRef.current);
        return () => observer.disconnect();
    }, [effectiveColumns, hasData, bodyRef, autoFit]);

    // Resize Handlers
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!resizingRef.current) return;
        const { field, startX, startWidth } = resizingRef.current;
        const diff = e.clientX - startX;
        const newWidth = Math.max(50, startWidth + diff);

        setColumnWidths((prev) => ({
            ...prev,
            [field]: newWidth,
        }));
    }, []);

    const handleMouseUp = useCallback(() => {
        if (resizingRef.current) {
            manualResizedColumns.current.add(resizingRef.current.field); // Mark as manually resized
        }
        resizingRef.current = null;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
    }, [handleMouseMove]);

    const handleMouseDown = (e: React.MouseEvent, field: string) => {
        e.preventDefault();
        e.stopPropagation();
        const currentWidth = columnWidths[field] || getDefaultWidth();
        resizingRef.current = { field, startX: e.clientX, startWidth: currentWidth };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'col-resize';
    };

    const handlePin = (field: string, side: 'left' | 'right' | null) => {
        setPinnedColumns(prev => ({
            ...prev,
            [field]: side
        }));
    };

    const handleHide = (field: string) => {
        setHiddenColumns(prev => ({
            ...prev,
            [field]: true
        }));
    };

    // Memoize Sticky Offsets
    const stickyOffsets = useMemo(() => {
        const offsets: Record<string, number> = {};

        // Left Pins
        let left = 0;
        effectiveColumns.forEach((col) => {
            if (col.pinned === 'left') {
                offsets[String(col.field)] = left;
                const width = columnWidths[String(col.field)] ?? (col.width || getDefaultWidth(col.type));
                left += width;
            }
        });

        // Right Pins
        let right = 0;
        for (let i = effectiveColumns.length - 1; i >= 0; i--) {
            const col = effectiveColumns[i];
            if (col.pinned === 'right') {
                offsets[String(col.field)] = right;
                const width = columnWidths[String(col.field)] ?? (col.width || getDefaultWidth(col.type));
                right += width;
            }
        }

        return offsets;
    }, [effectiveColumns, columnWidths]);

    return {
        columnWidths,
        setColumnWidths,
        effectiveColumns,
        stickyOffsets,
        handleMouseDown,
        handlePin,
        handleHide,
        hiddenColumns,
        pinnedColumns,
        columnOrder,
        handleReorder,
        setHiddenColumns,
        setPinnedColumns
    };
};
