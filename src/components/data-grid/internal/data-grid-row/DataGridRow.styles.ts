import { tv } from 'tailwind-variants';

export const rowStyles = tv({
    base: 'flex w-full group transition-colors duration-200 hover:bg-[#F9FAFB] dark:hover:bg-gray-800 dark:border-gray-800',
    variants: {
        selected: {
            true: 'bg-[#F6FEF9] dark:bg-emerald-900/10 hover:bg-[#F6FEF9] dark:hover:bg-emerald-900/10',
            false: 'bg-white dark:bg-gray-900'
        },
        density: {
            compact: 'min-h-[32px]',
            standard: 'min-h-[48px]',
            comfortable: 'min-h-[64px]'
        }
    },
    defaultVariants: {
        selected: false,
        density: 'standard'
    }
});
