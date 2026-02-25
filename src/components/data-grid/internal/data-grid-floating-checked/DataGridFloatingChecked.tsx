import React from 'react';
import { X } from 'lucide-react';
import { useDataGridFloatingChecked } from './useDataGridFloatingChecked';
import type { DataGridFloatingCheckedProps } from './DataGridFloatingChecked.types';

export const DataGridFloatingChecked: React.FC<DataGridFloatingCheckedProps> = (props) => {
    const {
        count,
        totalCount,
        onSelectAll,
        onSelectGlobal,
        onClear,
        actions
    } = props;

    const { styles, showPageButton, showGlobalButton } = useDataGridFloatingChecked(props);

    if (count === 0) return null;

    return (
        <div className={styles.wrapper()}>
            <div className={styles.container()}>
                {/* 1. Count with Divider */}
                <div className={styles.countWrapper()}>
                    <span className={styles.count()}>
                        {count} {count === 1 ? 'item selecionado' : 'itens selecionados'}
                    </span>
                </div>

                {/* 2. Actions Group */}
                <div className={styles.actions()}>
                    {/* Standard Actions */}
                    {showPageButton && (
                        <button className={styles.button()} onClick={onSelectAll}>
                            Selecionar Todos da pagina atual
                        </button>
                    )}

                    {showGlobalButton && (
                        <button className={styles.button()} onClick={onSelectGlobal}>
                            Selecionar Todos ({totalCount})
                        </button>
                    )}

                    {/* Extra Actions (Injected) */}
                    {actions}

                    {/* Clear/Remove Action (styled as red Remove) */}
                    <button className={styles.removeButton()} onClick={onClear}>
                        Limpar
                    </button>
                </div>

                {/* 3. Close Button (X) */}
                <button className={styles.closeButton()} onClick={onClear} aria-label="Close selection">
                    <X size={18} />
                </button>
            </div>
        </div>
    );
};
