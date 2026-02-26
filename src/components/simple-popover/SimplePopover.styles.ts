import { tv } from 'tailwind-variants';

export const simplePopoverStyles = tv({
    slots: {
        container: 'relative inline-block',
        popover: 'absolute z-50 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 min-w-[200px] p-2 animate-in fade-in zoom-in-95 duration-100 origin-top-left',
    },
    variants: {
        align: {
            left: { popover: 'left-0' },
            right: { popover: 'right-0' }
        }
    },
    defaultVariants: {
        align: 'left'
    }
});
