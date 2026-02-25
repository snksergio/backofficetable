export const DataGridTheme = {
    colors: {
        brand: {
            primary: '#00A859', // The "Green"
            hover: '#008F4C',
            light: 'rgba(0, 168, 89, 0.1)',
            bgLight: '#F6FEF9', // For selected rows
        },
        text: {
            primary: '#101828',
            secondary: '#344054',
            tertiary: '#667085',
            quaternary: '#98A2B3',
            white: '#FFFFFF',
        },
        border: {
            default: '#EAECF0',
            input: '#D0D5DD',
        },
        bg: {
            main: '#FDFCFD',
            table: '#FFFFFF',
            header: '#F9FAFB',
            hover: '#F9FAFB',
            filterBlock: '#FCFCFD',
        }
    },
    shadows: {
        sm: 'shadow-sm',
        md: 'shadow-md',
    },
    layout: {
        radius: 'rounded-xl',
        padding: {
            page: 'p-[60px]',
        },
    },
    // Reusable Tailwind classes composites
    classes: {
        input: "w-full pl-10 pr-4 py-2 border border-[#D0D5DD] dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 focus:ring-4 focus:ring-[#00A859]/10 focus:border-[#00A859] outline-none transition-all placeholder-[#667085]",
        btn: {
            secondary: "inline-flex items-center justify-center gap-2 px-4 h-9 border border-[#EAECF0] dark:border-gray-800 rounded-lg bg-white dark:bg-gray-800 text-sm font-semibold text-[#344054] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm outline-none whitespace-nowrap shrink-0",
            primary: "flex items-center gap-2 px-4 py-2 bg-[#00A859] hover:bg-[#008F4C] text-white rounded-lg text-sm font-semibold transition-all shadow-sm ring-offset-2 focus:ring-2 focus:ring-[#00A859]",
        },
        chip: {
            base: "group flex items-center h-[34px] border border-dashed border-[#D0D5DD] rounded-xl bg-white px-2 gap-2 hover:border-[#00A859]/40 transition-all cursor-pointer shadow-sm text-sm font-medium text-[#101828]",
            active: "border-[#00A859] ring-2 ring-[#00A859]/10",
        }
    }
} as const;
