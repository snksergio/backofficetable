export interface DataGridFloatingCheckedProps {
    count: number;
    totalCount?: number;
    onSelectAll: () => void;
    onSelectGlobal?: () => void;
    onClear: () => void;
    actions?: React.ReactNode;
    isPageSelected?: boolean;
}
