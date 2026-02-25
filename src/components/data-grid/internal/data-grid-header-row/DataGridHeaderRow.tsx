import { ArrowUp, ArrowDown, EllipsisVertical } from 'lucide-react';
import React from 'react';
import { useDataGridHeaderRow } from './useDataGridHeaderRow';
import type { DataGridHeaderRowProps } from './DataGridHeaderRow.types';

const DataGridHeaderRowInternal = <T,>({
    onHeaderCheckboxChange
}: DataGridHeaderRowProps) => {

    const {
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
        isScrolledLeft,
        isScrolledRight
    } = useDataGridHeaderRow<T>();

    const isLastPinnedLeft = (field: any) => {
        const pinnedLeftCols = columns.filter(c => c.pinned === 'left');
        return pinnedLeftCols[pinnedLeftCols.length - 1]?.field === field;
    };

    const isFirstPinnedRight = (field: any) => {
        const pinnedRightCols = columns.filter(c => c.pinned === 'right');
        return pinnedRightCols[0]?.field === field;
    };

    return (
        <div className={styles.header()}>
            {columns.map((col) => {
                const isPinned = col.pinned;
                const fieldName = String(col.field);
                const width = columnWidths[fieldName] ?? col.width ?? 150;
                const left = isPinned === 'left' ? stickyOffsets[fieldName] : undefined;
                const right = isPinned === 'right' ? stickyOffsets[fieldName] : undefined;
                const isLastPinned = isLastPinnedLeft(col.field);
                const isFirstPinnedR = isFirstPinnedRight(col.field);

                const cellClass = [
                    rowStyles.cell(), // Use the local rowStyles for the inner cell look
                    isPinned === 'left' ? styles.pinnedLeft() : '',
                    isPinned === 'right' ? styles.pinnedRight() : '',
                    // Ensure solid background for pinned columns to prevent content bleed-thru
                    (isPinned === 'left' || isPinned === 'right') ? rowStyles.pinnedBackground() : '',
                    (isScrolledLeft && isLastPinned) ? rowStyles.pinnedShadow() : '',
                    (isScrolledRight && isFirstPinnedR) ? rowStyles.pinnedShadowLeft() : ''
                ].filter(Boolean).join(' ');

                return (
                    <div
                        key={fieldName}
                        className={cellClass}
                        style={{
                            width,
                            minWidth: width,
                            maxWidth: width,
                            left,
                            right
                        }}
                        onClick={() => col.sortable !== false && sort.handleSort(fieldName)}
                    >
                        <div className={rowStyles.headerContentContainer()}>
                            {/* Left Side: Label + Sort Arrow */}
                            <div
                                className={rowStyles.cellContent()}
                                onClick={() => col.sortable !== false && sort.handleSort(fieldName)}
                            >
                                {col.type === 'checkbox' ? (
                                    <input
                                        type="checkbox"
                                        className={rowStyles.checkboxInput()}
                                        onChange={(e) => {
                                            handleCheckboxChange(e.target.checked);
                                            onHeaderCheckboxChange?.(fieldName, e.target.checked);
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        checked={isAllSelected}
                                    />
                                ) : (
                                    <span className={rowStyles.text()} title={col.headerName}>
                                        {col.headerName}
                                    </span>
                                )}

                                {/* Sort Arrow Logic */}
                                {col.sortable !== false && (
                                    sort.config?.field === fieldName ? (
                                        sort.config.direction === 'asc' ?
                                            <ArrowUp size={14} className={rowStyles.sortIcon()} /> :
                                            <ArrowDown size={14} className={rowStyles.sortIcon()} />
                                    ) : (
                                        // Ghost Arrow (appears on hover)
                                        <ArrowDown size={14} className={rowStyles.sortIconGhost()} />
                                    )
                                )}
                            </div>

                            {/* Right Side: Options Menu */}
                            {col.enableColumnMenu !== false && col.type !== 'checkbox' && (
                                <div className={rowStyles.menuButtonContainer()}>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            columnMenu.setActiveColumn(fieldName);
                                        }}
                                        className={[
                                            rowStyles.menuButton(),
                                            columnMenu.activeColumn === fieldName ? rowStyles.menuButtonActive() : ''
                                        ].join(' ')}
                                    >
                                        <EllipsisVertical size={14} />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Resize Handle with Visual Line */}
                        {col.resizable !== false && (
                            <div
                                className={rowStyles.resizer()}
                                onMouseDown={(e) => onResize(e, fieldName)}
                                onClick={(e) => e.stopPropagation()}
                                onMouseEnter={() => setHoveredResizeColumn(fieldName)}
                                onMouseLeave={() => setHoveredResizeColumn(null)}
                            >
                                <div className={rowStyles.resizerLine()} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export const DataGridHeaderRow = React.memo(DataGridHeaderRowInternal) as typeof DataGridHeaderRowInternal;
