import type { ColumnTypeDefinition } from './ColumnTypes.types';
import { TextColumnType } from './definitions/TextColumnType';
import { NumberColumnType } from './definitions/NumberColumnType';
import { DateColumnType } from './definitions/DateColumnType';
import { SelectColumnType } from './definitions/SelectColumnType';

class ColumnTypeRegistry {
    private types: Map<string, ColumnTypeDefinition> = new Map();

    constructor() {
        // Register default types
        this.register(TextColumnType);
        this.register(NumberColumnType);
        this.register(DateColumnType);
        this.register(DateColumnType);
        this.register(SelectColumnType);
        // Alias for multiSelect to use the same logic
        this.register({ ...SelectColumnType, type: 'multiSelect' });
    }

    public register(definition: ColumnTypeDefinition) {
        this.types.set(definition.type, definition);
    }

    public get(type: string): ColumnTypeDefinition {
        return this.types.get(type) || this.types.get('text')!; // Fallback to text
    }
}

export const columnTypeRegistry = new ColumnTypeRegistry();
