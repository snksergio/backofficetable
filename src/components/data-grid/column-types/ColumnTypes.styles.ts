
// Utility for consistent styling across column types
export const columnTypeStyles = () => {
    return {
        // Standard Input Style (Shared)
        input: () => 'w-full px-3 py-2 border rounded-md text-sm outline-none transition-colors border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500',

        // Standard Select Style (Shared)
        select: () => 'w-full px-3 py-2 border rounded-md text-sm outline-none transition-colors border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',

        // List Container (for Multi-Select)
        listContainer: () => 'max-h-60 overflow-y-auto p-1 flex-col gap-1',
        emptyState: () => 'text-gray-400 dark:text-gray-500 text-sm p-2 text-center',

        // Generic Cell
        cellContentWrapper: () => 'p-2',

        // Option Item
        optionLabel: () => 'flex items-center gap-2 p-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer transition-colors',
        checkbox: () => 'rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500',
        optionText: (selected?: boolean) => `text-sm ${selected ? 'font-medium text-indigo-700 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'}`
    };
};
