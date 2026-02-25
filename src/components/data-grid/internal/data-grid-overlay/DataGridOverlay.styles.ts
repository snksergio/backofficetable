import { tv } from 'tailwind-variants';

export const overlayStyles = tv({
    slots: {
        container: 'absolute inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm', // Default overlay style
        wrapper: 'h-full flex items-center justify-center w-full',
        text: 'text-gray-500'
    }
});
