import { tv } from 'tailwind-variants';

export const fastFiltersRowStyles = tv({
    slots: {
        container: 'flex flex-wrap items-center gap-3 px-4 py-2.5 bg-[#FCFCFD] dark:bg-gray-900/50 border-b border-[#EAECF0] dark:border-gray-800 transition-colors duration-200',

        // The chip itself
        filterChip: `
            group flex items-center gap-2 
            h-[34px] px-2 
            bg-white dark:bg-gray-800 
            border border-dashed border-[#D0D5DD] dark:border-gray-700 
            rounded-xl 
            hover:border-[#00A859]/40 
            transition-all cursor-pointer shadow-sm
            text-sm font-medium text-[#101828] dark:text-gray-200
        `,

        filterChipActive: 'border-solid border-[#00A859] ring-2 ring-[#00A859]/10 bg-[#F6FEF9] dark:bg-emerald-900/10',

        // The value badge inside the chip
        valueBadge: `
            bg-[#F2F4F7] dark:bg-gray-700 
            text-[#344054] dark:text-gray-300 
            px-2 py-0.5 rounded-md 
            text-[11px] font-bold 
            whitespace-nowrap shadow-sm
        `,

        // Count badge (e.g. "+3")
        countBadge: 'bg-[#F2F4F7] dark:bg-gray-700 text-[#344054] dark:text-gray-300 px-1.5 py-0.5 rounded text-[10px] font-bold',

        // Icons
        chevronIcon: 'text-[#98A2B3] dark:text-gray-500 ml-1',
        clearIcon: 'text-[#98A2B3] dark:text-gray-500 hover:text-rose-500 transition-colors',

        // Clear All Button
        clearAllButton: `
            text-xs font-medium text-[#667085] hover:text-rose-600 
            dark:text-gray-400 dark:hover:text-rose-400 
            underline-offset-2 hover:underline 
            px-2 py-1 rounded transition-colors
        `
    }
});
