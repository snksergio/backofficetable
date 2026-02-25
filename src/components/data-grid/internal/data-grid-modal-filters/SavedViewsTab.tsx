import React, { useState, useRef } from 'react';
import { Search, Trash2, Check, Download, Upload, User, MapPin } from 'lucide-react';
import { modalFiltersStyles } from './DataGridModalFilters.styles';
import { useDataGridContext } from '../../context/DataGridContext';
import { useDataGridStatePersistence } from '../../hooks/useDataGridStatePersistence';

interface SavedViewsTabProps {
    gridId?: string;
}

export const SavedViewsTab: React.FC<SavedViewsTabProps> = ({ gridId }) => {
    const { state, restoreState } = useDataGridContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [newViewName, setNewViewName] = useState('');
    const [newViewArea, setNewViewArea] = useState('Geral');

    const {
        savedViews,
        isLoadingViews,
        saveCurrentView,
        deleteView,
        applyView,
        exportState,
        importState,
        loadViews
    } = useDataGridStatePersistence({
        currentState: state,
        onStateChange: restoreState,
        gridId
    });

    React.useEffect(() => {
        loadViews();
    }, [loadViews]);

    const styles = modalFiltersStyles();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const filteredViews = savedViews.filter(v =>
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.createdBy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.area?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newViewName.trim()) return;

        await saveCurrentView(newViewName, { area: newViewArea, createdBy: 'Eu' }); // Mocked user
        setNewViewName('');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) importState(file);
    };

    return (
        <div className={styles.svContainer()}>

            {/* Top Bar: Search & Actions */}
            <div className={styles.svHeader()}>
                <div className={styles.svSearchWrapper()}>
                    <Search className={styles.svSearchIcon()} />
                    <input
                        type="text"
                        placeholder="Search saved views..."
                        className={styles.svSearchInput()}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className={styles.svActionGroup()}>
                    <button
                        onClick={() => exportState()}
                        className={styles.svActionButton()}
                        title="Export JSON"
                    >
                        <Download size={16} />
                    </button>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className={styles.svActionButton()}
                        title="Import JSON"
                    >
                        <Upload size={16} />
                    </button>
                    <input ref={fileInputRef} type="file" className={styles.svHiddenInput()} accept=".json" onChange={handleFileChange} />
                </div>
            </div>

            {/* Main Content: List */}
            <div className={styles.svList()}>
                {isLoadingViews ? (
                    <div className={styles.svEmpty()}>Loading...</div>
                ) : filteredViews.length === 0 ? (
                    <div className={styles.svEmpty()}>
                        {searchTerm ? 'No matches found.' : 'No saved views yet.'}
                    </div>
                ) : (
                    filteredViews.map(view => (
                        <div key={view.id} className={styles.svItem()}>
                            <div className={styles.svItemHeader()}>
                                <div>
                                    <h4 className={styles.svItemTitle()}>{view.name}</h4>
                                    <div className={styles.svItemMeta()}>
                                        {view.area && (
                                            <span className={styles.svBadge()}>
                                                <MapPin size={10} /> {view.area}
                                            </span>
                                        )}
                                        {view.createdBy && (
                                            <span className={styles.svUserMeta()}>
                                                <User size={12} /> {view.createdBy}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => deleteView(view.id)}
                                    className={styles.svDeleteBtn()}
                                    title="Delete"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>

                            <button
                                onClick={() => applyView(view)}
                                className={styles.svLoadButton()}
                            >
                                Load View
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Footer: Save Current */}
            <form onSubmit={handleSave} className={styles.svFooterForm()}>
                <h4 className={styles.svFooterLabel()}>Save Current View</h4>
                <div className={styles.svFooterRow()}>
                    <input
                        type="text"
                        placeholder="View Name"
                        className={styles.svNameInput()}
                        value={newViewName}
                        onChange={e => setNewViewName(e.target.value)}
                    />
                    <select
                        className={styles.svAreaSelect()}
                        value={newViewArea}
                        onChange={e => setNewViewArea(e.target.value)}
                    >
                        <option value="Geral">Geral</option>
                        <option value="Atendimento">Atendimento</option>
                        <option value="Financeiro">Financeiro</option>
                        <option value="Vendas">Vendas</option>
                    </select>
                    <button
                        type="submit"
                        disabled={!newViewName.trim() || isLoadingViews}
                        className={styles.svSaveBtn()}
                    >
                        <Check size={16} />
                    </button>
                </div>
            </form>
        </div>
    );
};
