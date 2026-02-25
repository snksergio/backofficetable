
import { useMemo } from 'react';
import { useDataGridContext } from '../../context/DataGridContext';
import { headerRowStyles } from './DataGridHeaderRow.styles';

export const useDataGridHeaderRow = <T,>() => {
    const {
        columns,
        columnWidths,
        stickyOffsets,
        styles,
        sort,
        rows,
        onResize,
        columnMenu,
        selection,
        setHoveredResizeColumn,
        scrollState,
        density // Get density from context
    } = useDataGridContext<T>();

    const rowStyles = headerRowStyles({
        density: density.value // Pass density value to styles
    });

    const isAllSelected = useMemo(() => {
        if (!rows || rows.length === 0) return false;
        return rows.every(r => selection.isRowSelected(r));
    }, [rows, selection]);

    const handleCheckboxChange = (checked: boolean) => {
        if (checked) {
            selection.selectAll();
        } else {
            selection.clear();
        }
    };

    return {
        columns,
        columnWidths,
        stickyOffsets,
        styles,
        sort,
        columnMenu,
        onResize,
        rowStyles,
        isAllSelected,
        handleCheckboxChange,
        setHoveredResizeColumn,
        isScrolledLeft: scrollState?.left ?? false,
        isScrolledRight: scrollState?.right ?? false
    };
};
