import { useState, useEffect } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import { useSensor, useSensors, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import type { DataGridModalColumnsProps } from './DataGridModalColumns.types';

export const useDataGridModalColumns = <T,>(props: DataGridModalColumnsProps<T>) => {
    const {
        isOpen,
        onClose,
        allColumns,
        columnOrder,
        hiddenColumns,
        pinnedColumns,
        onReorder,
        onApply
    } = props;

    // Local state for editing
    const [localHidden, setLocalHidden] = useState(hiddenColumns);
    const [localPinned, setLocalPinned] = useState(pinnedColumns);
    const [localOrder, setLocalOrder] = useState(columnOrder);

    // Sync when opening
    useEffect(() => {
        if (isOpen) {
            setLocalHidden(hiddenColumns);
            setLocalPinned(pinnedColumns);
            setLocalOrder(columnOrder);
        }
    }, [isOpen, hiddenColumns, pinnedColumns, columnOrder]);

    // DND Sensors
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Handlers
    const handleLocalDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = localOrder.indexOf(String(active.id));
            const newIndex = localOrder.indexOf(String(over?.id));
            setLocalOrder(arrayMove(localOrder, oldIndex, newIndex));
        }
    };

    const handleApplyAll = () => {
        onReorder(localOrder); // Apply Order
        onApply(localHidden, localPinned); // Apply Hidden/Pinned
        onClose();
    };

    const handleReset = () => {
        setLocalHidden({});
        setLocalPinned({});
        setLocalOrder(allColumns.map(c => String(c.field)));
    };

    const toggleVisibility = (field: string) => {
        setLocalHidden(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const togglePin = (field: string) => {
        setLocalPinned(prev => {
            const current = prev[field];
            let next: 'left' | 'right' | null | undefined;
            if (!current) next = 'left';
            else if (current === 'left') next = 'right';
            else next = null; // Reset
            return { ...prev, [field]: next };
        });
    };

    return {
        localOrder,
        localHidden,
        localPinned,
        sensors,
        handleLocalDragEnd,
        handleApplyAll,
        handleReset,
        toggleVisibility,
        togglePin
    };
};
