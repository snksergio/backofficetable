import type { FilterOperator } from './DataGrid.types';

export const FILTER_OPERATORS: { value: FilterOperator; label: string }[] = [
    { value: 'contains', label: 'Contains' },
    { value: 'equals', label: 'Equals' },
    { value: 'startsWith', label: 'Starts With' },
    { value: 'endsWith', label: 'Ends With' },
    { value: 'isEmpty', label: 'Is Empty' },
    { value: 'isNotEmpty', label: 'Is Not Empty' },
    { value: 'isAnyOf', label: 'Is Any Of' }
];

export const OPERATORS_BY_TYPE: Record<string, FilterOperator[]> = {
    text: ['contains', 'equals', 'startsWith', 'endsWith', 'isEmpty', 'isNotEmpty'],
    number: ['equals', 'isEmpty', 'isNotEmpty'],
    date: ['equals', 'isEmpty', 'isNotEmpty'],
    datetime: ['equals', 'isEmpty', 'isNotEmpty'],
    boolean: ['equals', 'isEmpty', 'isNotEmpty'],
    select: ['isAnyOf', 'equals', 'isEmpty', 'isNotEmpty'],
    multiSelect: ['isAnyOf', 'isEmpty', 'isNotEmpty']
};

export const getOperatorsForColumn = (column?: { type?: string; filterType?: string }) => {
    const type = column?.filterType || column?.type || 'text';
    const operators = OPERATORS_BY_TYPE[type] || OPERATORS_BY_TYPE['text'];
    return FILTER_OPERATORS.filter(op => operators.includes(op.value));
};
