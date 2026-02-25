import { useState, useEffect, useCallback } from 'react';

export const useDataGridScrollState = (elementRef: React.RefObject<HTMLDivElement | null>) => {
    const [scrollState, setScrollState] = useState({
        left: false,
        right: false
    });

    const checkScroll = useCallback(() => {
        const el = elementRef.current;
        if (!el) return;

        const { scrollLeft, scrollWidth, clientWidth } = el;
        const isScrolledLeft = scrollLeft > 0;
        // Check if scrolled to the end (allow 1px tolerance for sub-pixel rendering)
        const isScrolledRight = Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1;

        setScrollState(prev => {
            if (prev.left === isScrolledLeft && prev.right === isScrolledRight) return prev;
            return { left: isScrolledLeft, right: isScrolledRight };
        });
    }, [elementRef]);

    useEffect(() => {
        const el = elementRef.current;
        if (!el) return;

        el.addEventListener('scroll', checkScroll, { passive: true });
        // Also check on resize as scrollWidth/clientWidth might change
        const observer = new ResizeObserver(checkScroll);
        observer.observe(el);

        // Initial check
        checkScroll();

        return () => {
            el.removeEventListener('scroll', checkScroll);
            observer.disconnect();
        };
    }, [elementRef, checkScroll]);

    return scrollState;
};
