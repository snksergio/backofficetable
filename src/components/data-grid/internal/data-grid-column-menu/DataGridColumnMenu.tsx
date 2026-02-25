import React from 'react';
import type { GridColumnMenuProps } from './DataGridColumnMenu.types';
import { columnMenuStyles } from './DataGridColumnMenu.styles';
import { Icons } from '../../../icons';

export const DataGridColumnMenu: React.FC<GridColumnMenuProps> = ({
    sortConfig,
    currentColumn,
    onSort,
    onClose,
    onPin,
    currentPinned,
    onHide,
    extraItems,
    showSort = true,
    showPin = true,
    showHide = true,
    showClose = true
}) => {
    const styles = columnMenuStyles();
    const isSortedAsc = sortConfig?.field === currentColumn && sortConfig.direction === 'asc';
    const isSortedDesc = sortConfig?.field === currentColumn && sortConfig.direction === 'desc';

    const renderSortOptions = () => (
        <>
            <button
                className={`${styles.item()} ${isSortedAsc ? styles.activeItem() : ''}`}
                onClick={() => { onSort('asc'); onClose(); }}
            >
                <Icons.SortAsc />
                Sort by ASC
            </button>
            <button
                className={`${styles.item()} ${isSortedDesc ? styles.activeItem() : ''}`}
                onClick={() => { onSort('desc'); onClose(); }}
            >
                <Icons.SortDesc />
                Sort by DESC
            </button>
            <div className={styles.divider()} />
        </>
    );

    const renderPinOptions = () => (
        <>
            {currentPinned !== 'left' && (
                <button
                    className={styles.item()}
                    onClick={() => { onPin('left'); onClose(); }}
                >
                    <Icons.PinLeft />
                    Pin to Left
                </button>
            )}

            {currentPinned !== 'right' && (
                <button
                    className={styles.item()}
                    onClick={() => { onPin('right'); onClose(); }}
                >
                    <Icons.PinRight />
                    Pin to Right
                </button>
            )}

            {currentPinned && (
                <button
                    className={styles.item()}
                    onClick={() => { onPin(null); onClose(); }}
                >
                    <Icons.Unpin />
                    Unpin
                </button>
            )}
        </>
    );

    const renderHideOptions = () => (
        <button
            className={styles.item()}
            onClick={() => { onHide(); onClose(); }}
        >
            <Icons.EyeOff />
            Hide Column
        </button>
    );

    return (
        <div className={styles.container()}>
            {showSort && renderSortOptions()}
            {showPin && renderPinOptions()}

            {(showPin || showSort) && showHide && <div className={styles.divider()} />}
            {showHide && renderHideOptions()}

            {extraItems && (
                <>
                    {(showSort || showPin || showHide) && <div className={styles.divider()} />}
                    {extraItems}
                </>
            )}

            {showClose && (
                <>
                    {(showSort || showPin || showHide || extraItems) && <div className={styles.divider()} />}
                    <button className={styles.item()} onClick={onClose}>
                        <Icons.Close />
                        Close Menu
                    </button>
                </>
            )}
        </div>
    );
};
