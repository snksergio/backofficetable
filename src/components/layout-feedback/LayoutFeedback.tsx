import React from 'react';
import { FileStack, SearchX, Loader2 } from 'lucide-react'; // Example icons
import type { LayoutFeedbackProps, FeedbackVariant } from './LayoutFeedback.types';
import { feedbackStyles } from './LayoutFeedback.styles';

export const LayoutFeedback: React.FC<LayoutFeedbackProps> = ({
    variant = 'default',
    title,
    description,
    icon,
    onAction,
    actionLabel = 'Ação',
    actionIcon,
    className
}) => {
    const styles = feedbackStyles({ variant });

    // Default configuration based on variant
    const getVariantDefaults = (v: FeedbackVariant) => {
        switch (v) {
            case 'empty':
                return {
                    icon: <FileStack className="w-8 h-8 opacity-80" />,
                    title: 'Não possui nenhum dado cadastrado',
                    description: 'Comece adicionando novos itens para visualizar aqui.'
                };
            case 'notFound':
                return {
                    icon: <SearchX className="w-8 h-8 opacity-80" />,
                    title: 'Nenhum dado encontrado',
                    description: 'Não encontramos nada com os critérios pesquisados. Tente ajustar os filtros.'
                };
            case 'loading':
                return {
                    icon: <Loader2 className="w-10 h-10 animate-spin" />, // Styles handle animation too, but inline safe
                    title: 'Carregando dados...',
                    description: 'Aguarde enquanto processamos as informações.'
                };
            default:
                return {
                    icon: null,
                    title: '',
                    description: ''
                };
        }
    };

    const defaults = getVariantDefaults(variant);

    // Merge defaults with user overrides
    const displayTitle = title ?? defaults.title;
    const displayDescription = description ?? defaults.description;
    const displayIcon = icon ?? defaults.icon;

    return (
        <div className={styles.container({ className })}>
            <div className={styles.content()}>
                <div className={styles.iconWrapper()}>
                    {displayIcon}
                </div>

                {displayTitle && (
                    <h3 className={styles.title()}>
                        {displayTitle}
                    </h3>
                )}

                {displayDescription && (
                    <p className={styles.description()}>
                        {displayDescription}
                    </p>
                )}

                {onAction && (
                    <div className={styles.actions()}>
                        <button
                            onClick={onAction}
                            className={styles.button()}
                        >
                            {actionIcon}
                            {actionLabel}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
