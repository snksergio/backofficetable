import React from 'react';
import { fastFilterChipStyles } from './FastFilterChip.styles';
import type { FastFilterChipProps } from './FastFilterChip.types';

export const FastFilterChip: React.FC<FastFilterChipProps> = ({
    label,
    displayValue,
    active = false,
    isOpen = false, // Default to false
    onClick,
    onClear
}) => {
    const styles = fastFilterChipStyles({ active, isOpen });

    return (
        <div className={styles.container()} onClick={onClick}>

            {/* Active State: Show Close Icon on Left */}
            {active && onClear && (
                <button
                    className={styles.clearBtn()}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClear(e);
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.closeIcon()} aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>
                </button>
            )}

            {/* Label */}
            <span className={styles.label()}>{label}</span>

            {/* Active State: Separator + Value */}
            {active && displayValue && (
                <>
                    <div className={styles.separator()}></div>
                    <div className={styles.valueWrapper()}>
                        {React.isValidElement(displayValue) || Array.isArray(displayValue) ? (
                            displayValue
                        ) : (
                            <span className={styles.valueBadge()}>{displayValue}</span>
                        )}
                    </div>
                </>
            )}

            {/* Inactive State: Chevron Down on Right */}
            {!active && (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.arrowIcon()} aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>
            )}
        </div>
    );
};
