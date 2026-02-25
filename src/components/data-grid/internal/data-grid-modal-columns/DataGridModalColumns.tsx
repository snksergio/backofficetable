import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Eye, EyeOff, Pin, RotateCcw } from 'lucide-react';
import { SimpleModal } from '../../../modal/SimpleModal';
import type { ColumnDef } from '../../DataGrid.types';
import type { DataGridModalColumnsProps } from './DataGridModalColumns.types';
import { modalColumnsStyles } from './DataGridModalColumns.styles';
import { useDataGridModalColumns } from './useDataGridModalColumns';

// Helper Component (View Logic for Single Item)
const SortableColumnItem = ({
    id,
    column,
    isVisible,
    pinned,
    onToggleVisibility,
    onTogglePin
}: {
    id: string,
    column: ColumnDef<any>,
    isVisible: boolean,
    pinned: 'left' | 'right' | null | undefined,
    onToggleVisibility: () => void,
    onTogglePin: () => void
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const styles = modalColumnsStyles();

    return (
        <div ref={setNodeRef} style={style} className={styles.sortableItem()}>
            <div {...attributes} {...listeners} className={styles.dragHandle()}>
                <GripVertical className={styles.dragIcon()} />
            </div>

            <div className={styles.itemLabel()}>
                {column.headerName || String(column.field)}
            </div>

            <div className={styles.actions()}>
                <button
                    onClick={onToggleVisibility}
                    className={isVisible ? styles.actionButtonVisible() : styles.actionButton()}
                    title={isVisible ? "Hide Column" : "Show Column"}
                >
                    {isVisible ? <Eye className={styles.icon()} /> : <EyeOff className={styles.icon()} />}
                </button>

                <button
                    onClick={onTogglePin}
                    className={pinned ? styles.actionButtonPinned() : styles.actionButtonPinnedHover()}
                    title={pinned ? `Pinned ${pinned}` : "Pin Column"}
                >
                    {pinned === 'right' ? <Pin className={styles.pinIcon()} /> : <Pin className={styles.icon()} />}
                </button>
            </div>
        </div>
    );
};

export const DataGridModalColumns = <T,>(props: DataGridModalColumnsProps<T>) => {
    const {
        localOrder,
        localHidden,
        localPinned,
        sensors,
        handleLocalDragEnd,
        handleApplyAll,
        handleReset,
        toggleVisibility,
        togglePin
    } = useDataGridModalColumns(props);

    const { isOpen, onClose, allColumns } = props;
    const styles = modalColumnsStyles();

    return (
        <SimpleModal isOpen={isOpen} onClose={onClose} title="Configure Columns">
            <div className={styles.modalContainer()}>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleLocalDragEnd}
                >
                    <SortableContext
                        items={localOrder}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className={styles.list()}>
                            {localOrder.map((field) => {
                                const col = allColumns.find(c => String(c.field) === field);
                                if (!col) return null;

                                return (
                                    <SortableColumnItem
                                        key={field}
                                        id={field}
                                        column={col}
                                        isVisible={!localHidden[field]}
                                        pinned={localPinned[field]}
                                        onToggleVisibility={() => toggleVisibility(field)}
                                        onTogglePin={() => togglePin(field)}
                                    />
                                );
                            })}
                        </div>
                    </SortableContext>
                </DndContext>

                <div className={styles.footer()}>
                    <button onClick={handleReset} className={styles.resetButton()}>
                        <RotateCcw className={styles.resetIcon()} />
                        Reset Defaults
                    </button>

                    <div className={styles.footerRight()}>
                        <button onClick={onClose} className={styles.cancelButton()}>
                            Cancel
                        </button>
                        <button onClick={handleApplyAll} className={styles.applyButton()}>
                            Apply Config
                        </button>
                    </div>
                </div>
            </div>
        </SimpleModal>
    );
};
