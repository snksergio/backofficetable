import { floatingCheckedStyles } from './DataGridFloatingChecked.styles';
import type { DataGridFloatingCheckedProps } from './DataGridFloatingChecked.types';

export const useDataGridFloatingChecked = (props: DataGridFloatingCheckedProps) => {
    const { count, totalCount, onSelectGlobal, isPageSelected } = props;

    // Logic for button visibility
    const isGlobalSelected = totalCount !== undefined && count === totalCount;
    const showPageButton = !isPageSelected && !isGlobalSelected;
    const showGlobalButton = !!(onSelectGlobal && totalCount && totalCount > count);

    const styles = floatingCheckedStyles();

    return {
        styles,
        showPageButton,
        showGlobalButton
    };
};
