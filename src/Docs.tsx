import React, { useState, useEffect } from 'react';
import {
    BookOpen, Zap, Brain, Palette, Plug, Code2, Layers, Filter,
    CheckSquare, HardDrive, Server, Bot, Gauge, Settings, Terminal,
    Copy, Check, ChevronRight, ArrowUpDown, Columns3,
    RefreshCw, Search, X, Database, Shield,
    Paintbrush, Layout, Moon
} from 'lucide-react';

export const Docs = () => {
    const [activeSection, setActiveSection] = useState('intro');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrollTo = (id: string) => {
        setActiveSection(id);
        setMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Track active section on scroll
    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -70% 0px' }
        );
        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    const navSections = [
        {
            title: 'Getting Started',
            items: [
                { id: 'intro', label: 'Introduction', icon: BookOpen },
                { id: 'quick-start', label: 'Quick Start', icon: Zap },
                { id: 'architecture', label: 'Architecture', icon: Layers },
            ],
        },
        {
            title: 'API Reference',
            items: [
                { id: 'props', label: 'DataGridProps', icon: Settings },
                { id: 'columns', label: 'Column Definition', icon: Columns3 },
                { id: 'toolbar', label: 'Toolbar & Slots', icon: Layout },
            ],
        },
        {
            title: 'Features',
            items: [
                { id: 'fast-filters', label: 'Fast Filters', icon: Filter },
                { id: 'selection', label: 'Selection', icon: CheckSquare },
                { id: 'persistence', label: 'Persistence', icon: HardDrive },
                { id: 'server-side', label: 'Server-Side', icon: Server },
                { id: 'imperative', label: 'Imperative Control', icon: Terminal },
                { id: 'column-types', label: 'Column Types', icon: Database },
            ],
        },
        {
            title: 'Advanced',
            items: [
                { id: 'ai-prompts', label: 'AI Prompts', icon: Bot },
                { id: 'performance', label: 'Performance', icon: Gauge },
                { id: 'styling', label: 'Styling Guide', icon: Paintbrush },
                { id: 'dark-mode', label: 'Dark Mode', icon: Moon },
            ],
        },
    ];

    const NavLink = ({ id, label, icon: Icon }: { id: string; label: string; icon: React.ElementType }) => (
        <button
            onClick={() => scrollTo(id)}
            className={`group flex items-center gap-3 w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-150 ${
                activeSection === id
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
        >
            <Icon size={16} className={activeSection === id ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'} />
            {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex font-sans transition-colors duration-200">
            {/* Mobile menu button */}
            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden fixed top-20 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
            >
                <Layers size={20} className="text-gray-700 dark:text-gray-300" />
            </button>

            {/* Sidebar Navigation */}
            <aside className={`w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 fixed h-full overflow-y-auto shadow-sm z-40 transition-all duration-300 ${
                mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}>
                <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                            <Layers size={20} className="text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">DataGrid</h1>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Stable</span>
                                <span className="text-[11px] text-gray-400 dark:text-gray-500 font-mono">v2.1.0</span>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="px-4 py-6 space-y-6">
                    {navSections.map((section) => (
                        <div key={section.title}>
                            <h3 className="px-3 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">{section.title}</h3>
                            <div className="space-y-0.5">
                                {section.items.map((item) => (
                                    <NavLink key={item.id} {...item} />
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Mobile overlay */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-black/30 z-30" onClick={() => setMobileMenuOpen(false)} />
            )}

            {/* Main Content */}
            <main className="flex-1 md:ml-72 px-6 py-10 lg:px-12 lg:py-12 max-w-4xl mx-auto w-full">

                {/* Introduction */}
                <Section id="intro" title="Why this DataGrid?" subtitle="The gold standard for data tables in your React applications.">
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-2xl">
                        Forget plain HTML tables or heavy libraries. This DataGrid was built from the ground up to be
                        <strong className="text-gray-900 dark:text-white"> fast, flexible, and production-ready</strong> with features like
                        auto-persistence, fast filters, server-side integration, and full dark mode support.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                        <FeatureCard icon={Zap} title="Zero Config" desc="Pagination, sorting, and client-side filtering work out of the box. Just pass rows and columns." color="emerald" />
                        <FeatureCard icon={Brain} title="Smart Persistence" desc="Users never lose their applied filters on page refresh. State auto-saves to localStorage." color="blue" />
                        <FeatureCard icon={Palette} title="Fast Filters UX" desc="Gmail-style chip filters for quick, intuitive data filtering. No complex modals needed." color="purple" />
                        <FeatureCard icon={Plug} title="Backend Agnostic" desc="Works with local arrays or complex server-side APIs with the same simple interface." color="orange" />
                    </div>

                    <Callout type="info" title="TypeScript First">
                        Full type safety with generics. Define your data shape once and get autocomplete everywhere:
                        <code className="ml-1 text-xs bg-blue-100 dark:bg-blue-900/30 px-1.5 py-0.5 rounded text-blue-700 dark:text-blue-400">{`DataGrid<User>`}</code>
                    </Callout>
                </Section>

                {/* Quick Start */}
                <Section id="quick-start" title="Quick Start" subtitle="Get a functional table running in 30 seconds.">
                    <StepList steps={[
                        'Define your columns with field names and headers',
                        'Pass your data array (must include an id property)',
                        'Add toolbar and persistence configuration',
                    ]} />
                    <CodeBlock title="MyTable.tsx" language="tsx" code={`import { DataGrid } from './components/data-grid/DataGrid';
import type { ColumnDef } from './components/data-grid/DataGrid.types';

interface User {
  id: number;
  name: string;
  role: string;
  active: boolean;
}

// 1. Define columns (outside component or useMemo for stability)
const columns: ColumnDef<User>[] = [
  { field: 'name', headerName: 'Full Name', flex: 1 },
  { field: 'role', headerName: 'Role', enableColumnFilter: true },
  { field: 'active', headerName: 'Status', type: 'boolean', width: 100 },
];

// 2. Your data (must have 'id')
const rows: User[] = [
  { id: 1, name: 'Alice Silva', role: 'Dev', active: true },
  { id: 2, name: 'Bob Santos', role: 'Design', active: false },
];

// 3. Render
export const MyTable = () => (
  <div className="h-[600px] w-full">
    <DataGrid
      rows={rows}
      columns={columns}
      toolbar={{ title: "Team Members", enableSearch: true }}
      persistId="team-table-v1"
    />
  </div>
);`} />
                    <Callout type="success" title="That's it!">
                        With just this, you get sorting, searching, column menus, persistence, and pagination working automatically.
                    </Callout>
                </Section>

                {/* Architecture */}
                <Section id="architecture" title="Architecture" subtitle="How the DataGrid is structured internally.">
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        The DataGrid follows a <strong className="text-gray-900 dark:text-white">Compound Component + Headless State</strong> pattern
                        with strict separation between logic (hooks) and presentation (components).
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <MiniCard icon={Code2} title="Controller" desc="useDataGridController orchestrates all hooks" />
                        <MiniCard icon={Database} title="Context" desc="DataGridProvider distributes state" />
                        <MiniCard icon={Layout} title="Components" desc="Internal UI components render props" />
                    </div>

                    <CodeBlock title="Directory Structure" language="text" code={`src/components/data-grid/
├── DataGrid.tsx           # Root Orchestrator (Maestro)
├── DataGrid.types.ts      # TypeScript definitions (Single Source of Truth)
├── DataGrid.styles.ts     # Tailwind Variants styling
├── DataGrid.theme.ts      # Theme colors & constants
├── hooks/
│   ├── useDataGridController.ts   # Main logic coordinator
│   ├── useDataGridSort.ts         # Sorting logic
│   ├── useDataGridPagination.ts   # Pagination state
│   ├── useDataGridQuery.ts        # Server-side data fetching
│   ├── useDataGridFilters.ts      # Advanced filter model
│   ├── useDataGridProcessor.ts    # Client-side data pipeline
│   ├── useDataGridSelection.ts    # Checkbox selection (Include/Exclude)
│   ├── useDataGridFastFilters.ts  # Fast filter chips
│   ├── useDataGridColumns.ts      # Column widths, order, visibility
│   └── useDataGridExport.ts       # CSV export
├── context/
│   └── DataGridContext.tsx         # Central state distribution
├── column-types/
│   ├── ColumnTypeRegistry.ts      # Strategy pattern registry
│   └── definitions/               # text, number, date, select
├── internal/                      # UI sub-components
│   ├── data-grid-toolbar/
│   ├── data-grid-header-row/
│   ├── data-grid-row/
│   ├── data-grid-cell/
│   ├── data-grid-pagination/
│   ├── fast-filters-row/
│   ├── data-grid-modal-filters/
│   ├── data-grid-modal-columns/
│   ├── data-grid-column-menu/
│   ├── data-grid-floating-checked/
│   └── data-grid-overlay/
└── index.ts                       # Public API exports`} />

                    <Callout type="info" title="Design Decision">
                        Complex logic (filters, sorting, pagination) is isolated in custom hooks (<code>useDataGridController</code>)
                        to keep the UI components clean and testable. Each sub-component follows a 4-file pattern:
                        <code className="ml-1">index.ts</code>, <code>.tsx</code>, <code>.types.ts</code>, <code>.styles.ts</code>.
                    </Callout>
                </Section>

                <Divider />

                {/* DataGridProps */}
                <Section id="props" title="DataGridProps" subtitle="Properties accepted by the root DataGrid component.">

                    <PropGroup title="Essential Props">
                        <PropTable headers={['Prop', 'Type', 'Description']} rows={[
                            ['rows', 'T[]', 'Main data array. Each item must have a unique id property.'],
                            ['columns', 'ColumnDef<T>[]', 'Column structure and behavior definitions.'],
                            ['loading', 'boolean', 'When true, displays a loading overlay (skeleton/spinner).'],
                            ['fetchData', '(params) => Promise', 'Enables Server-Side mode. Must be memoized with useCallback.'],
                        ]} />
                    </PropGroup>

                    <PropGroup title="Configuration">
                        <PropTable headers={['Prop', 'Type', 'Description']} rows={[
                            ['persistId', 'string', 'Unique ID for saving filters/sort to localStorage. Omit to disable.'],
                            ['autoHeight', 'boolean', 'Removes internal vertical scroll; grows with content.'],
                            ['autoFit', 'boolean', 'Auto-calculates column widths based on content.'],
                            ['density', "'compact' | 'standard'", 'Controls vertical spacing of cells.'],
                            ['getRowId', '(row) => id', 'Custom ID extractor for rows using _id or cod fields.'],
                            ['getRowClassName', '(params) => string', 'Conditional CSS class per row (e.g., highlight status).'],
                            ['className', 'string', 'CSS class for the outer container.'],
                        ]} />
                    </PropGroup>

                    <PropGroup title="Custom Overlays">
                        <PropTable headers={['Prop', 'Type', 'Description']} rows={[
                            ['renderLoading', 'ReactNode', 'Custom component for the loading overlay.'],
                            ['renderEmpty', 'ReactNode', 'Custom component when rows is empty.'],
                            ['renderNoResults', 'ReactNode', 'Custom component when search/filter yields no results.'],
                        ]} />
                    </PropGroup>

                    <PropGroup title="Controlled State">
                        <PropTable headers={['Prop', 'Type', 'Description']} rows={[
                            ['paginationModel', '{ page, pageSize }', 'Full control over pagination state.'],
                            ['onPaginationModelChange', '(model) => void', 'Callback when page or pageSize changes.'],
                            ['selectionModel', '{ type, ids }', 'Full control over row selection state.'],
                            ['onSelectionModelChange', '(model) => void', 'Callback when selection changes.'],
                            ['onRowChange', '(row) => void', 'Callback fired when a row is edited (if editable).'],
                        ]} />
                    </PropGroup>

                    <PropGroup title="Advanced Configuration">
                        <PropTable headers={['Prop', 'Type', 'Description']} rows={[
                            ['sortMode', "'client' | 'server'", 'Defines who handles sorting. "server" skips local logic.'],
                            ['paginationConfig', '{ mode, pageSizeOptions, enabled, initialPageSize }', 'Fine-grained pagination config (server/client, size options).'],
                            ['selectionConfig', '{ enabled, mode, actions, enableGlobal }', 'Selection behavior config (include/exclude modes, custom actions).'],
                            ['initialFilterModel', 'FilterModel', 'Initial filters applied when no persisted state exists.'],
                        ]} />
                    </PropGroup>
                </Section>

                {/* Column Definition */}
                <Section id="columns" title="Column Definition (ColumnDef)" subtitle="The column object is where the magic happens.">

                    <PropGroup title="Basic Properties">
                        <PropTable headers={['Prop', 'Type', 'Description']} rows={[
                            ['field', 'string', "Data path in the row object (e.g., 'user.address.city')."],
                            ['headerName', 'string', 'Visible title in the header.'],
                            ['type', "'text' | 'number' | 'date' | 'select' | 'checkbox' | ...", 'Column type for automatic formatting and filter behavior.'],
                            ['width', 'number', 'Fixed width in pixels.'],
                            ['flex', 'number', 'Flex factor (e.g., 1) to fill remaining space.'],
                            ['minWidth', 'number', 'Minimum width in pixels (used with flex).'],
                            ['pinned', "'left' | 'right'", 'Pins the column to a side during horizontal scroll.'],
                            ['align', "'left' | 'center' | 'right'", 'Cell content alignment.'],
                        ]} />
                    </PropGroup>

                    <PropGroup title="Features & Controls">
                        <Callout type="warning" title="Tip">
                            Most boolean features default to <code>true</code>. You typically use these to <em>disable</em> behaviors.
                        </Callout>
                        <PropTable headers={['Prop', 'Default', 'Description']} rows={[
                            ['sortable', 'true', 'Allows sorting by clicking the header.'],
                            ['resizable', 'true', 'Allows dragging the border to resize.'],
                            ['filterable', 'true', 'Allows filtering via the context menu.'],
                            ['enableColumnMenu', 'true', 'Shows the three-dot menu with column options.'],
                        ]} />
                    </PropGroup>

                    <PropGroup title="Rendering">
                        <PropTable headers={['Prop', 'Type', 'Description']} rows={[
                            ['render', '(params) => ReactNode', 'Custom cell renderer. Receives { value, row, column }.'],
                            ['valueFormatter', '(value) => string', 'Transforms data for search/export (e.g., boolean to "Active"/"Inactive").'],
                            ['renderMenuItems', '(params) => ReactNode', 'Inject custom items into the column context menu.'],
                            ['renderFilterOption', '(option) => ReactNode', 'Custom renderer for filter dropdown options.'],
                        ]} />
                    </PropGroup>

                    <PropGroup title="Fast Filter Configuration">
                        <PropTable headers={['Prop', 'Type', 'Description']} rows={[
                            ['enableColumnFilter', 'boolean', 'Activates the fast filter chip for this column.'],
                            ['filterType', "'text' | 'select' | 'multiSelect' | 'date'", 'Determines the filter input type.'],
                            ['filterOptions', '{ label, value, color? }[]', 'Options for select/multiSelect filter dropdowns.'],
                            ['filterVisibleInitially', 'boolean', 'If false, hidden until user clicks "+ Filter".'],
                            ['defaultFilterValue', 'any', 'Initial filter value applied automatically.'],
                            ['renderColumnFilter', '(params) => ReactNode', 'Fully custom filter input (DatePicker, Slider, etc).'],
                        ]} />
                    </PropGroup>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-10 mb-4">Full Column Example</h3>
                    <CodeBlock language="tsx" code={`const columns: ColumnDef<User>[] = [
  // Checkbox column (pinned left)
  { field: 'select', type: 'checkbox', width: 50, pinned: 'left' },

  // Custom rendered column with avatar
  {
    field: 'name',
    headerName: 'User',
    width: 250,
    pinned: 'left',
    render: ({ row }) => (
      <div className="flex items-center gap-3">
        <img src={row.avatar} className="w-8 h-8 rounded-full" />
        <div>
          <span className="font-bold">{row.name}</span>
          <span className="text-xs text-gray-500">{row.email}</span>
        </div>
      </div>
    ),
  },

  // Select filter with colored badges
  {
    field: 'status',
    headerName: 'Status',
    width: 140,
    enableColumnFilter: true,
    filterType: 'select',
    filterOptions: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ],
    defaultFilterValue: ['active'],
    renderFilterOption: (opt) => <Badge>{opt.label}</Badge>,
    render: ({ value }) => <StatusTag status={value} />,
  },

  // Currency column (right-aligned)
  {
    field: 'salary',
    headerName: 'Salary',
    width: 120,
    align: 'right',
    render: ({ value }) => <span className="font-semibold">\${value?.toLocaleString()}</span>,
  },

  // Actions column (pinned right, no menu)
  {
    field: 'actions',
    headerName: 'Actions',
    pinned: 'right',
    width: 100,
    enableColumnMenu: false,
    render: () => <ActionButtons />,
  },
];`} />
                </Section>

                {/* Toolbar & Slots */}
                <Section id="toolbar" title="Toolbar & Slots" subtitle="Configure the built-in toolbar or inject custom components.">

                    <PropGroup title="Toolbar Configuration">
                        <CodeBlock language="tsx" code={`<DataGrid
  toolbar={{
    title: "Reports",
    enableSearch: true,
    searchPlaceholder: "Search by name...",
    searchField: "name",          // Limit search to specific field
    enableFilters: true,          // Advanced filter modal button
    enableDensity: true,          // Density toggle (compact/standard)
    enableExport: true,           // Export to CSV button
    enableColumnConfig: true,     // Column visibility/order modal
    endContent: <Button>New</Button>,  // Custom content on the right
    moreActions: [
      { label: 'Print', icon: <PrintIcon />, onClick: () => {} },
      { label: 'Delete All', onClick: () => {}, variant: 'danger' },
    ],
  }}
/>`} />
                    </PropGroup>

                    <PropGroup title="Custom Slots">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Replace entire internal UI sections with your own components.
                        </p>
                        <PropTable headers={['Slot', 'Type', 'Description']} rows={[
                            ['slots.columnMenu', 'Component', 'Replaces the default column header context menu.'],
                            ['slots.loadingOverlay', 'Component', 'Custom loading spinner/skeleton.'],
                            ['slots.noResultsOverlay', 'Component', 'Custom "No results" screen.'],
                        ]} />
                    </PropGroup>
                </Section>

                <Divider />

                {/* Fast Filters */}
                <Section id="fast-filters" title="Fast Filters (Chips)" subtitle="Modern Gmail-style chip filters at the top of the table.">
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Fast Filters provide an intuitive, visual way to filter data using clickable chips.
                        Each chip can be a text input, dropdown select, multi-select, or date picker.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <MiniCard icon={Filter} title="Text Chip" desc="Free text input for contains/equals search" />
                        <MiniCard icon={ArrowUpDown} title="Select Chip" desc="Single-choice dropdown with options" />
                        <MiniCard icon={CheckSquare} title="MultiSelect Chip" desc="Multiple selections with checkboxes" />
                        <MiniCard icon={Search} title="Hidden Filters" desc="Accessible via '+ Filter' button" />
                    </div>

                    <Callout type="info" title="How to enable">
                        Add <code className="font-bold">enableColumnFilter: true</code> to any column definition.
                        For dropdowns, also provide <code className="font-bold">filterOptions</code>.
                    </Callout>

                    <CodeBlock title="Fast Filter Examples" language="tsx" code={`// Text filter (visible by default)
{
  field: 'name',
  headerName: 'Name',
  enableColumnFilter: true,
  filterType: 'text',
}

// Select filter with colored options
{
  field: 'role',
  headerName: 'Role',
  enableColumnFilter: true,
  filterType: 'select',
  filterOptions: [
    { label: 'Admin', value: 'admin', color: 'bg-red-100 text-red-800' },
    { label: 'User', value: 'user', color: 'bg-blue-100 text-blue-800' },
  ],
  renderFilterOption: (opt) => (
    <span className={\`px-2 py-0.5 rounded text-xs font-medium \${opt.color}\`}>
      {opt.label}
    </span>
  ),
}

// Hidden filter (appears in "+ Filter" menu)
{
  field: 'company',
  headerName: 'Company',
  enableColumnFilter: true,
  filterVisibleInitially: false,  // Hidden until user adds it
  filterType: 'select',
  filterOptions: companies.map(c => ({ label: c, value: c })),
}

// Filter with default value pre-applied
{
  field: 'status',
  headerName: 'Status',
  enableColumnFilter: true,
  filterType: 'select',
  filterOptions: statusOptions,
  defaultFilterValue: ['Active', 'Busy'],  // Pre-selected
}`} />

                    <Callout type="success" title="Auto-merge">
                        Fast Filter values are automatically merged with Advanced Modal filters into a single filter model.
                        The <code>"Clear all filters"</code> button appears automatically when any filter is active.
                    </Callout>
                </Section>

                {/* Selection */}
                <Section id="selection" title="Selection (Checkbox)" subtitle="Row selection with Include/Exclude modes for scalable bulk operations.">
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        The selection system uses an <strong className="text-gray-900 dark:text-white">Include/Exclude</strong> model
                        that supports selecting thousands of items across paginated data without loading all rows.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                <Check size={16} className="text-emerald-500" /> Include Mode
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Default. Only selected IDs are tracked.</p>
                            <code className="text-xs text-gray-500 dark:text-gray-400 mt-2 block">{`{ type: 'include', ids: Set([1, 5]) }`}</code>
                        </div>
                        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                <X size={16} className="text-rose-500" /> Exclude Mode
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">All selected except specific IDs.</p>
                            <code className="text-xs text-gray-500 dark:text-gray-400 mt-2 block">{`{ type: 'exclude', ids: Set([2]) }`}</code>
                        </div>
                    </div>

                    <CodeBlock language="tsx" code={`// 1. Checkbox column
{ field: 'select', type: 'checkbox', width: 50, pinned: 'left' }

// 2. Controlled state
const [selection, setSelection] = useState<GridSelectionState>({
  type: 'include',
  ids: new Set(),
});

// 3. Wire it up
<DataGrid
  selectionModel={selection}
  onSelectionModelChange={setSelection}
  getRowId={(row) => row.id}
  selectionConfig={{
    showSelectedCount: true,
    keepOnPageChange: true,
    enableGlobal: true,  // Allows "Select All" across pages
    actions: (selectedIds, onClear) => (
      <button onClick={() => handleBulkDelete(selectedIds)}>
        Delete Selected
      </button>
    ),
  }}
/>`} />
                </Section>

                {/* Persistence */}
                <Section id="persistence" title="Automatic Persistence" subtitle="The DataGrid saves table state to localStorage automatically.">
                    <Callout type="success" title="How it works">
                        Add <code>persistId="my-table-v1"</code> and the DataGrid saves:
                        <ul className="list-disc ml-5 mt-2 space-y-1">
                            <li>Applied filters (including Fast Filters)</li>
                            <li>Sort model (column + direction)</li>
                            <li>Pagination (current page and page size)</li>
                            <li>Table density</li>
                            <li>Column order and visibility</li>
                        </ul>
                    </Callout>

                    <div className="mt-6 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30">
                        <h4 className="font-bold text-amber-800 dark:text-amber-400 mb-2 flex items-center gap-2">
                            <RefreshCw size={16} /> Versioning Strategy
                        </h4>
                        <p className="text-sm text-amber-700 dark:text-amber-300">
                            If you change columns in a way that breaks compatibility, just change the ID
                            (e.g., <code>v1</code> to <code>v2</code>) and the cache resets automatically for all users.
                        </p>
                    </div>
                </Section>

                {/* Server-Side */}
                <Section id="server-side" title="Server-Side Integration" subtitle='The "Dumb UI, Smart Parent" pattern for API-driven tables.'>

                    <div className="mb-8 p-6 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-5 text-center text-sm uppercase tracking-wider">Data Flow</h4>
                        <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-3">
                            <FlowStep color="blue" step="1" title="User Interacts" desc="Clicks page 2" />
                            <ChevronRight size={20} className="hidden md:block text-gray-300 dark:text-gray-600 shrink-0" />
                            <FlowStep color="purple" step="2" title="Grid Notifies" desc="onPaginationModelChange" />
                            <ChevronRight size={20} className="hidden md:block text-gray-300 dark:text-gray-600 shrink-0" />
                            <FlowStep color="orange" step="3" title="Parent Fetches" desc="fetchData → API call" />
                            <ChevronRight size={20} className="hidden md:block text-gray-300 dark:text-gray-600 shrink-0" />
                            <FlowStep color="emerald" step="4" title="Props Update" desc="rows={newData}" />
                        </div>
                    </div>

                    <CodeBlock title="ServerTable.tsx" language="tsx" code={`import { useCallback, useRef } from 'react';
import { DataGrid } from './components/data-grid/DataGrid';
import type { DataGridRef } from './components/data-grid/DataGrid.types';

export const ServerTable = () => {
  const gridRef = useRef<DataGridRef>(null);

  // CRITICAL: Must be memoized with useCallback!
  const fetchData = useCallback(async (params) => {
    const { pagination, sort, filters, search } = params;

    // Build your query string from DataGrid params
    const queryString = buildQuery(pagination, sort, filters);
    const response = await api.get('/users?' + queryString);

    return {
      data: response.items,    // Array of items for current page
      total: response.totalCount,  // Total count for pagination
    };
  }, []);  // Empty deps = stable reference

  return (
    <DataGrid
      ref={gridRef}
      fetchData={fetchData}
      columns={columns}
      toolbar={{ enableSearch: true, enableFilters: true }}
      paginationConfig={{
        enabled: true,
        initialPageSize: 10,
        pageSizeOptions: [10, 25, 50, 100],
      }}
    />
  );
};`} />

                    <Callout type="warning" title="fetchData must be stable!">
                        The <code className="font-bold">fetchData</code> function <strong>MUST</strong> be wrapped in <code>useCallback</code>.
                        Without it, the function recreates every render, causing infinite fetch loops.
                    </Callout>
                </Section>

                {/* Imperative Control */}
                <Section id="imperative" title="Imperative Control" subtitle="Programmatically control the DataGrid from outside.">
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Use a <code>ref</code> to trigger actions like refreshing data after creating a record in a modal.
                    </p>
                    <CodeBlock language="tsx" code={`const gridRef = useRef<DataGridRef>(null);

// After creating a user in a modal:
const handleUserCreated = () => {
  gridRef.current?.refresh(); // Forces fetchData() to re-execute
};

<DataGrid ref={gridRef} fetchData={fetchUsers} ... />`} />

                    <PropGroup title="DataGridRef Methods">
                        <PropTable headers={['Method', 'Returns', 'Description']} rows={[
                            ['refresh()', 'void', 'Forces a new fetchData call. Only works in Server-Side mode.'],
                        ]} />
                    </PropGroup>
                </Section>

                {/* Column Types */}
                <Section id="column-types" title="Column Type Registry" subtitle="Extensible Strategy Pattern for column types.">
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Instead of hardcoded switches, each column type (<code>text</code>, <code>number</code>, <code>date</code>, <code>select</code>)
                        is an isolated strategy registered in a central registry. You can create custom types.
                    </p>

                    <CodeBlock title="Creating a Custom Column Type" language="tsx" code={`// 1. Define the type strategy
import type { ColumnTypeDefinition } from './column-types/ColumnTypes.types';

export const CurrencyColumnType: ColumnTypeDefinition = {
  type: 'currency',

  // Input for the Advanced Filter Modal
  renderFilterInput: ({ itemValue, onChange }) => (
    <input
      type="number"
      placeholder="0.00"
      value={itemValue}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded"
    />
  ),

  // Input for the Fast Filter Popover
  renderFastFilterInput: ({ value, onChange }) => (
    <div className="p-2 w-[200px]">
      <label className="text-xs text-gray-500">Amount:</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border p-2 rounded"
      />
    </div>
  ),
};

// 2. Register it
import { columnTypeRegistry } from './column-types/ColumnTypeRegistry';
columnTypeRegistry.register(CurrencyColumnType);

// 3. Use it in a column
{ field: 'price', headerName: 'Price', filterType: 'currency' }`} />
                </Section>

                <Divider />

                {/* AI Prompts */}
                <Section id="ai-prompts" title="AI Prompts" subtitle="Copy-paste templates for AI assistants to scaffold tables.">

                    <div className="space-y-6">
                        <PromptCard
                            title="Create New Table"
                            icon={Code2}
                            prompt={`Act as a senior React Developer. Using the DataGrid component (DataGrid.types.ts), create a complete page to list [ENTITY].

Requirements:
1. Columns: [LIST COLUMNS, e.g., Name, Status, Date, Amount].
2. Enable Fast Filters (Chips) for Status and Category columns.
3. The 'Amount' column should be formatted as currency.
4. Add persistence with ID '[TABLE_ID]'.
5. Use mock data for the example.
6. Support dark mode with Tailwind dark: classes.`}
                        />
                        <PromptCard
                            title="Integrate with Real API"
                            icon={Server}
                            prompt={`Refactor the DataGrid component above to use Server-Side Pagination and Filtering.

Requirements:
1. Create a fetchData function that accepts (pagination, filters, sort, search).
2. Wrap it in useCallback with proper dependencies.
3. Configure paginationConfig with mode 'server'.
4. Handle loading state correctly.
5. Add a refresh button using DataGridRef.`}
                        />
                        <PromptCard
                            title="Add Custom Cell Renderers"
                            icon={Palette}
                            prompt={`Using the DataGrid component, add custom cell renderers:

1. Status column with colored badges (Active=green, Inactive=red).
2. User column with avatar + name + email layout.
3. Actions column with Edit/Delete icon buttons.
4. Currency column with right-aligned formatted numbers.
5. Date column with calendar icon and locale formatting.
All renderers should support dark mode.`}
                        />
                    </div>
                </Section>

                {/* Performance */}
                <Section id="performance" title="Performance & Best Practices" subtitle="Rules for maintaining 60fps with large datasets.">
                    <div className="space-y-4">
                        <Callout type="warning" title="fetchData Stability">
                            In Server-Side mode, the <code className="font-bold">fetchData</code> function <strong>MUST</strong> be memoized
                            with <code className="font-bold">useCallback</code>. Otherwise, it recreates every render, causing infinite request loops.
                        </Callout>
                        <Callout type="info" title="Static Columns">
                            Define the <code className="font-bold">columns</code> array outside the component or wrap it in <code>useMemo</code>.
                            Recreating columns every render resets width and sort state if there's no persistId.
                        </Callout>
                        <Callout type="success" title="useMemo for Rows">
                            If you transform data before passing to the grid, use <code>useMemo</code> to avoid unnecessary reprocessing.
                        </Callout>
                        <Callout type="info" title="Row Memoization">
                            <code>DataGridRow</code> is wrapped in <code>React.memo</code>. Selecting row 1 does NOT re-render row 2.
                            This is achieved by passing data via props instead of context.
                        </Callout>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-10 mb-4">Performance Checklist</h3>
                    <div className="space-y-2">
                        {[
                            'fetchData wrapped in useCallback with stable deps',
                            'columns defined with useMemo or outside the component',
                            'Row data transformations wrapped in useMemo',
                            'Using persistId for state caching between sessions',
                            'Using getRowId for custom ID extraction',
                            'Avoiding inline render functions (define them outside or useMemo)',
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                                <CheckSquare size={16} className="text-emerald-500 shrink-0" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Styling Guide */}
                <Section id="styling" title="Styling Guide" subtitle="How to customize the DataGrid appearance.">
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        The DataGrid uses <strong className="text-gray-900 dark:text-white">Tailwind Variants (tv)</strong> for
                        typed, composable styling. Avoid inline CSS or CSS modules.
                    </p>

                    <CodeBlock title="Example .styles.ts file" language="ts" code={`import { tv } from 'tailwind-variants';

export const myComponentStyles = tv({
  slots: {
    container: 'flex flex-col items-center p-8 text-gray-400 dark:text-gray-500',
    icon: 'w-12 h-12 mb-4 opacity-50',
    text: 'text-sm font-medium',
  },
  variants: {
    variant: {
      loading: { icon: 'animate-spin text-blue-500' },
      error: { icon: 'text-red-500' },
    },
  },
});

// Usage in component:
const { container, icon, text } = myComponentStyles({ variant: 'loading' });
return <div className={container()}>...</div>;`} />

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4">Key Style Files</h3>
                    <PropTable headers={['File', 'Purpose']} rows={[
                        ['DataGrid.styles.ts', 'Main container, scroll areas, rows, cells, overlays'],
                        ['DataGrid.theme.ts', 'Brand colors, reusable class composites (inputs, buttons, chips)'],
                        ['*/[Component].styles.ts', 'Each sub-component has its own styles file'],
                    ]} />
                </Section>

                {/* Dark Mode */}
                <Section id="dark-mode" title="Dark Mode Support" subtitle="Full dark mode support via Tailwind's class-based strategy.">
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        The DataGrid supports dark mode out of the box. It uses Tailwind's <code>dark:</code> prefix
                        triggered by the <code>.dark</code> class on the root HTML element.
                    </p>

                    <CodeBlock title="Enabling Dark Mode" language="tsx" code={`// Toggle dark mode by adding/removing the 'dark' class
document.documentElement.classList.toggle('dark');

// Or use the included ThemeToggle component:
import { ThemeToggle } from './components/ThemeToggle';

// In your layout:
<nav>
  <ThemeToggle />  {/* Auto-detects system preference */}
</nav>`} />

                    <Callout type="info" title="Custom dark mode variant">
                        The project uses a custom Tailwind variant: <code>@custom-variant dark (&:where(.dark, .dark *));</code>
                        This ensures dark mode styles apply to all nested children when <code>.dark</code> is on any ancestor.
                    </Callout>
                </Section>

                {/* Footer */}
                <div className="mt-20 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between text-sm text-gray-400 dark:text-gray-500">
                        <div className="flex items-center gap-2">
                            <Shield size={14} />
                            <span>Production Ready &middot; Audited Dec 2025</span>
                        </div>
                        <span className="font-mono text-xs">DataGrid v2.1.0</span>
                    </div>
                </div>

            </main>
        </div>
    );
};

// --- Sub-Components ---

const Section = ({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: React.ReactNode }) => (
    <section id={id} className="scroll-mt-10 mb-20">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1 tracking-tight">{title}</h2>
        {subtitle && <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">{subtitle}</p>}
        {children}
    </section>
);

const Divider = () => <hr className="my-16 border-gray-200 dark:border-gray-800" />;

const FeatureCard = ({ icon: Icon, title, desc, color }: { icon: React.ElementType; title: string; desc: string; color: string }) => {
    const colors: Record<string, string> = {
        emerald: 'bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/30',
        blue: 'bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800/30',
        purple: 'bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-800/30',
        orange: 'bg-orange-50 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-800/30',
    };
    return (
        <div className="bg-white dark:bg-gray-800/50 p-5 rounded-xl border border-gray-100 dark:border-gray-700/50 hover:shadow-md transition-all duration-200 group">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 border ${colors[color]} transition-transform duration-200 group-hover:scale-110`}>
                <Icon size={20} />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-1.5">{title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
        </div>
    );
};

const MiniCard = ({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) => (
    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
        <div className="flex items-center gap-2 mb-2">
            <Icon size={16} className="text-emerald-500" />
            <h4 className="font-bold text-gray-900 dark:text-white text-sm">{title}</h4>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
    </div>
);

const FlowStep = ({ color, step, title, desc }: { color: string; step: string; title: string; desc: string }) => {
    const colors: Record<string, string> = {
        blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-400',
        purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800/50 text-purple-700 dark:text-purple-400',
        orange: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800/50 text-orange-700 dark:text-orange-400',
        emerald: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400',
    };
    return (
        <div className={`text-center p-3 rounded-lg border w-full ${colors[color]}`}>
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">{step}</span>
            <div className="font-bold text-sm mt-0.5">{title}</div>
            <div className="text-xs opacity-75 mt-0.5">{desc}</div>
        </div>
    );
};

const StepList = ({ steps }: { steps: string[] }) => (
    <div className="mb-6 space-y-3">
        {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">{step}</span>
            </div>
        ))}
    </div>
);

const CodeBlock = ({ title, code, language }: { title?: string; code: string; language?: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-[#0d1117] rounded-xl overflow-hidden shadow-lg border border-gray-800/50 my-6 group">
            <div className="flex items-center justify-between bg-[#161b22] px-4 py-2.5 border-b border-gray-800/50">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                    </div>
                    {title && <span className="text-xs font-mono text-gray-400 ml-3">{title}</span>}
                    {language && <span className="text-[10px] text-gray-500 bg-gray-800 px-1.5 py-0.5 rounded ml-2">{language}</span>}
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-gray-700"
                >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto font-mono leading-relaxed custom-scrollbar">
                {code}
            </pre>
        </div>
    );
};

const Callout = ({ type, title, children }: { type: 'info' | 'warning' | 'success'; title?: string; children: React.ReactNode }) => {
    const styles = {
        info: {
            container: 'bg-blue-50 dark:bg-blue-900/10 border-blue-300 dark:border-blue-700/50 text-blue-900 dark:text-blue-300',
            icon: <BookOpen size={16} className="text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />,
        },
        warning: {
            container: 'bg-amber-50 dark:bg-amber-900/10 border-amber-300 dark:border-amber-700/50 text-amber-900 dark:text-amber-300',
            icon: <Zap size={16} className="text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />,
        },
        success: {
            container: 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-300 dark:border-emerald-700/50 text-emerald-900 dark:text-emerald-300',
            icon: <Check size={16} className="text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />,
        },
    };

    return (
        <div className={`${styles[type].container} border-l-4 p-4 rounded-r-lg my-4`}>
            <div className="flex items-start gap-2.5">
                {styles[type].icon}
                <div>
                    {title && <h4 className="font-bold text-sm mb-1">{title}</h4>}
                    <div className="text-sm opacity-90 leading-relaxed">{children}</div>
                </div>
            </div>
        </div>
    );
};

const PropGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <ChevronRight size={18} className="text-emerald-500" />
            {title}
        </h3>
        {children}
    </div>
);

const PropTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
    <div className="bg-white dark:bg-gray-800/50 shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg overflow-x-auto my-4">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                    {headers.map((h, i) => (
                        <th key={i} className="px-5 py-3 text-left text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, i) => (
                    <tr key={i} className="border-t border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                        <td className="px-5 py-3 font-mono font-semibold text-emerald-600 dark:text-emerald-400 whitespace-nowrap text-xs">{row[0]}</td>
                        {row.length > 2 && (
                            <td className="px-5 py-3 font-mono text-pink-600 dark:text-pink-400 text-xs whitespace-nowrap">{row[1]}</td>
                        )}
                        <td className="px-5 py-3 text-gray-600 dark:text-gray-400 leading-relaxed text-xs">{row[row.length - 1]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const PromptCard = ({ title, icon: Icon, prompt }: { title: string; icon: React.ElementType; prompt: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800/50">
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                    <Icon size={16} className="text-emerald-500" />
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{title}</h4>
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <pre className="p-4 text-sm text-gray-600 dark:text-gray-400 font-mono whitespace-pre-wrap leading-relaxed bg-gray-50 dark:bg-gray-900/50">
                {prompt}
            </pre>
        </div>
    );
};
