import type { ReactNode } from 'react';

export interface SimplePopoverProps {
    trigger: ReactNode;
    content: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    align?: 'left' | 'right';
    className?: string;
}
