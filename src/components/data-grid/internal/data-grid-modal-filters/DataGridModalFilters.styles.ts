import { tv } from 'tailwind-variants';

export const modalFiltersStyles = tv({
    slots: {
        container: 'p-4 w-[600px] max-w-full',
        list: 'space-y-3 min-h-[200px] max-h-[60vh] overflow-y-auto',
        emptyState: 'text-gray-500 dark:text-gray-400 text-center py-8',

        // Tabs
        tabsContainer: 'flex flex-col h-[500px] w-[600px] max-w-full',
        tabsHeader: 'flex border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50',
        tabButton: 'flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium border-b-2 transition-colors border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
        tabButtonActive: 'border-blue-500 dark:border-blue-400 text-blue-700 dark:text-blue-400 bg-white dark:bg-gray-900',
        tabContent: 'flex-1 overflow-hidden p-4 bg-white dark:bg-gray-900',

        // Filter Item
        filterBuilderContainer: 'flex flex-col h-full',
        itemConfig: 'flex gap-2 items-center bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md border border-gray-200 dark:border-gray-700',
        fieldSelect: 'border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-1/3 bg-white dark:bg-gray-800 dark:text-white',
        operatorSelect: 'border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-1/4 bg-white dark:bg-gray-800 dark:text-white',
        valueInput: 'border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none flex-1 bg-white dark:bg-gray-800 dark:text-white',
        removeButton: 'p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors',
        icon: 'w-4 h-4',

        // Footer Actions
        footer: 'mt-6 flex items-center justify-between border-t dark:border-gray-700 pt-4',
        footerLeft: 'flex gap-4',
        footerRight: 'flex gap-2',

        addButton: 'flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium',
        clearButton: 'flex items-center gap-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium',

        applyButton: 'px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium',
        cancelButton: 'px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md',

        // --- Saved Views Tab Slots ---
        svContainer: 'flex flex-col h-full gap-4',
        svHeader: 'flex gap-2 items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-700',
        svSearchWrapper: 'relative flex-1',
        svSearchIcon: 'absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500',
        svSearchInput: 'w-full pl-9 pr-3 py-1.5 text-sm border dark:border-gray-600 rounded hover:border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 outline-none transition-all bg-white dark:bg-gray-800 dark:text-white',

        svActionGroup: 'flex gap-1',
        svActionButton: 'p-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded',

        svList: 'flex-1 overflow-y-auto min-h-[250px] space-y-2 pr-1',
        svEmpty: 'text-center py-8 text-gray-400 dark:text-gray-500 text-sm italic',

        svItem: 'group border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-sm transition-all bg-white dark:bg-gray-800',
        svItemHeader: 'flex justify-between items-start mb-2',
        svItemTitle: 'font-medium text-gray-800 dark:text-gray-200 text-sm',
        svItemMeta: 'flex items-center gap-3 mt-1',
        svBadge: 'flex items-center gap-1 text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded',
        svUserMeta: 'flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500',
        svDeleteBtn: 'text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity',

        svLoadButton: 'w-full mt-2 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-colors',

        svFooterForm: 'mt-auto border-t dark:border-gray-700 pt-4 bg-gray-50 dark:bg-gray-800/50 -mx-4 -mb-4 p-4 rounded-b-lg',
        svFooterLabel: 'text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2',
        svFooterRow: 'flex gap-2',
        svNameInput: 'flex-1 text-sm px-3 py-1.5 border dark:border-gray-600 rounded focus:border-blue-500 outline-none bg-white dark:bg-gray-800 dark:text-white',
        svAreaSelect: 'w-1/3 text-sm px-2 py-1.5 border dark:border-gray-600 rounded focus:border-blue-500 outline-none bg-white dark:bg-gray-800 dark:text-white',
        svSaveBtn: 'bg-green-600 hover:bg-green-700 text-white p-2 rounded disabled:opacity-50',
        svHiddenInput: 'hidden'
    }
});
