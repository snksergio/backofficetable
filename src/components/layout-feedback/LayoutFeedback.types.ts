import React from 'react';

export type FeedbackVariant = 'empty' | 'notFound' | 'loading' | 'default';

export interface LayoutFeedbackProps {
    /**
     * Pre-defined variants for common states.
     * @default 'default'
     */
    variant?: FeedbackVariant;

    /**
     * Primary title of the feedback state.
     * Overrides variant default.
     */
    title?: string;

    /**
     * Secondary description text.
     * Overrides variant default.
     */
    description?: string;

    /**
     * Icon element to display.
     * Overrides variant default.
     */
    icon?: React.ReactNode;

    /**
     * Action function to be called when the button is clicked.
     * If provided, a button will be rendered.
     */
    onAction?: () => void;

    /**
     * Label for the action button.
     * @default 'Action'
     */
    actionLabel?: string;

    /**
     * Custom icon for the action button.
     */
    actionIcon?: React.ReactNode;

    /**
     * Additional CSS classes.
     */
    className?: string;
}
