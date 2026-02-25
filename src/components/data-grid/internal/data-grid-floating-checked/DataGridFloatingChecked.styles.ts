import { tv } from 'tailwind-variants';

export const floatingCheckedStyles = tv({
    slots: {
        wrapper: 'fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200',
        container: 'bg-[#101828] dark:bg-gray-800 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-8 border border-white/10 dark:border-gray-700 backdrop-blur-sm ring-1 ring-black/20 transition-colors duration-200',

        // Section 1: Count
        countWrapper: 'flex items-center gap-3 border-r border-white/10 dark:border-gray-700 pr-6',
        count: 'text-sm font-semibold whitespace-nowrap',

        // Section 2: Actions
        actions: 'flex items-center gap-6',

        // Buttons (Text style)
        button: 'text-sm font-semibold hover:text-[#00A859] transition-colors',
        removeButton: 'text-sm font-semibold text-rose-400 hover:text-rose-300 transition-colors',

        // Close Button (Icon)
        closeButton: 'p-1.5 hover:bg-white/10 rounded-lg transition-colors ml-2 text-[#667085] hover:text-white',

        // Legacy extra actions container (merging into main actions flow)
        extraActions: 'flex items-center gap-6'
    }
});
