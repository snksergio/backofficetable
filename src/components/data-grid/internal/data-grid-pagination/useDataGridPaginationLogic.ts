import { useState, useEffect, useMemo } from 'react';
import type { DataGridPaginationProps } from './DataGridPagination.types';

export const useDataGridPaginationLogic = (props: DataGridPaginationProps) => {
    const {
        page,
        pageSize,
        totalItems,
        onPageChange
    } = props;

    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const [goToPageValue, setGoToPageValue] = useState<string>('');

    // Reset input when page changes externally
    useEffect(() => {
        setGoToPageValue('');
    }, [page]);

    const handleGoToPage = () => {
        const pageNum = parseInt(goToPageValue, 10);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
            onPageChange(pageNum);
        } else {
            setGoToPageValue(''); // Reset on invalid input
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleGoToPage();
        }
    };

    const getPageNumbers = useMemo(() => {
        const pages: (number | '...')[] = [];
        // Always show first page
        pages.push(1);

        if (totalPages <= 1) return pages;

        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);

        if (start > 2) {
            pages.push('...');
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < totalPages - 1) {
            pages.push('...');
        }

        // Always show last page
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    }, [page, totalPages]);

    const startItem = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
    const endItem = Math.min(page * pageSize, totalItems);

    return {
        totalPages,
        goToPageValue,
        setGoToPageValue,
        handleGoToPage,
        handleKeyDown,
        getPageNumbers,
        startItem,
        endItem
    };
};
