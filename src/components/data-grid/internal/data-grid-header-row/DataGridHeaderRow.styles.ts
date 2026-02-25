import { tv } from 'tailwind-variants';

export const headerRowStyles = tv({
    slots: {
        row: 'flex min-w-full items-center dark:border-gray-800 bg-[#F9FAFB] dark:bg-gray-800/50',

        // Checkbox header cell
        checkboxCell: 'sticky left-0 z-30 bg-[#F9FAFB] dark:bg-gray-800 border-b border-[#EAECF0] dark:border-gray-700 p-4 w-12 text-center transition-colors duration-200',

        // Standard header cell
        cell: `
            relative
            px-4
            border-b border-[#EAECF0] dark:border-gray-700 
            text-left select-none 
            group transition-colors duration-200
            flex items-center justify-between
            bg-[#F9FAFB] dark:bg-gray-800
        `,

        cellContent: 'flex items-center gap-1 text-xs font-medium text-[#667085] dark:text-gray-400 whitespace-nowrap cursor-pointer hover:text-[#101828] dark:hover:text-white transition-colors w-full',

        headerContentContainer: 'flex items-center justify-between w-full',

        text: 'truncate',

        // Resize Handle (The hit area)
        resizer: 'absolute right-[-4px] top-0 h-full w-2 cursor-col-resize z-40 group/resizer touch-none select-none',

        // Visual Line inside Resize Handle
        resizerLine: `
            absolute right-[4px] top-1/2 -translate-y-1/2 w-[1.5px] 
            h-[30%] bg-[#EAECF0] dark:bg-gray-700 
            transition-all duration-150
            group-hover/resizer:h-full group-hover/resizer:bg-[#00A859]
            group-active/resizer:h-full group-active/resizer:bg-[#00A859]
        `,

        // Column Menu Button Container
        menuButtonContainer: 'relative',

        // Column Menu Button (The ... icon)
        menuButton: `
            p-1 rounded-md 
            text-[#667085] dark:text-gray-500 
            opacity-0 group-hover:opacity-100 
            hover:bg-[#F2F4F7] dark:hover:bg-gray-700 
            transition-all ml-2
        `,
        menuButtonActive: 'opacity-100 bg-[#F2F4F7] dark:bg-gray-700',

        // Icons
        sortIcon: 'text-[#667085] dark:text-gray-400 group-hover:text-[#101828] dark:group-hover:text-white transition-colors ml-1',
        sortIconGhost: 'opacity-0 group-hover:opacity-100 transition-opacity text-[#98A2B3] dark:text-gray-500 ml-1', // Only visible on hover when not sorted

        // Inputs
        checkboxInput: 'cursor-pointer',

        pinnedShadow: 'after:w-[1px] after:bg-[#EAECF0] dark:after:bg-gray-700 after:content-[""] after:shadow-[4px_0_8px_rgba(0,0,0,0.05)]',

        pinnedShadowLeft: 'before:w-[1px] before:bg-[#EAECF0] dark:before:bg-gray-700 before:content-[""] before:shadow-[-4px_0_8px_rgba(0,0,0,0.05)]',

        pinnedBackground: '!bg-[#F9FAFB] dark:!bg-gray-800 !z-[50]'
    },
    variants: {
        density: {
            compact: {
                cell: 'py-2 text-xs',
                checkboxCell: 'py-2'
            },
            standard: {
                cell: 'py-3 text-xs',
                checkboxCell: 'py-3'
            },
            comfortable: {
                cell: 'py-4 text-sm',
                checkboxCell: 'py-4'
            }
        }
    },
    defaultVariants: {
        density: 'standard'
    }
});
