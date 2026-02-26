
import { tv } from 'tailwind-variants';

export const fastFiltersAddMenuStyles = tv({
    slots: {
        container: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl min-w-[200px] overflow-hidden animate-in fade-in zoom-in-95 duration-100',
        searchInput: 'w-full px-3 py-2 text-sm border-b border-gray-100 dark:border-gray-700 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 bg-transparent dark:text-white',
        listContainer: 'max-h-[200px] overflow-y-auto py-1',
        item: 'flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors',
        emptyCheck: 'w-4 h-4 rounded border border-gray-300 dark:border-gray-600',
        emptyText: 'px-3 py-2 text-sm text-gray-400 dark:text-gray-500 text-center italic'
    }
});
