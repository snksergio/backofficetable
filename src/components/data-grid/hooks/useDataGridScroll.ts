import { useState, useLayoutEffect } from 'react';

export const useDataGridScroll = (
    headerRef: React.RefObject<HTMLDivElement | null>,
    bodyRef: React.RefObject<HTMLDivElement | null>,
    setIsScrolled?: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const [scrollbarWidth, setScrollbarWidth] = useState(0);

    useLayoutEffect(() => {
        const body = bodyRef.current;
        const header = headerRef.current;
        if (!body || !header) return;

        const handleScroll = () => {
            // 1. Sync Header
            header.scrollLeft = body.scrollLeft;

            // 2. Update Shadow State
            if (setIsScrolled) {
                const isScrolled = body.scrollLeft > 0;
                setIsScrolled(prev => prev !== isScrolled ? isScrolled : prev);
            }
        };

        // Calculate scrollbar width
        const observer = new ResizeObserver(() => {
            if (body) {
                const currentScrollbarWidth = body.offsetWidth - body.clientWidth;
                setScrollbarWidth(currentScrollbarWidth);
            }
        });

        body.addEventListener('scroll', handleScroll);
        observer.observe(body);

        return () => {
            body.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, [headerRef, bodyRef, setIsScrolled]);

    return { scrollbarWidth };
};
