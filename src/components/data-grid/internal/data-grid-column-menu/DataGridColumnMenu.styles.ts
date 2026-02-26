import { tv } from 'tailwind-variants';

export const columnMenuStyles = tv({
    slots: {
        container: 'flex flex-col py-2 min-w-[200px]',
        item: 'px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-300 w-full transition-colors',
        activeItem: 'text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/20',
        divider: 'h-px bg-gray-200 dark:bg-gray-700 my-1',
    }
});
