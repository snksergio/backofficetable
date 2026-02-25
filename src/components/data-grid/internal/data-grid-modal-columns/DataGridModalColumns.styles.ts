import { tv } from 'tailwind-variants';

export const modalColumnsStyles = tv({
    slots: {
        sortableItem: 'flex items-center gap-3 bg-white p-3 rounded border border-gray-200 shadow-sm mb-2 select-none',
        dragHandle: 'cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600',
        itemLabel: 'flex-1 font-medium text-gray-700',
        actions: 'flex items-center gap-1',
        actionButton: 'p-1.5 rounded-md transition-colors text-gray-300 hover:bg-gray-50',
        actionButtonVisible: 'text-gray-500 hover:bg-gray-100',
        actionButtonPinned: 'text-blue-600 bg-blue-50',
        actionButtonPinnedHover: 'text-gray-400 group-hover:text-blue-400 hover:text-blue-600 hover:bg-blue-50',
        // Icons
        dragIcon: 'w-5 h-5',
        icon: 'w-4 h-4',
        pinIcon: 'w-4 h-4 transform rotate-90',

        // Modal Layout
        modalContainer: 'p-4 w-[500px] max-w-full',
        list: 'max-h-[60vh] overflow-y-auto pr-2',

        // Footer
        footer: 'mt-6 flex items-center justify-between border-t pt-4',
        resetButton: 'flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm font-medium',
        resetIcon: 'w-4 h-4',
        footerRight: 'flex gap-2',
        cancelButton: 'px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md',
        applyButton: 'px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm'
    }
});
