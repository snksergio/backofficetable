import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { toolbarStyles } from './DataGridToolbar.styles';
import type { DataGridToolbarConfig } from './DataGridToolbar.types';

interface DataGridMoreOptionsProps {
    actions: NonNullable<DataGridToolbarConfig['moreActions']>;
}

export const DataGridMoreOptions: React.FC<DataGridMoreOptionsProps> = ({ actions }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const styles = toolbarStyles();

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    if (actions.length === 0) return null;

    return (
        <div className={styles.moreOptionsContainer()} ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={styles.moreOptionsButton()}
                title="More Options"
            >
                <MoreHorizontal className={styles.filterIcon()} />
            </button>

            {isOpen && (
                <div className={styles.exportDropdown()}>
                    {/* Reusing exportDropdown styles for consistent look since it's just a dropdown container */}

                    <div className={styles.exportMenuContent()}>
                        {actions.map((action, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    action.onClick();
                                    setIsOpen(false);
                                }}
                                className={action.variant === 'danger' ? styles.exportMenuItemDanger() : styles.exportMenuItem()}
                            >
                                <span className={styles.moreOptionsItemContent()}>
                                    {action.icon && <span className={styles.moreOptionsIconWrapper()}>{action.icon}</span>}
                                    {action.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
