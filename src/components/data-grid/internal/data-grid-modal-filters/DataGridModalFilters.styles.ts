import { tv } from 'tailwind-variants';

export const modalFiltersStyles = tv({
    slots: {
        container: 'p-4 w-[600px] max-w-full',
        list: 'space-y-3 min-h-[200px] max-h-[60vh] overflow-y-auto',
        emptyState: 'text-gray-500 text-center py-8',

        // Tabs
        tabsContainer: 'flex flex-col h-[500px] w-[600px] max-w-full',
        tabsHeader: 'flex border-b border-gray-200 bg-gray-50/50',
        tabButton: 'flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium border-b-2 transition-colors border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100',
        tabButtonActive: 'border-blue-500 text-blue-700 bg-white',
        tabContent: 'flex-1 overflow-hidden p-4 bg-white',

        // Filter Item
        filterBuilderContainer: 'flex flex-col h-full',
        itemConfig: 'flex gap-2 items-center bg-gray-50 p-2 rounded-md border border-gray-200',
        fieldSelect: 'border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-1/3',
        operatorSelect: 'border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-1/4',
        valueInput: 'border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none flex-1',
        removeButton: 'p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors',
        icon: 'w-4 h-4',

        // Footer Actions
        footer: 'mt-6 flex items-center justify-between border-t pt-4',
        footerLeft: 'flex gap-4',
        footerRight: 'flex gap-2',

        addButton: 'flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium',
        clearButton: 'flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium',

        applyButton: 'px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium',
        cancelButton: 'px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md',

        // --- Saved Views Tab Slots ---
        svContainer: 'flex flex-col h-full gap-4',
        svHeader: 'flex gap-2 items-center justify-between pb-2 border-b border-gray-100',
        svSearchWrapper: 'relative flex-1',
        svSearchIcon: 'absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400',
        svSearchInput: 'w-full pl-9 pr-3 py-1.5 text-sm border rounded hover:border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all',

        svActionGroup: 'flex gap-1',
        svActionButton: 'p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded',

        svList: 'flex-1 overflow-y-auto min-h-[250px] space-y-2 pr-1',
        svEmpty: 'text-center py-8 text-gray-400 text-sm italic',

        svItem: 'group border border-gray-200 rounded-lg p-3 hover:border-blue-300 hover:shadow-sm transition-all bg-white',
        svItemHeader: 'flex justify-between items-start mb-2',
        svItemTitle: 'font-medium text-gray-800 text-sm',
        svItemMeta: 'flex items-center gap-3 mt-1',
        svBadge: 'flex items-center gap-1 text-[10px] uppercase tracking-wide text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded',
        svUserMeta: 'flex items-center gap-1 text-xs text-gray-400',
        svDeleteBtn: 'text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity',

        svLoadButton: 'w-full mt-2 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors',

        svFooterForm: 'mt-auto border-t pt-4 bg-gray-50 -mx-4 -mb-4 p-4 rounded-b-lg',
        svFooterLabel: 'text-xs font-semibold text-gray-500 uppercase mb-2',
        svFooterRow: 'flex gap-2',
        svNameInput: 'flex-1 text-sm px-3 py-1.5 border rounded focus:border-blue-500 outline-none',
        svAreaSelect: 'w-1/3 text-sm px-2 py-1.5 border rounded focus:border-blue-500 outline-none',
        svSaveBtn: 'bg-green-600 hover:bg-green-700 text-white p-2 rounded disabled:opacity-50',
        svHiddenInput: 'hidden'
    }
});
