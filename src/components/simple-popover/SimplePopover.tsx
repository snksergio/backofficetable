import React, { useRef } from 'react';
import { useClickOutside } from './useClickOutside';
import { simplePopoverStyles } from './SimplePopover.styles';
import type { SimplePopoverProps } from './SimplePopover.types';

export const SimplePopover: React.FC<SimplePopoverProps> = ({
    trigger,
    content,
    isOpen,
    onClose,
    align = 'left',
    className
}) => {
    const popoverRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const { container, popover } = simplePopoverStyles({ align });

    useClickOutside(popoverRef, onClose, triggerRef);

    return (
        <div className={container({ className })}>
            <div ref={triggerRef} onClick={(e) => e.stopPropagation()}>
                {trigger}
            </div>

            {isOpen && (
                <div ref={popoverRef} className={popover()}>
                    {content}
                </div>
            )}
        </div>
    );
};
