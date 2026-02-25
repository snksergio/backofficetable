import React from 'react';
import type { ColumnDef, FilterOperator } from '../DataGrid.types';

// Context passed to the render function in the Modal (Query Builder)
export interface FilterInputProps<T = any> {
    itemValue: any;
    itemOperator: FilterOperator;
    column: ColumnDef<T>;
    onChange: (value: any) => void;
}

// Context passed to the render function in the Fast Filter (Popover)
export interface FastFilterInputProps<T = any> {
    column: ColumnDef<T>;
    value: any;
    onChange: (value: any) => void;
    onClose?: () => void;
    options?: Array<{ label: string; value: any; color?: string }>; // Optional list of choices
}

// The Strategy Interface
export interface ColumnTypeDefinition<T = any> {
    type: string; // e.g. 'text', 'number', 'select'

    // Renders the input inside the Query Builder (Modal)
    renderFilterInput: (props: FilterInputProps<T>) => React.ReactNode;

    // Renders the input inside the Fast Filter (Popover)
    renderFastFilterInput: (props: FastFilterInputProps<T>) => React.ReactNode;
}
