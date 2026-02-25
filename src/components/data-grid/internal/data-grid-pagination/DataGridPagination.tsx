import React from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { paginationStyles } from './DataGridPagination.styles';
import type { DataGridPaginationProps } from './DataGridPagination.types';
import { useDataGridPaginationLogic } from './useDataGridPaginationLogic';

export const DataGridPagination: React.FC<DataGridPaginationProps> = (props) => {
    const {
        page,
        pageSize,
        totalItems,
        pageSizeOptions = [10, 25, 50],
        onPageChange,
        onPageSizeChange,
        className
    } = props;

    const styles = paginationStyles();

    const {
        totalPages,
        startItem,
        endItem,
        getPageNumbers,
        goToPageValue,
        setGoToPageValue,
        handleGoToPage,
        handleKeyDown
    } = useDataGridPaginationLogic(props);

    if (totalItems === 0) return null;

    return (
        <div className={`${styles.container()} ${className || ''} `}>
            {/* 1. Left Section: Rows Per Page + Showing Info */}
            <div className={styles.leftSection()}>
                <div className={styles.rowsPerPageWrapper()}>
                    <span className={styles.rowsPerPageLabel()}>Rows per page</span>
                    <div className={styles.selectWrapper()}>
                        <select
                            value={pageSize}
                            onChange={(e) => onPageSizeChange(Number(e.target.value))}
                            className={styles.rowsPerPageSelect()}
                        >
                            {pageSizeOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                        <ChevronDown className={styles.chevronIcon()} size={14} />
                    </div>
                </div>

                <div className={styles.divider()} />

                <span className={styles.showingLabel()}>
                    Showing {startItem} to {endItem} of {totalItems} members
                </span>
            </div>

            {/* Right Controls Wrapper: Navigation + Go To Page */}
            <div className={styles.rightControlsWrapper()}>
                {/* 2. Middle Section: Navigation Buttons */}
                <div className={styles.navSection()}>
                    <div className={styles.navButtonsGroup()}>
                        {/* First Page (optional, keeping standard Prev, but user snippet doesn't explicitly show First/Last, only Prev/Next... 
                            Wait, snippet shows Prev/Next + Numbers. I will include First/Last only if user actually requested or implies full control.
                            The snippet shown ONLY has Prev/Next. I will Stick to Prev/Next as per snippet if I must be exact, 
                            BUT user said "desproporcionais" (disproportionate), so I should fix styles.
                            I will keep First/Last as they are "Enterprise" standard but use the new styles.
                            Actually, looking at snippet: It has Prev and Next text buttons. And numbers. 
                            I will replicate the snippet structure exactly.
                        */}

                        <button
                            className={styles.navButton()}
                            onClick={() => onPageChange(page - 1)}
                            disabled={page === 1}
                            title="Previous Page"
                        >
                            <ChevronLeft size={16} />
                            <span>Prev</span>
                        </button>

                        <div className={styles.paginationContentWrapper()}>
                            {getPageNumbers.map((p, idx) => (
                                <React.Fragment key={idx}>
                                    {p === '...' ? (
                                        <button className={`${styles.pageButton()} ${styles.ellipsis()} `}>...</button>
                                    ) : (
                                        <button
                                            className={`${styles.pageButton()} ${p === page ? styles.pageButtonActive() : styles.pageButtonInactive()} `}
                                            onClick={() => onPageChange(p as number)}
                                        >
                                            {p}
                                        </button>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        <button
                            className={styles.navButton()}
                            onClick={() => onPageChange(page + 1)}
                            disabled={page === totalPages}
                            title="Next Page"
                        >
                            <span>Next</span>
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* 3. Right Section: Go To Page */}
                <div className={styles.rightSection()}>
                    <span className={styles.goToLabel()}>Go to page</span>
                    <div className={styles.goToInputContainer()}>
                        <div className={styles.goToInputWrapper()}>
                            <input
                                type="text"
                                className={styles.goToInput()}
                                value={goToPageValue}
                                onChange={(e) => setGoToPageValue(e.target.value)}
                                title="Go to page"
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <button
                            className={styles.goToButton()}
                            onClick={handleGoToPage}
                            title="Go"
                        >
                            Go
                            <ChevronRight className={styles.goToIcon()} size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
