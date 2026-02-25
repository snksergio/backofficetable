import React from 'react';

export interface DataGridOverlayProps {
    loading?: boolean;
    isDataEmpty?: boolean;
    isNoResults?: boolean;
    renderLoading?: React.ReactNode;
    renderEmpty?: React.ReactNode;
    renderNoResults?: React.ReactNode;
    hasData?: boolean;
}
