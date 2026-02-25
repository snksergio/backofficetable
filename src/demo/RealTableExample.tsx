/**
 * RealTableExample.tsx
 * 
 * Example of a "Smart" Server-Side DataGrid integration.
 * This file demonstrates how to connect the DataGrid to an API (simulated here)
 * and handle complex features like Filtering, Sorting, Pagination, and Selection.
 */

// --- 1. Imports ---
import { useRef, useCallback, useState, useMemo } from 'react';
import { Printer, Share2, Trash2 } from 'lucide-react';
import { DataGrid } from '../components/data-grid/DataGrid';

// Types from the DataGrid ecosystem
// Types from the DataGrid ecosystem
import type { ColumnDef, DataGridRef } from '../components/data-grid/DataGrid.types';


// --- 2. Types & Interfaces ---
// Define the shape of your data entity
interface UserData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    age: number;
    eyeColor: string;
    hair: { color: string };
}

// --- 3. Component Implementation ---
export const RealTableExample = () => {

    // --- A. Refs & State ---
    // Ref to access DataGrid imperative methods (like .refresh())
    const tableRef = useRef<DataGridRef>(null);

    // We store visible rows in a ref to look up names for the "See Selected" action since 
    // selectionModel only holds IDs.
    const visibleRowsRef = useRef<UserData[]>([]);

    // Selection State (Controlled Mode)
    // We use a Set for IDs to allow O(1) lookup performance
    const [selectionModel, setSelectionModel] = useState<any>({
        type: 'include',
        ids: new Set()
    });

    // --- B. Server-Side Data Fetching ---
    /**
     * fetchUsers
     * 
     * Esta função simula uma chamada de API ao Backend.
     * ⚠️ IMPORTANTE: Deve ser memoizada com useCallback para evitar loops infinitos!
     */
    const fetchUsers = useCallback(async (params: any) => {
        try {
            // [Simulation] Fetch ALL raw data from dummyjson
            const response = await fetch('https://dummyjson.com/users?limit=0');

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            // Simulate Network Delay (1s) so the user can see the Loading State
            await new Promise(resolve => setTimeout(resolve, 800));

            const json = await response.json();

            if (!json || !json.users) {
                console.warn('API Response malformed:', json);
                return { data: [], total: 0 };
            }

            let allUsers = json.users;

            // Destructure DataGrid params (what the user requested)
            const { pagination, search, filters, sort } = params;

            // [Simulation] 1. Apply Global Search
            // The server should search across all relevant text fields
            if (search) {
                const lowerSearch = search.toLowerCase();
                allUsers = allUsers.filter((user: any) =>
                    user.firstName.toLowerCase().includes(lowerSearch) ||
                    user.lastName.toLowerCase().includes(lowerSearch) ||
                    user.email.toLowerCase().includes(lowerSearch)
                );
            }

            // [Simulation] 2. Apply Column Filters (Advanced & Fast Filters)
            // The DataGrid merges both FastFilters and ModalFilters into `filters.items`
            if (filters && filters.items.length > 0) {
                allUsers = allUsers.filter((user: any) => {
                    return filters.items.every((filter: any) => {
                        // Skip invalid filter values
                        if (filter.value === undefined || filter.value === '' || filter.value === null) {
                            if (filter.operator !== 'isEmpty' && filter.operator !== 'isNotEmpty') return true;
                        }

                        const rowValue = user[filter.field];
                        const filterValue = filter.value;

                        // Basic switch for supported operators
                        switch (filter.operator) {
                            case 'contains':
                                return String(rowValue).toLowerCase().includes(String(filterValue).toLowerCase());
                            case 'equals':
                                return String(rowValue).toLowerCase() === String(filterValue).toLowerCase();
                            case 'startsWith':
                                return String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase());
                            case 'endsWith':
                                return String(rowValue).toLowerCase().endsWith(String(filterValue).toLowerCase());
                            case 'isAnyOf':
                                return Array.isArray(filterValue) ? filterValue.includes(rowValue) : rowValue === filterValue;
                            default:
                                return true;
                        }
                    });
                });
            }

            // [Simulation] 3. Apply Sorting
            if (sort) {
                allUsers.sort((a: any, b: any) => {
                    const aVal = a[sort.field];
                    const bVal = b[sort.field];

                    if (aVal < bVal) return sort.direction === 'asc' ? -1 : 1;
                    if (aVal > bVal) return sort.direction === 'asc' ? 1 : -1;
                    return 0;
                });
            }

            // [Simulation] 4. Apply Pagination
            // Calculate start/end based on current page
            const total = allUsers.length;
            const start = (pagination.page - 1) * pagination.pageSize;
            const end = start + pagination.pageSize;

            // Slice the data window to return
            const data = allUsers.slice(start, end);

            // Update local ref for UI actions
            visibleRowsRef.current = data;

            // Simulate network latency (UX)
            await new Promise(resolve => setTimeout(resolve, 400));

            // Return standardized response
            return {
                data,
                total
            };
        } catch (err) {
            console.error('FetchUsers Error:', err);
            return { data: [], total: 0 };
        }
    }, []);

    // --- C. Column Definitions ---
    // Memoize columns to prevent unnecessary re-renders
    const columns = useMemo<ColumnDef<UserData>[]>(() => [
        {
            field: 'firstName',
            headerName: 'First Name',
            minWidth: 150,
            sortable: true,
            filterable: true,
            // Enables the specific input chip at the top of the column
            enableColumnFilter: true,
            filterType: 'text'
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            minWidth: 150,
            sortable: true,
            filterable: true,
            enableColumnFilter: true,
            filterType: 'text'
        },
        {
            field: 'email',
            headerName: 'Email',
            minWidth: 250,

            filterable: true,
            enableColumnFilter: true,
            filterVisibleInitially: false,
            filterType: 'text'
        },
        {
            field: 'role',
            headerName: 'Role',
            minWidth: 120,
            filterable: true,

            // Fast Filter Configuration for "Select" type
            enableColumnFilter: true,
            filterType: 'select',
            filterOptions: [
                { label: 'Admin', value: 'admin', color: 'bg-red-100 text-red-800' },
                { label: 'User', value: 'user', color: 'bg-blue-100 text-blue-800' },
                { label: 'Manager', value: 'manager', color: 'bg-green-100 text-green-800' },
                { label: 'Guest', value: 'guest', color: 'bg-gray-100 text-gray-800' },
            ],
            renderFilterOption: (option) => (
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${option.color || 'bg-gray-100 text-gray-800'}`}>
                    {option.label}
                </span>
            )
        },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            minWidth: 80,
            sortable: true,
            filterable: true,
            enableColumnFilter: true,
            filterVisibleInitially: false, // Hidden by default
            filterType: 'text'
        },
        {
            field: 'eyeColor',
            headerName: 'Eye Color',
            minWidth: 100,

            // Fast Filter Configuration for "MultiSelect" type
            enableColumnFilter: true,
            filterType: 'multiSelect',
            filterOptions: [
                { label: 'Blue', value: 'Blue' },
                { label: 'Brown', value: 'Brown' },
                { label: 'Green', value: 'Green' },
                { label: 'Hazel', value: 'Hazel' },
            ]
        },
        {
            field: 'select',
            headerName: '',
            type: 'checkbox',
            width: 50,
            pinned: 'right'
        }
    ], []);

    // --- D. Render Helper for Selection Actions ---
    const handleSeeSelected = () => {
        if (selectionModel.type === 'exclude') {
            alert(`Modo Global Ativo!\nTodos os itens estão selecionados (exceto ${selectionModel.ids.size}).\n\nNomes não disponíveis sem buscar tudo no servidor.`);
        } else {
            // Find names of selected IDs *only if they are visible on current page*
            const names = visibleRowsRef.current
                .filter(row => selectionModel.ids.has(row.id))
                .map(row => `${row.firstName} ${row.lastName}`);

            if (names.length === 0 && selectionModel.ids.size > 0) {
                alert(`Selecionados: ${selectionModel.ids.size} IDs (Nenhum visível nesta página).`);
            } else {
                alert(`Nomes Selecionados (Visíveis): \n${names.join(', ')}`);
            }
        }
    };

    // --- E. Main Render ---
    return (
        <div className="p-10 h-screen flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            {/* 1. Page Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Smart Server-Side DataGrid</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Demonstração completa: Paginação Remota, Filtros Rápidos, Seleção e Refresh.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Manual Refresh Button Example */}
                    <button
                        onClick={() => tableRef.current?.refresh()}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition shadow-sm font-medium flex items-center gap-2"
                        title="Força o recarregamento dos dados mantendo os filtros atuais"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                            <path d="M16 21h5v-5" />
                        </svg>
                        Refresh
                    </button>
                </div>
            </div>

            {/* 2. DataGrid Component */}
            <DataGrid
                // Core Props
                ref={tableRef}
                persistId="real-table-example"
                columns={columns}
                fetchData={fetchUsers} // Enables Server-Side Mode
                getRowId={(row) => row.id}

                // Selection (Controlled)
                selectionModel={selectionModel}
                onSelectionModelChange={setSelectionModel}

                // Layout & Styles
                autoHeight
                autoFit
                paginationConfig={{
                    enabled: true,
                    initialPageSize: 10,
                }}

                // Header Configuration
                toolbar={{
                    title: "System Users",
                    enableSearch: true,       // Global Search
                    enableFilters: true,      // Advanced Filter Modal
                    enableColumnConfig: true, // Column Visibility/Order Modal
                    enableExport: true,       // Export to CSV
                    enableDensitySelector: true,
                    moreActions: [
                        { label: 'Print Report', icon: <Printer size={14} />, onClick: () => alert('Printing...') },
                        { label: 'Share Link', icon: <Share2 size={14} />, onClick: () => alert('Sharing...') },
                        { label: 'Delete All', icon: <Trash2 size={14} />, onClick: () => alert('Deleting...'), variant: 'danger' }
                    ]
                }}

                // Custom Floating Selection Actions
                selectionConfig={{
                    actions: (_ids) => (
                        <button
                            className="px-3 py-1 bg-white text-indigo-600 text-sm font-medium rounded border border-indigo-200 hover:bg-indigo-50 shadow-sm"
                            onClick={handleSeeSelected}
                        >
                            Ver Nomes Selecionados
                        </button>
                    )
                }}
            />
        </div>
    );
};
