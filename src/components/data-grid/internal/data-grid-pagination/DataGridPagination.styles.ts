import { tv } from 'tailwind-variants';

export const paginationStyles = tv({
    slots: {
        container: 'p-4 bg-white dark:bg-gray-900 border-t border-[#EAECF0] dark:border-gray-800 flex flex-col xl:flex-row items-center justify-between gap-6 transition-colors duration-200',

        // 1. Left Section (Rows Per Page + Divider + Showing Info)
        leftSection: 'flex flex-col sm:flex-row items-center gap-3',

        rowsPerPageWrapper: 'flex items-center gap-2 text-sm text-[#98A2B3] dark:text-gray-500',
        rowsPerPageLabel: 'whitespace-nowrap font-normal',

        selectWrapper: 'relative group',
        rowsPerPageSelect: `
            appearance-none 
            bg-white dark:bg-gray-800 
            border border-[#EAECF0] dark:border-gray-700 
            rounded-lg 
            pl-3 pr-7 h-9 
            text-sm font-semibold text-[#344054] dark:text-gray-300 
            outline-none 
            focus:ring-4 focus:ring-[#00A859]/10 focus:border-[#00A859] 
            transition-all cursor-pointer shadow-sm min-w-[60px]
        `,
        // Updated Icon Style: absolute right-2 top-1/2 -translate-y-1/2
        chevronIcon: 'absolute right-2 top-1/2 -translate-y-1/2 text-[#98A2B3] dark:text-gray-500 pointer-events-none group-hover:text-[#475467] dark:group-hover:text-gray-300',

        divider: 'h-4 w-[1px] bg-[#EAECF0] dark:bg-gray-800 hidden sm:block',

        showingLabel: 'text-sm text-[#98A2B3] dark:text-gray-500 whitespace-nowrap font-normal',

        // Wrapper for Nav + GoTo (Right Side)
        rightControlsWrapper: 'flex flex-wrap items-center justify-center gap-6',

        // 2. Middle Section (Navigation Buttons)
        navSection: 'flex flex-wrap items-center justify-center gap-6',
        navButtonsGroup: 'flex items-center gap-2',

        // Prev/Next/First/Last Buttons (Outlined)
        navButton: `
            flex items-center justify-center gap-2 
            px-4 h-9 
            border border-[#EAECF0] dark:border-gray-700 
            rounded-lg 
            bg-white dark:bg-gray-800 
            text-sm font-semibold text-[#344054] dark:text-gray-300 
            hover:bg-gray-50 dark:hover:bg-gray-700 
            disabled:opacity-40 disabled:cursor-not-allowed 
            transition-all shadow-sm
        `,

        // Page Numbers Group
        paginationContentWrapper: 'flex items-center gap-2', // Renamed for clarity in structure mapping

        pageButton: `
            min-w-[36px] h-9 px-2 
            rounded-lg 
            text-sm font-semibold 
            transition-all border
        `,
        // Active: bg-white dark:bg-gray-700 text-[#101828] dark:text-white border-[#D0D5DD] dark:border-gray-600 shadow-sm ring-1 ring-[#D0D5DD] dark:ring-gray-600
        pageButtonActive: 'bg-white dark:bg-gray-700 text-[#101828] dark:text-white border-[#D0D5DD] dark:border-gray-600 shadow-sm ring-1 ring-[#D0D5DD] dark:ring-gray-600',

        // Inactive: bg-white dark:bg-gray-800 text-[#667085] dark:text-gray-500 border-[#EAECF0] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#101828] dark:hover:text-white
        pageButtonInactive: 'bg-white dark:bg-gray-800 text-[#667085] dark:text-gray-500 border-[#EAECF0] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#101828] dark:hover:text-white',

        ellipsis: 'cursor-default pointer-events-none border-transparent bg-transparent text-[#667085] dark:text-gray-500',

        // 3. Right Section (Go To Page)
        rightSection: 'flex items-center gap-4',
        goToLabel: 'text-sm font-medium text-[#344054] dark:text-gray-300',
        goToInputContainer: 'flex items-center gap-2',

        goToInputWrapper: `
            flex items-center h-9 
            bg-white dark:bg-gray-800 
            border border-[#EAECF0] dark:border-gray-700 
            rounded-lg px-2 
            shadow-sm 
            focus-within:ring-4 focus-within:ring-[#00A859]/10 focus-within:border-[#00A859] 
            transition-all
        `,
        goToInput: 'w-[44px] bg-transparent text-sm font-semibold text-center text-[#101828] dark:text-white outline-none',

        goToButton: `
            flex items-center gap-2 
            px-4 h-9 
            border border-[#EAECF0] dark:border-gray-700 
            rounded-lg 
            bg-white dark:bg-gray-800 
            text-sm font-bold text-[#344054] dark:text-gray-300 
            hover:bg-gray-50 dark:hover:bg-gray-700 
            transition-all shadow-sm active:bg-gray-100 dark:active:bg-gray-700
        `,
        goToIcon: 'text-[#98A2B3] dark:text-gray-500'
    }
});
