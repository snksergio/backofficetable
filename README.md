# DataGrid Component

A powerful, customizable, and performant React DataGrid component with features like sorting, column pinning, resizing, selection, and more.

## Features

-   **High Performance**: Virtualized rendering for handling large datasets efficiently.
-   **Sorting**: Built-in sorting support (ASC/DESC).
-   **Column Pinning**: Pin columns to the left or right.
-   **Column Resizing**: Draggable column widths with persistence logic.
-   **Selection**: Row selection with checkbox support and batch operations (Select All).
-   **Custom Cell Rendering**: Support for various cell types (text, number, date, boolean, status, etc.) and custom renderers.
-   **Styling**: Built with Tailwind CSS and `tailwind-variants` for easy customization.

## Installation

Ensure you have the necessary dependencies:

```bash
npm install tailwind-variants lucide-react
```

(And ensure Tailwind CSS is configured in your project).

## Usage

```tsx
import { useState } from 'react';
import { DataGrid } from './components/data-grid';
import type { ColumnDef } from './components/data-grid/DataGrid.types';

interface User {
  id: number;
  name: string;
  role: string;
  active: boolean;
}

const columns: ColumnDef<User>[] = [
  { field: 'id', headerName: 'ID', width: 70, type: 'number' },
  { field: 'name', headerName: 'Name', width: 200, pinned: 'left' },
  { field: 'role', headerName: 'Role', width: 150 },
  { field: 'active', headerName: 'Active', type: 'checkbox', resizable: false }
];

const App = () => {
  const [rows, setRows] = useState<User[]>([
    { id: 1, name: 'John Doe', role: 'Admin', active: false },
    // ... more rows
  ]);

  return (
    <div style={{ height: 500 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        selectionField="active"
        onRowsChange={setRows}
        onRowChange={(updatedRow) => {
            setRows(prev => prev.map(r => r.id === updatedRow.id ? updatedRow : r));
        }}
      />
    </div>
  );
};
```

## API Reference

### DataGrid Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `rows` | `T[]` | **Required** | Array of data objects to render. |
| `columns` | `ColumnDef<T>[]` | **Required** | Configuration for columns. |
| `autoHeight` | `boolean` | `false` | If `true`, the grid adjusts its height to fit the content. |
| `autoFit` | `boolean` | `false` | If `true`, calculates column widths based on content (experimental). |
| `selectionField` | `keyof T` | `undefined` | Field in the row object used to track selection state (boolean). |
| `onRowChange` | `(row: T) => void` | `undefined` | Callback fired when a single row is modified (e.g., checkbox toggle). |
| `onRowsChange` | `(rows: T[]) => void` | `undefined` | Callback fired when multiple rows are modified (e.g., Select All). |
| `getRowClassName` | `(row: T) => string` | `undefined` | Function to apply custom classes to rows based on data. |
| `className` | `string` | `undefined` | Custom class for the DataGrid wrapper. |
| `slots` | `DataGridSlots` | `undefined` | Custom components (e.g., `columnMenu`). |
| `enablePagination` | `boolean` | `false` | Enables the built-in pagination component and logic. |
| `initialPageSize` | `number` | `10` | Initial number of items per page. |
| `pageSizeOptions` | `number[]` | `[10, 25, 50]` | Options for the page size select dropdown. |

### Column Definition (`ColumnDef<T>`)

| Property | Type | Description |
| :--- | :--- | :--- |
| `field` | `keyof T \| string` | The key in the data object to display. |
| `headerName` | `string` | Text to display in the column header. |
| `width` | `number` | Initial width of the column in pixels. |
| `minWidth` | `number` | Minimum width of the column. |
| `maxWidth` | `number` | Maximum width of the column. |
| `pinned` | `'left' \| 'right'` | Pins the column to the left or right side. |
| `type` | `ColumnType` | Data type for default formatting (`text`, `number`, `date`, `checkbox`, etc.). |
| `resizable` | `boolean` | **New**: Enable/disable resizing for this column. Default `true`. |
| `sortable` | `boolean` | Enable/disable sorting for this column. Default `true`. |
| `copyable` | `boolean` | Shows a copy button on hover. |
| `render` | `(params) => ReactNode` | Custom render function for the cell content. |
| `valueGetter` | `(row: T) => any` | Function to extract value if `field` is not direct. |
| `className` | `string` | Custom class for the column cells. |
| `ellipsis` | `boolean` | Truncate text with ellipsis. |

| `renderMenuItems` | `(params) => ReactNode` | Function to render custom items in the column menu. |
| `columnMenuConfig` | `object` | Configuration to show/hide default menu items (`showSort`, `showPin`, `showHide`, `showClose`). |

### Column Types

Supported types for `type` prop:
- `text` (default): Standard text rendering.
- `number`: Right-aligned, monospaced font.
- `currency`: Right-aligned, monospaced, currency formatting.
- `percent`: Right-aligned, monospaced, percentage formatting.
- `date` / `datetime` / `time`: Date and time formatting.
- `boolean`: Renders "Yes"/"No" or custom boolean text.
- `checkbox`: **Special Type**. Renders an interactive checkbox.
    - **Header**: Shows a "Select All" checkbox.
    - **Cell**: Shows a row selection checkbox.
    - **Interaction**: Toggles `selectionField` on the row.
- `status`: Centered, badge-like styling for status fields.
- `actions`: Centered, intended for action buttons.
- `user`: Bold text, intended for user names.
- `link`: Renders as an anchor tag.


## Keyboard Shortcuts & Interactions

-   **Sort**: Click header to sort. Click again to toggle direction.
-   **Resize**: Drag the right edge of the column header.
-   **Pin**: Use the column menu (3 dots) to pin/unpin columns.
-   **Copy**: Hover over a cell (if `copyable: true`) to see the copy button.
