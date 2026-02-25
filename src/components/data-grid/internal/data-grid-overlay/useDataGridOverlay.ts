import { overlayStyles } from './DataGridOverlay.styles';
import type { DataGridOverlayProps } from './DataGridOverlay.types';

export const useDataGridOverlay = (props: DataGridOverlayProps) => {
    const { loading, hasData } = props;
    const styles = overlayStyles();

    // Logic to determine if we should use absolute (overlay) or relative (wrapper) positioning
    const loadingClassName = (loading && hasData)
        ? styles.container()
        : styles.wrapper();

    return {
        styles,
        loadingClassName
    };
};
