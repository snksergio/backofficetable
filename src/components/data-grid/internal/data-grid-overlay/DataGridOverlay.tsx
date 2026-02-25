import React from 'react';
import { LayoutFeedback } from '../../../layout-feedback';
import type { DataGridOverlayProps } from './DataGridOverlay.types';
import { useDataGridOverlay } from './useDataGridOverlay';

export const DataGridOverlay: React.FC<DataGridOverlayProps> = (props) => {
    const {
        loading,
        isDataEmpty,
        isNoResults,
        renderLoading,
        renderEmpty,
        renderNoResults
    } = props;

    const { styles, loadingClassName } = useDataGridOverlay(props);

    // Loading State
    if (loading) {
        return (
            <div className={loadingClassName}>
                {renderLoading ?? <LayoutFeedback variant="loading" />}
            </div>
        );
    }

    // Empty State (Full Replacement)
    if (isDataEmpty) {
        return (
            <div className={styles.wrapper()}>
                {renderEmpty ?? <LayoutFeedback variant="empty" />}
            </div>
        );
    }

    // No Results State (Full Replacement)
    if (isNoResults) {
        return (
            <div className={styles.wrapper()}>
                {renderNoResults ?? <LayoutFeedback variant="notFound" />}
            </div>
        );
    }

    return null;
};
