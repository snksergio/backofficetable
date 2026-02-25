import type { MouseEvent } from 'react';

export interface FastFilterChipProps {
    label: string;
    displayValue?: string; // Ex: "Ativo, Pendente" ou "3 selecionados"
    active?: boolean;
    isOpen?: boolean; // Controls the focus state (green border/ring)
    onClick: () => void;
    onClear?: (e: MouseEvent) => void;
}
