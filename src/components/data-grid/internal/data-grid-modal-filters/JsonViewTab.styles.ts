import { tv } from 'tailwind-variants';

export const jsonViewTabStyles = tv({
    slots: {
        container: 'flex flex-col h-full gap-4 p-4',

        editorContainer: 'flex-1 relative border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden bg-gray-50 dark:bg-gray-800',
        textarea: 'w-full h-full p-4 font-mono text-sm text-gray-800 dark:text-gray-300 bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20',

        actions: 'flex items-center justify-between gap-2 pt-2 border-t border-gray-100 dark:border-gray-700',
        statusWrapper: 'flex items-center gap-2',
        status: 'text-sm text-gray-500 dark:text-gray-400',
        error: 'text-sm text-red-500 dark:text-red-400 font-medium',
        alertIcon: 'inline mr-1',

        buttonGroup: 'flex items-center gap-2',
        button: 'flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors',

        copyButton: 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600',
        applyButton: 'text-white bg-blue-600 hover:bg-blue-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed',
        formatButton: 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
    }
});
