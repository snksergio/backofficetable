import { useState } from 'react';
import { ListFilter, Bookmark, Code } from 'lucide-react';
import { SimpleModal } from '../../../modal/SimpleModal';
import type { DataGridModalFiltersProps } from './DataGridModalFilters.types';
import { modalFiltersStyles } from './DataGridModalFilters.styles';
import { FilterBuilderTab } from './FilterBuilderTab';
import { SavedViewsTab } from './SavedViewsTab';
import { JsonViewTab } from './JsonViewTab';

export const DataGridModalFilters = <T,>(props: DataGridModalFiltersProps<T>) => {
    const { isOpen, onClose, columns, gridId } = props; // columns is technically unused by the tabs frame but might be needed later or passed down? actually FilterBuilderTab uses props which includes columns.
    const styles = modalFiltersStyles();
    const [activeTab, setActiveTab] = useState<'builder' | 'saved' | 'json'>('builder');

    return (
        <SimpleModal isOpen={isOpen} onClose={onClose} title="Filters & Views">
            <div className={styles.tabsContainer()}>
                {/* Tabs Header */}
                <div className={styles.tabsHeader()}>
                    <button
                        onClick={() => setActiveTab('builder')}
                        className={`${styles.tabButton()} ${activeTab === 'builder' ? styles.tabButtonActive() : ''}`}
                    >
                        <ListFilter size={16} />
                        Filtros Ativos
                    </button>
                    <button
                        onClick={() => setActiveTab('saved')}
                        className={`${styles.tabButton()} ${activeTab === 'saved' ? styles.tabButtonActive() : ''}`}
                    >
                        <Bookmark size={16} />
                        Filtros Salvos
                    </button>
                    <button
                        onClick={() => setActiveTab('json')}
                        className={`${styles.tabButton()} ${activeTab === 'json' ? styles.tabButtonActive() : ''}`}
                    >
                        <Code size={16} />
                        JSON / Code
                    </button>
                </div>

                {/* Tab Content */}
                <div className={styles.tabContent()}>
                    {activeTab === 'builder' && <FilterBuilderTab {...props} />}
                    {activeTab === 'saved' && <SavedViewsTab gridId={gridId} />}
                    {activeTab === 'json' && <JsonViewTab />}
                </div>
            </div>
        </SimpleModal>
    );
};
