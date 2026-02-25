import { tv } from 'tailwind-variants';

export const toolbarStyles = tv({
    slots: {
        container: 'flex flex-col bg-white dark:bg-gray-900 rounded-t-xl transition-colors duration-200',

        // The main bar containing Search + Buttons
        topRow: `
            p-4 
            border-b border-[#EAECF0] dark:border-gray-800 
            flex flex-wrap items-center justify-between gap-4
        `,

        // Title section
        titleSection: 'flex flex-col gap-1',
        title: 'text-lg font-bold text-[#101828] dark:text-white',
        description: 'text-sm text-[#475467] dark:text-gray-400',

        // Action Section (Buttons Group)
        actionsSection: 'flex items-center gap-2',

        separator: 'h-6 w-[1px] bg-[#EAECF0] dark:bg-gray-800 mx-0.5',
        customizeButtonContent: 'flex items-center gap-2',

        // Search Group (Now on the left/flex-grow)
        searchGroup: 'flex items-center gap-2 flex-grow max-w-md',
        searchSelectWrapper: 'relative',
        searchSelect: `
            appearance-none 
            pl-3 pr-8 py-2 
            bg-white dark:bg-gray-800 
            border border-[#D0D5DD] dark:border-gray-700 
            rounded-lg 
            text-sm text-[#344054] dark:text-gray-300 font-medium
            focus:ring-2 focus:ring-[#00A859]/10 focus:border-[#00A859]
            outline-none transition-all cursor-pointer shadow-sm
        `,
        chevronIcon: 'absolute right-2.5 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none w-4 h-4',

        searchInputWrapper: 'relative flex-grow group',
        searchIcon: 'absolute left-3 top-1/2 -translate-y-1/2 text-[#667085] dark:text-gray-500 transition-colors group-focus-within:text-[#00A859] w-[18px] h-[18px]',
        searchInput: `
            w-full pl-10 pr-4 py-2 
            border border-[#D0D5DD] dark:border-gray-700 
            rounded-lg text-sm 
            bg-white dark:bg-gray-800 dark:text-white 
            focus:ring-4 focus:ring-[#00A859]/10 focus:border-[#00A859] 
            outline-none transition-all 
            placeholder-[#667085] dark:placeholder-gray-500
        `,

        // Density Select
        densitySelectInput: 'absolute inset-0 w-full h-full opacity-0 cursor-pointer',

        // Filter & Button Group
        filterGroup: 'flex items-center gap-2',

        // Standard Button Style (Matches "Standard", "Filters", "Customize", "Export")
        filterButton: `
            inline-flex items-center justify-center gap-2 
            px-4 h-9 
            border border-[#EAECF0] dark:border-gray-800 
            rounded-lg 
            bg-white dark:bg-gray-800 
            text-sm font-semibold text-[#344054] dark:text-gray-300 
            hover:bg-gray-50 dark:hover:bg-gray-700 
            disabled:opacity-40 disabled:cursor-not-allowed 
            transition-all shadow-sm 
            outline-none whitespace-nowrap shrink-0 
            [&_svg]:shrink-0 [&_svg]:size-4 leading-none
        `,
        filterButtonActive: 'bg-gray-50 dark:bg-gray-700 text-[#101828] dark:text-white border-[#D0D5DD] dark:border-gray-600',

        columnsIcon: 'w-4 h-4 text-[#344054] dark:text-gray-300', // Used inside button
        filterIcon: 'w-4 h-4 text-[#344054] dark:text-gray-300', // Used inside button

        // Label inside buttons (hidden on mobile if needed, per user HTML "hidden lg:inline")
        buttonLabel: 'hidden lg:inline',

        // Primary CTA Button
        ctaButton: `
            flex items-center gap-2 
            px-4 py-2 
            bg-[#00A859] hover:bg-[#008F4C] 
            text-white 
            rounded-lg text-sm font-semibold 
            transition-all shadow-sm 
            ring-offset-2 focus:ring-2 focus:ring-[#00A859] 
            dark:ring-offset-gray-900
        `,

        badge: 'ml-1 bg-[#F2F4F7] dark:bg-gray-700 text-[#344054] dark:text-gray-300 text-[10px] font-bold px-1.5 py-0.5 rounded-md min-w-[18px] text-center',

        // Export Menu
        exportWrapper: 'relative',
        exportDropdown: 'absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-[#EAECF0] dark:border-gray-700 rounded-lg shadow-xl z-50 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right',
        exportOverlay: 'fixed inset-0 z-40',
        exportMenuContent: 'relative z-50 flex flex-col',
        exportMenuItem: 'w-full flex items-center justify-between px-4 py-2.5 text-sm text-[#344054] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left font-medium',
        exportMenuItemCount: 'bg-[#F2F4F7] dark:bg-gray-700 text-[#344054] dark:text-gray-300 px-1.5 py-0.5 rounded text-[10px] font-bold',
        exportMenuItemCountActive: 'bg-[#ECFDF3] text-[#027A48] dark:bg-emerald-900/20 dark:text-emerald-400',
        exportMenuItemDanger: 'w-full flex items-center justify-between px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-left font-medium',

        // More Options
        moreOptionsContainer: 'relative',
        moreOptionsButton: `
            inline-flex items-center justify-center
            w-9 h-9 p-0
            border border-[#EAECF0] dark:border-gray-800 
            rounded-lg 
            bg-white dark:bg-gray-800 
            text-[#344054] dark:text-gray-300 
            hover:bg-gray-50 dark:hover:bg-gray-700 
            transition-all shadow-sm 
            outline-none shrink-0 
            [&_svg]:shrink-0 [&_svg]:size-4
        `,
        moreOptionsItemContent: 'flex items-center gap-2',
        moreOptionsIconWrapper: 'w-4 h-4'
    }
});
