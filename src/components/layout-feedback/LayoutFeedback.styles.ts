import { tv } from 'tailwind-variants';

export const feedbackStyles = tv({
    slots: {
        container: 'flex flex-col items-center justify-center w-full h-full min-h-[300px] p-8 text-center bg-gray-50/50 rounded-lg border border-dashed border-gray-200 animate-in fade-in duration-500',
        content: 'max-w-md flex flex-col items-center gap-2',
        iconWrapper: 'flex items-center justify-center w-16 h-16 mb-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-400',
        title: 'text-lg font-semibold text-gray-900',
        description: 'text-sm text-gray-500 leading-relaxed',
        actions: 'mt-6',
        button: 'inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm focus:ring-4 focus:ring-blue-100 outline-none',
        loader: 'animate-spin text-blue-600'
    },
    variants: {
        variant: {
            loading: {
                iconWrapper: 'bg-transparent border-none shadow-none', // Minimal wrapper for loader
                title: 'text-gray-700'
            },
            empty: {
                iconWrapper: 'bg-gray-100 border-gray-200'
            },
            notFound: {
                iconWrapper: 'bg-red-50 border-red-100 text-red-400'
            },
            default: {}
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
