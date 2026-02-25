import React from 'react';
import type { ExtendedDataGridCellProps } from './DataGridCell.types';
import { Icons } from '../../../icons';
import { useDataGridCell } from './useDataGridCell';
import { cellStyles } from './DataGridCell.styles'; // Assuming cellStyles is imported from here

const DataGridCellInternal = <T extends { id: string | number }>({
    density = 'standard',
    ...props
}: ExtendedDataGridCellProps<T>) => {
    // Logic Delegated to Hook
    const {
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
        isLastPinnedLeft,
        isFirstPinnedRight,
        isChecked,
        hoveredResizeColumn,
        isScrolledLeft,
        isScrolledRight
    } = useDataGridCell({ ...props, density });

    const { col, row } = props;

    const { container, contentWrapper, checkbox, copyButton, copyIcon, copiedIcon, text, columnHighlightLine, pinnedShadow, pinnedShadowLeft } = cellStyles({
        density,
        isCheckbox: col.type === 'checkbox',
        align: col.align || 'left'
    });

    let content: React.ReactNode;

    // View Logic (JSX)
    if (col.type === 'checkbox' && !col.render) {
        content = (
            <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => handleCheckboxChange(e.target.checked)}
                onClick={(e) => e.stopPropagation()}
                className={checkbox()}
            />
        );
    } else if (col.render) {
        content = col.render({ value, row });
    } else {
        content = config.formatter ? config.formatter(value) : value;
    }

    // Apply pinned shadow if:
    // 1. Last Pinned LEFT column + Scrolled Left (meaning content is hidden on left side? NO. ScrollLeft > 0 means content on right is visible, content on left is hidden? NO.
    //    ScrollLeft > 0 causes Left Pinned Column to cover content. So we need Right Border on Left Pin.
    // 2. First Pinned RIGHT column + Scrolled Right (meaning NOT at end).
    const finalClassName = [
        container(),
        className, // This still contains pinned styles and col.className from useDataGridCell
        (isScrolledLeft && isLastPinnedLeft) ? pinnedShadow() : '',
        (isScrolledRight && isFirstPinnedRight) ? pinnedShadowLeft() : ''
    ].filter(Boolean).join(' ');

    return (
        <div className={finalClassName} style={style} role="gridcell">
            <div className={contentWrapper()}>
                <span
                    className={showEllipsis ? text() : ''}
                    title={showEllipsis ? String(value) : undefined}
                >
                    {content}
                </span>

                {isCopyable && value && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(String(value));
                        }}
                        className={copyButton()}
                        title="Copy"
                    >
                        {copiedField === field ? (
                            <Icons.Check className={copiedIcon()} />
                        ) : (
                            <Icons.Copy className={copyIcon()} />
                        )}
                    </button>
                )}
            </div>

            {/* Visual Guide Line */}
            {hoveredResizeColumn === field && (
                <div className={columnHighlightLine()} />
            )}
        </div >
    );
};

export const DataGridCell = React.memo(DataGridCellInternal) as typeof DataGridCellInternal;
