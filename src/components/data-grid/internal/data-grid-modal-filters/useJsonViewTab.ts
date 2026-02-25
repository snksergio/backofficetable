import { useState, useCallback, useEffect } from 'react';
import type { DataGridState } from '../../DataGrid.types';

interface UseJsonViewTabProps {
    currentState: DataGridState;
    onApply: (state: DataGridState) => void;
}

export const useJsonViewTab = ({ currentState, onApply }: UseJsonViewTabProps) => {
    const [jsonString, setJsonString] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);

    // Initialize with current state
    useEffect(() => {
        if (!isDirty) {
            setJsonString(JSON.stringify(currentState, null, 2));
        }
    }, [currentState, isDirty]);

    const handleFormat = useCallback(() => {
        try {
            const parsed = JSON.parse(jsonString);
            setJsonString(JSON.stringify(parsed, null, 2));
            setError(null);
        } catch {
            setError('Invalid JSON');
        }
    }, [jsonString]);

    const handleChange = useCallback((value: string) => {
        setJsonString(value);
        setIsDirty(true);
        setError(null);
    }, []);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(jsonString);
            return true;
        } catch {
            return false;
        }
    }, [jsonString]);

    const handleApply = useCallback(() => {
        try {
            const parsed = JSON.parse(jsonString);

            // Basic validation
            if (typeof parsed !== 'object' || parsed === null) {
                throw new Error('Root must be an object');
            }

            onApply(parsed as DataGridState);
            setIsDirty(false); // Reset dirty flag to allow syncing again if needed
            setError(null);
        } catch (err) {
            setError((err as Error).message || 'Invalid JSON format');
        }
    }, [jsonString, onApply]);

    return {
        jsonString,
        error,
        handleChange,
        handleFormat,
        handleCopy,
        handleApply
    };
};
