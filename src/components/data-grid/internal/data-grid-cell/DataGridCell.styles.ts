import { tv } from 'tailwind-variants';

export const cellStyles = tv({
    slots: {
        container: 'relative px-4 border-b border-[#EAECF0] dark:border-gray-700 whitespace-nowrap transition-colors duration-200 flex items-center text-[#475467] dark:text-gray-400',
        checkbox: 'cursor-pointer',
        copyButton: 'ml-2 p-1 text-gray-400 hover:text-blue-600 rounded opacity-0 group-hover:opacity-100 transition-opacity',
        copyIcon: 'w-3 h-3',
        copiedIcon: 'w-3 h-3 text-green-500',
        contentWrapper: 'flex items-center justify-between group h-full w-full',
        text: 'truncate',
        columnHighlightLine: 'absolute right-0 top-0 h-full w-[1.5px] bg-[#00A859]/60 z-20 pointer-events-none transition-opacity animate-in fade-in duration-200',
        pinnedShadow: 'after:w-[1px] after:bg-[#EAECF0] dark:after:bg-gray-700 after:content-[""] after:shadow-[4px_0_8px_rgba(0,0,0,0.05)]',
        pinnedShadowLeft: 'before:w-[1px] before:bg-[#EAECF0] dark:before:bg-gray-700 before:content-[""] before:shadow-[-4px_0_8px_rgba(0,0,0,0.05)]'
    },
    variants: {
        density: {
            compact: {
                container: 'py-1.5 text-xs',
                contentWrapper: "text-xs"
            },
            standard: {
                container: 'py-3.5 text-sm',
                contentWrapper: "text-sm"
            },
            comfortable: {
                container: 'py-5 text-sm',
                contentWrapper: "text-base"
            }
        },
        isCheckbox: {
            true: {
                contentWrapper: "overflow-visible clip-none"
            },
            false: {
                contentWrapper: "truncate"
            }
        },
        align: {
            left: { container: 'justify-start text-left' },
            center: { container: 'justify-center text-center' },
            right: { container: 'justify-end text-right' }
        }
    },
    defaultVariants: {
        density: "standard",
        isCheckbox: false,
        align: 'left'
    }
});
