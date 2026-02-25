
import { tv } from 'tailwind-variants';

export const fastFiltersAddMenuStyles = tv({
    slots: {
        container: 'bg-white border border-gray-200 rounded-lg shadow-xl min-w-[200px] overflow-hidden animate-in fade-in zoom-in-95 duration-100',
        searchInput: 'w-full px-3 py-2 text-sm border-b border-gray-100 focus:outline-none focus:bg-gray-50',
        listContainer: 'max-h-[200px] overflow-y-auto py-1',
        item: 'flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors',
        emptyCheck: 'w-4 h-4 rounded border border-gray-300',
        emptyText: 'px-3 py-2 text-sm text-gray-400 text-center italic'
    }
});
