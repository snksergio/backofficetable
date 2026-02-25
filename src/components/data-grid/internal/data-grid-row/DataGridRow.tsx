import React from 'react';
import { DataGridCell } from '../data-grid-cell/DataGridCell';
import { rowStyles } from './DataGridRow.styles';
import type { DataGridRowProps } from './DataGridRow.types';

const DataGridRowInternal = <T extends { id: string | number }>({
    row,
    index,
    className,
    onRowChange,
    columns,
    columnWidths,
    stickyOffsets,
    styles: gridStyles,
    isSelected,
    onToggleRow,
    density
}: DataGridRowProps<T>) => {

    return (
        <div
            className={`${rowStyles({ selected: isSelected, density })} ${className || ''}`}
        >
            {columns.map((col) => (
                <DataGridCell
                    key={String(col.field)}
                    row={row}
                    col={col}
                    rowIndex={index}
                    width={columnWidths[String(col.field)]}
                    stickyOffset={col.pinned ? stickyOffsets[String(col.field)] : undefined}
                    styles={gridStyles}
                    onRowChange={onRowChange}
                    isSelected={isSelected}
                    onToggleRow={onToggleRow}
                    density={density}
                />
            ))}
        </div>
    );
};

export const DataGridRow = React.memo(DataGridRowInternal) as typeof DataGridRowInternal;
