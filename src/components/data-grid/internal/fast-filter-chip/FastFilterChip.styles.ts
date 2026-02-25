import { tv } from 'tailwind-variants';

export const fastFilterChipStyles = tv({
    slots: {
        container: `
            group flex items-center gap-2 
            h-[34px] px-2 
            bg-white dark:bg-gray-800 
            border border-dashed border-[#D0D5DD] dark:border-gray-700 
            rounded-xl 
            hover:border-[#00A859]/40 
            transition-all cursor-pointer shadow-sm select-none
        `,
        icon: 'text-gray-400 font-bold',
        label: 'text-sm text-[#101828] dark:text-gray-200 font-medium whitespace-nowrap',
        value: 'font-normal truncate max-w-[150px]',
        clearBtn: 'p-0.5 rounded-full hover:bg-black/10 text-gray-500 hover:text-gray-700 transition-colors',
        separator: 'w-[1px] h-3.5 bg-[#EAECF0] dark:bg-gray-700 mx-1', // Vertical separator
        valueBadge: 'bg-[#F2F4F7] dark:bg-gray-700 text-[#344054] dark:text-gray-300 px-2 py-0.5 rounded-md text-[11px] font-bold whitespace-nowrap',
        valueWrapper: 'flex items-center gap-1.5',
        closeIcon: 'text-[#98A2B3] dark:text-gray-500 group-hover:text-rose-500 transition-colors w-3.5 h-3.5',
        arrowIcon: 'text-[#98A2B3] dark:text-gray-500 ml-1 w-3.5 h-3.5'
    },
    variants: {
        active: {
            true: {
                // Active state is now subtle (same as default but with value content)
                // We keep it dashed/gray unless open.
                container: 'bg-white',
                label: 'text-[#101828] dark:text-gray-200',
            },
            false: {
                // Default styles already in container
            }
        },
        isOpen: {
            true: {
                // Focus state: Green border and ring
                container: 'border-dashed border-[#00A859] ring-2 ring-[#00A859]/10 hover:border-[#00A859]',
            },
            false: {}
        }
    },
    defaultVariants: {
        active: false,
        isOpen: false
    }
});
