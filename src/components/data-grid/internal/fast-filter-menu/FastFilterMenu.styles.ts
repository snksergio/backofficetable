import { tv } from 'tailwind-variants';

export const fastFilterMenuStyles = tv({
    slots: {
        container: 'p-2',
        input: 'w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white',
        listContainer: 'max-h-[300px] overflow-y-auto p-1 flex flex-col gap-0.5',
        emptyState: 'p-2 text-sm text-gray-500 dark:text-gray-400',
        optionLabel: 'flex items-center gap-2 px-2 py-1.5 text-sm rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700',
        checkbox: 'rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500',
        optionText: 'text-gray-700 dark:text-gray-300',
        optionTextSelected: 'font-medium text-gray-900 dark:text-white',
        unsupported: 'p-2 text-sm text-gray-500 dark:text-gray-400'
    }
});
