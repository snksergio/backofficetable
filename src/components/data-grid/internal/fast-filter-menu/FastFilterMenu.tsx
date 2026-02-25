import React from 'react';

import type { FastFilterMenuProps } from './FastFilterMenu.types';
import { columnTypeRegistry } from '../../column-types/ColumnTypeRegistry';

export const FastFilterMenu: React.FC<FastFilterMenuProps> = (props) => {
    const { column, value, onChange, onClose, options = [] } = props;

    // Custom Renderer Check (Priority High)
    if (column.renderColumnFilter) {
        return (
            <>
                {column.renderColumnFilter({
                    value,
                    onChange,
                    onClose
                })}
            </>
        );
    }

    // --- NEW: Registry Pattern ---
    // Determine the type strictly: prop >> column.type >> text
    const targetType = column.filterType || column.type || 'text';

    // Get strategy from registry
    const strategy = columnTypeRegistry.get(targetType);

    return (
        <>
            {strategy.renderFastFilterInput({
                column,
                value,
                onChange,
                onClose,
                options // Pass explicit or calculated options
            })}
        </>
    );
};
