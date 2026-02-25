import React from 'react';
import { Copy, Play, Braces, AlertCircle, Check } from 'lucide-react';
import { useJsonViewTab } from './useJsonViewTab';
import { jsonViewTabStyles } from './JsonViewTab.styles';
import { useDataGridContext } from '../../context/DataGridContext';

export const JsonViewTab: React.FC = () => {
    const { state, restoreState } = useDataGridContext();
    const styles = jsonViewTabStyles();

    // UI State for "Copied!" feedback
    const [copied, setCopied] = React.useState(false);

    const {
        jsonString,
        error,
        handleChange,
        handleFormat,
        handleCopy,
        handleApply
    } = useJsonViewTab({
        currentState: state,
        onApply: restoreState
    });

    const onCopyClick = async () => {
        const success = await handleCopy();
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className={styles.container()}>
            <div className={styles.editorContainer()}>
                <textarea
                    className={styles.textarea()}
                    value={jsonString}
                    onChange={(e) => handleChange(e.target.value)}
                    spellCheck={false}
                    placeholder="Paste DataGrid JSON configuration here..."
                />
            </div>

            <div className={styles.actions()}>
                <div className={styles.statusWrapper()}>
                    {error ? (
                        <span className={styles.error()}>
                            <AlertCircle size={14} className={styles.alertIcon()} />
                            {error}
                        </span>
                    ) : (
                        <span className={styles.status()}>
                            {jsonString.length} chars
                        </span>
                    )}
                </div>

                <div className={styles.buttonGroup()}>
                    <button
                        onClick={handleFormat}
                        className={`${styles.button()} ${styles.formatButton()}`}
                        title="Format JSON"
                    >
                        <Braces size={14} />
                        Format
                    </button>

                    <button
                        onClick={onCopyClick}
                        className={`${styles.button()} ${styles.copyButton()}`}
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? 'Copied!' : 'Copy'}
                    </button>

                    <button
                        onClick={handleApply}
                        disabled={!!error}
                        className={`${styles.button()} ${styles.applyButton()}`}
                    >
                        <Play size={14} />
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};
