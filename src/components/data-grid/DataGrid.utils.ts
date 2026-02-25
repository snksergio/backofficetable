import type { ColumnDef, ColumnType } from './DataGrid.types';
import { MEASUREMENT_FONT } from './DataGrid.styles';
import { getColumnConfig } from './DataGrid.defaults';
import { getCellValue } from './utils/dataUtils';

export { getCellValue };

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

export const measureTextWidth = (text: string, font: string = MEASUREMENT_FONT): number => {
    if (!context) return 0;
    context.font = font;
    return context.measureText(text).width;
};

export const getDefaultWidth = (type?: ColumnType): number => {
    return getColumnConfig(type).width;
};

/**
 * Merges user-defined columns with global defaults based on column type.
 * This ensures that behavior flags (sortable, resizable, etc.) are applied
 * implicitly if not overridden by the user.
 */
export const normalizeColumns = <T>(columns: ColumnDef<T>[]): ColumnDef<T>[] => {
    return columns.map(col => {
        const defaults = getColumnConfig(col.type);

        return {
            ...col,
            width: col.width ?? defaults.width,
            // Only apply default if user property is UNDEFINED. 
            // If user explicitly passed true/false, we respect it.
            sortable: col.sortable ?? defaults.sortable,
            resizable: col.resizable ?? defaults.resizable,
            enableColumnMenu: col.enableColumnMenu ?? defaults.enableColumnMenu,
            // Note: ellipsis/formatter are handled differently usually (formatter in render), 
            // but we can merge them here if needed. For now focusing on behavior flags requested.
        };
    });
};

export const calculateColumnWidths = <T>(
    columns: ColumnDef<T>[],
    rows: T[],
    containerWidth: number,
    sampleSize: number = 20,
    autoFit: boolean = false
): Record<string, number> => {
    const widths: Record<string, number> = {};
    let totalContentWidth = 0;

    // Layer 1 & 2: Type Heuristics + Smart Sampling
    columns.forEach((col) => {
        if (col.width) {
            widths[String(col.field)] = col.width;
            totalContentWidth += col.width;
            return;
        }

        // Layer 1: Type Heuristics (Base Defaults)
        let calculatedWidth = getDefaultWidth(col.type);

        // Layer 2: Smart Content Sampling (based on config OR global autoFit)
        const config = getColumnConfig(col.type);
        if (config.autoWidth || autoFit) {
            // Measure Header
            let maxWidth = measureTextWidth(col.headerName) + 32;

            // Measure Rows (Sample)
            const sampleRows = rows.slice(0, sampleSize);
            sampleRows.forEach((row) => {
                const value = getCellValue(row, col);
                const text = String(value ?? '');
                const width = measureTextWidth(text) + 32;
                if (width > maxWidth) {
                    maxWidth = width;
                }
            });

            // Update if measured content is larger than default
            if (maxWidth > calculatedWidth) {
                calculatedWidth = maxWidth;
            }
        }

        // Apply min/max constraints
        if (col.minWidth && calculatedWidth < col.minWidth) calculatedWidth = col.minWidth;
        if (col.maxWidth && calculatedWidth > col.maxWidth) calculatedWidth = col.maxWidth;

        widths[String(col.field)] = calculatedWidth;
        totalContentWidth += calculatedWidth;
    });

    // Layer 3: Flex Space Distribution
    // Distribute remaining space to flexible columns (those without explicit width)
    if (containerWidth > 0 && totalContentWidth < containerWidth) {
        const remainingSpace = containerWidth - totalContentWidth;
        const flexibleColumns = columns.filter(col => !col.width);

        // If autoFit is enabled, and we have space, but maybe no "flexible" columns found (standard case shouldn't happen if we removed widths),
        // we should fallback to distributing to ALL columns or just "flexible" ones.
        // In the user's case, all columns have minWidth but no width, so they are flexible.

        const targets = flexibleColumns.length > 0 ? flexibleColumns : (autoFit ? columns : []);

        if (targets.length > 0) {
            const extraPerColumn = Math.floor(remainingSpace / targets.length);
            let distributed = 0;

            targets.forEach((col, index) => {
                const field = String(col.field);

                // Give the remainder to the last column to ensure perfect fit
                const isLast = index === targets.length - 1;
                const extra = isLast ? (remainingSpace - distributed) : extraPerColumn;

                widths[field] = (widths[field] || 0) + extra;
                distributed += extra;
            });
        }
    }

    return widths;
};
