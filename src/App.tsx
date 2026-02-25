import { useState } from 'react';
import { DataGrid } from './components/data-grid/DataGrid';
import type { ColumnDef } from './components/data-grid/DataGrid.types';
import { Docs } from './Docs';
import { RealTableExample } from './demo/RealTableExample';
import { ExampleFinalPage } from './demo/ExampleFinalPage';
import { ThemeToggle } from './components/ThemeToggle';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  lastLogin: Date;
  salary: number;
  performance: number;
}

type ViewMode = 'basic' | 'server' | 'final' | 'docs';

function App() {
  const [view, setView] = useState<ViewMode>('final'); // Default to the new demo

  // --- Basic Demo Data ---
  const columns: ColumnDef<User>[] = [
    {
      field: 'select',
      headerName: '',
      type: 'checkbox',
      pinned: 'left',
      enableColumnMenu: true,
      columnMenuConfig: { showHide: false }
    },
    { field: 'id', headerName: 'ID', type: 'id', enableColumnMenu: true },
    {
      field: 'name',
      headerName: 'Name',
      type: 'user',
      enableColumnMenu: true,
      renderMenuItems: ({ onClose, column }) => (
        <button
          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
          onClick={() => {
            alert(`Viewing profile for column: ${column.headerName}`);
            onClose();
          }}
        >
          View Profile
        </button>
      )
    },
    { field: 'email', headerName: 'Email', type: 'text', width: 200, enableColumnMenu: true, sortable: true },
    { field: 'role', headerName: 'Role', type: 'text', enableColumnMenu: true },
    { field: 'department', headerName: 'Department', type: 'text', enableColumnMenu: true },
    { field: 'status', headerName: 'Status', type: 'status', className: 'bg-yellow-50 text-yellow-700', enableColumnMenu: true },
    { field: 'lastLogin', headerName: 'Last Login', type: 'datetime', enableColumnMenu: true },
    { field: 'salary', headerName: 'Salary', type: 'currency', enableColumnMenu: true },
    { field: 'performance', headerName: 'Performance', type: 'percent', enableColumnMenu: true },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      render: () => (
        <button className="text-blue-600 hover:text-blue-800">Edit</button>
      )
    }
  ];

  const [rows, setRows] = useState<User[]>(() => Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: ['Developer', 'Designer', 'Manager', 'Analyst'][i % 4],
    department: ['Engineering', 'Design', 'Sales'][i % 3],
    status: ['Active', 'Inactive', 'Pending'][i % 3],
    lastLogin: new Date(),
    salary: 50000 + (i * 1000),
    performance: 0.8
  })));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-200">
      {/* Navigation Bar */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-4 flex items-center justify-between sticky top-0 z-50 transition-colors duration-200">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">DataGrid Demos</h1>

        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg transition-colors duration-200">
            <button
              onClick={() => setView('final')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${view === 'final' ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              Enterprise Demo ✨
            </button>
            <button
              onClick={() => setView('server')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${view === 'server' ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              Server-Side
            </button>
            <button
              onClick={() => setView('basic')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${view === 'basic' ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              Basic Grid
            </button>
            <button
              onClick={() => setView('docs')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${view === 'docs' ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              Documentation
            </button>
          </div>

          {/* Global Theme Toggle */}
          <ThemeToggle />
        </div>
      </nav>

      {/* Content Area */}
      <main className="flex-1">
        {view === 'final' && <ExampleFinalPage />}

        {view === 'server' && <RealTableExample />}

        {view === 'docs' && <Docs />}

        {view === 'basic' && (
          <div className="p-8 max-w-[1200px] mx-auto space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Basic Usage Example</h2>
              <DataGrid
                rows={rows}
                columns={columns}
                autoHeight
                onRowChange={(updated) => setRows(prev => prev.map(r => r.id === updated.id ? updated : r))}
                toolbar={{
                  title: 'Basic List',
                  enableSearch: true,
                  enableFilters: true,
                  enableColumnConfig: true,
                  enableExport: true,
                  enableDensitySelector: true
                }}
                paginationConfig={{
                  enabled: true,
                  initialPageSize: 5
                }}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
