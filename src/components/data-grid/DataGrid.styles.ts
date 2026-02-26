import { tv } from 'tailwind-variants';

export const dataGridStyles = tv({
    slots: {
        // Main Container
        wrapper: 'tracking-[-0.01em] flex flex-col h-full bg-white dark:bg-gray-900 rounded-xl border border-[#EAECF0] dark:border-gray-800 shadow-sm transition-colors duration-200 relative overflow-hidden',

        // New Unified Scroll Container
        scrollContainer: 'flex-1 overflow-auto w-full relative custom-scrollbar',

        // Header Viewport (The sticky container for headers inside scrollContainer)
        headerViewport: 'w-max min-w-full bg-[#F9FAFB] dark:bg-gray-800 sticky top-0 z-20',

        // The actual header row container
        header: 'flex min-w-full pr-[15px]',

        // Standard Header Cell
        headerCell: 'flex items-center px-4 py-3 text-xs font-medium text-[#667085] dark:text-gray-400 uppercase tracking-wider bg-[#F9FAFB] dark:bg-gray-800 border-b border-[#EAECF0] dark:border-gray-700 h-full relative group',

        // Body Viewport (Now just a wrapper inside scrollContainer)
        bodyViewport: 'min-w-full w-max relative bg-white dark:bg-gray-900',

        // The content container inside body (holds rows)
        bodyContent: 'min-w-full w-max relative',

        // Empty/Loading Overlay
        overlay: 'absolute inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm',

        // IFrame/Focus Guard (Utility)
        iframeGuard: 'sr-only',

        // Default Input Styles
        defaultCheckbox: 'cursor-default accent-blue-600',

        // Inherited slots
        row: 'flex w-full group transition-colors duration-200 hover:bg-[#F9FAFB] dark:hover:bg-gray-800/50 border-b border-[#EAECF0] dark:border-gray-800 last:border-b-0',
        cell: '',

        // Legacy/Unused slots
        scrollbarSpacer: 'hidden',
        pagination: 'border-t border-[#EAECF0] dark:border-gray-800 p-4 bg-white dark:bg-gray-900 sticky bottom-0 z-30',

        // specific variants
        pinnedLeft: 'sticky left-0 z-10 bg-inherit after:absolute after:right-0 after:top-0 after:h-full',
        pinnedRight: 'sticky right-0 z-10 bg-inherit before:absolute before:left-0 before:top-0 before:h-full',
    },
    variants: {
        autoHeight: {
            true: {
                wrapper: 'h-auto',
                scrollContainer: 'overflow-x-auto overflow-y-visible',
            },
            false: {}
        },
        density: {
            compact: {},
            standard: {},
            comfortable: {}
        },
        align: {
            left: { cell: 'justify-start text-left' },
            center: { cell: 'justify-center text-center' },
            right: { cell: 'justify-end text-right' }
        },
        selected: {
            true: {
                row: 'bg-[#F6FEF9] dark:bg-emerald-900/10 hover:bg-[#F6FEF9] dark:hover:bg-emerald-900/10'
            }
        }
    },
    defaultVariants: {
        autoHeight: false,
        density: 'standard',
        selected: false
    }
});

export const MEASUREMENT_FONT = '14px Inter, sans-serif';
