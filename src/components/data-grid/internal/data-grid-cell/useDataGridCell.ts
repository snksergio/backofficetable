import { useState, useMemo } from 'react';
import type { ExtendedDataGridCellProps } from './DataGridCell.types';
import { getCellValue } from '../../DataGrid.utils';
import { getColumnConfig } from '../../DataGrid.defaults';
import { cellStyles } from './DataGridCell.styles';
import { useDataGridContext } from '../../context/DataGridContext';

export const useDataGridCell = <T extends { id: string | number }>(props: ExtendedDataGridCellProps<T>) => {
    const { row, col, width, styles, stickyOffset, isSelected, onRowChange, onToggleRow } = props;
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const { hoveredResizeColumn, scrollState, columns } = useDataGridContext<T>();

    // 1. Data Extraction
    const value = getCellValue(row, col);
    const field = String(col.field);
    const config = getColumnConfig(col.type);

    // 2. Computed Properties
    const isPinnedLeft = col.pinned === 'left';
    const isPinnedRight = col.pinned === 'right';

    // Determine if it is the LAST pinned left column
    const isLastPinnedLeft = useMemo(() => {
        if (!isPinnedLeft) return false;
        const pinnedLeftCols = columns.filter(c => c.pinned === 'left');
        return pinnedLeftCols[pinnedLeftCols.length - 1]?.field === col.field;
    }, [isPinnedLeft, columns, col.field]);

    // Determine if it is the FIRST pinned right column
    const isFirstPinnedRight = useMemo(() => {
        if (!isPinnedRight) return false;
        const pinnedRightCols = columns.filter(c => c.pinned === 'right');
        return pinnedRightCols[0]?.field === col.field;
    }, [isPinnedRight, columns, col.field]);

    const showEllipsis = col.ellipsis ?? config.ellipsis;
    const isCopyable = col.copyable;

    // 3. Actions
    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleCheckboxChange = (checked: boolean) => {
        if (onToggleRow) {
            onToggleRow(row);
        } else if (onRowChange) {
            onRowChange({ ...row, [col.field]: checked });
        }
    };

    // 4. Styles Calculation
    const style: React.CSSProperties = useMemo(() => {
        const s: React.CSSProperties = { width: `${width}px` };
        if (isPinnedLeft && stickyOffset !== undefined) s.left = stickyOffset;
        else if (isPinnedRight && stickyOffset !== undefined) s.right = stickyOffset;
        return s;
    }, [width, isPinnedLeft, isPinnedRight, stickyOffset]);

    const className = useMemo(() => {
        return [
            // styles?.cell?.({ colType: col.type, density: props.density }) || '', // Moved to local DataGridCell.styles
            isPinnedLeft ? styles?.pinnedLeft?.() : '',
            isPinnedRight ? styles?.pinnedRight?.() : '',
            col.className
        ].filter(Boolean).join(' ');
    }, [styles, col.type, col.className, isPinnedLeft, isPinnedRight]); // Removed props.density from deps as it's no longer used here

    const localStyles = cellStyles();

    return {
        value,
        field,
        config,
        showEllipsis,
        isCopyable,
        copiedField,
        handleCopy,
        handleCheckboxChange,
        style,
        className,
        localStyles,
        isChecked: isSelected ?? !!value,
        hoveredResizeColumn,
        isScrolledLeft: scrollState?.left ?? false,
        isScrolledRight: scrollState?.right ?? false,
        isLastPinnedLeft,
        isFirstPinnedRight
    };
};
