# Update Log - DataGrid

Este arquivo rastreia alterações significativas na arquitetura e funcionalidade do componente DataGrid.

## [2025-12-16] - Safety & DX Update

### 🛡️ Segurança (Safety)
- **Loop Detection (Dev Mode)**: Implementado no hook `useDataGridQuery`.
    - **O que faz**: Monitora se a função `fetchData` passada via prop muda de referência a cada render.
    - **Comportamento**: Emite um `console.warn` amarelo em ambiente de desenvolvimento se detectar instabilidade.
    - **Objetivo**: Prevenir loops infinitos de requisição causados por esquecimento do `useCallback`.

### 📚 Documentação
- **`Docs.tsx`**: Adicionado alerta visual na seção de Performance sobre a obrigatoriedade do `useCallback`.
- **`doc.md`**: Sincronizado com o Docs.tsx para incluir o aviso sobre o Loop Detection.
- **`DATAGRID_MASTER_GUIDE.md`**: Adicionada seção "2.5 Safety & DX" detalhando a arquitetura de proteção.
- **Exemplos**:
    - `RealTableExample.tsx`: Adicionados comentários de alerta (`⚠️ IMPORTANTE`) na função `fetchUsers`.
    - `InvoiceTableExample.tsx`: Criado exemplo prático de integração com API de Faturas.

### 🐛 Correções Menores
- Ajuste de compatibilidade de dependências (`tailwind-merge` re-validado como peer-dependency obrigatória do `tailwind-variants`).

### 🏗️ Refatoração (Clean Architecture)
- **`DataGridCell`**: Implementada separação estrita entre Lógica e Apresentação.
    - Nova hook `useDataGridCell.ts`: Centraliza cálculos de estilo, eventos (copy/click) e extração de dados.
    - Componente `DataGridCell.tsx`: Reduzido a puramente declarativo (JSX).
- **`DataGridModalColumns`**: Logica complexa de Drag-and-Drop (DndKit) extraída.
    - Nova hook `useDataGridModalColumns.ts`: Gerencia sensores, reordenação de array e estado local.
    - Componente `DataGridModalColumns.tsx`: Focado apenas na composição visual do modal.
- **`DataGridModalFilters`**: Lógica de formulário extraída.
    - Nova hook `useDataGridModalFilters.ts`: Gerencia lista de filtros, adição/remoção dinâmica e validação.
    - Componente `DataGridModalFilters.tsx`: Focado apenas no layout.
- **`DataGridPagination`**: Lógica de cálculo extraída.
    - Nova hook `useDataGridPaginationLogic.ts`: Encapsula cálculo de páginas visíveis ('...'), totalizadores e handlers de input.
    - Componente `DataGridPagination.tsx`: Puramente visual.

### 🔌 API Standardization (Breaking Changes)
- **Props Renaming**:
    - `header` prop renamed to `toolbar` (aligned with market standards).
    - `DataGridHeader` component renamed to `DataGridToolbar`.
    - `headerConfig` in Context renamed to `toolbarConfig`.
- **Folder Structure**:
    - Flattened component structure: `components/common/simple-popover` moved to `components/simple-popover`.
    - Deleted `components/common` directory.
- **Refactoring**:
    - `DataGridHeader` usage fully replaced by `DataGridToolbar` in `DataGrid.tsx`.
    - Updated documentation and examples (`App.tsx`, `RealTableExample.tsx`, `Docs.tsx`) to use the new API.

## [2025-12-16] - Comprehensive API Standardization

### 💥 Breaking Changes (API Upgrade)
Objetivo: padronizar a API pública do componente para seguir os padrões de mercado e limpar props legadas.

- **Toolbar (Ex-Header)**:
    - Prop `header` renomeada para `toolbar`.
    - Tipo `DataGridHeaderConfig` renomeado para `DataGridToolbarConfig`.
    - Componente interno renomeado para `DataGridToolbar`.

- **Pagination Config**:
    - Removidas props soltas: `enablePagination`, `initialPageSize`, `pageSizeOptions`, `paginationMode`.
    - Introduzido objeto único `paginationConfig`:
        ```tsx
        paginationConfig={{
          enabled: true,
          initialPageSize: 10,
          mode: 'client', // ou 'server'
          pageSizeOptions: [10, 20, 50]
        }}
        ```

- **Selection Config**:
    - Removidas props soltas: `selectionActions`, `keepSelectionOnPageChange`, `enableSelectionGlobal`.
    - Introduzido objeto único `selectionConfig`:
        ```tsx
        selectionConfig={{
          enableGlobal: true,
          keepOnPageChange: true,
          actions: (ids, clear) => <MyCustomActions />
        }}
        ```

### 🧹 Limpeza & Refatoração
- **Componentes**: `DataGrid.tsx` agora consome exclusivamente os novos objetos de configuração.
- **Legacy Removal**: Props antigas (`selectionField`, etc.) completamente removidas dos tipos e da implementação.
- **Documentation**:
    - `Docs.tsx`: Exemplos e tabelas de referência atualizados.
    - `doc.md` e `DATAGRID_MASTER_GUIDE.md`: Guias atualizados para refletir a "Nova Era" da API.
- **Examples**:

## [2025-12-16] - Feature Extension: Export & Density

### 🚀 New Features
- **Data Export (CSV/Excel)**:
    - Implementada funcionalidade de exportação nativa via hook `useDataGridExport`.
    - Botão de download integrado automaticamente na Toolbar quando `enableExport: true`.
    - Suporta exportação de dados filtrados e ordenados (Client & Server side).
    - **Novidade**: Menu inteligente que oferece opções para exportar "Todos", "Filtrados" ou "Selecionados" quando aplicável.


- **Row Density Control**:
    - Novo controle de densidade das linhas: `compact`, `standard`, `comfortable`.
    - Seletor visual integrado na Toolbar (`enableDensitySelector`).
    - Estilização responsiva via variants global (`DataGridRow` e `DataGridCell`).
    - Estado gerenciado via Context para evitar prop drilling excessivo, mas com atualização otimizada.

- **Search Column Selector**:
    - Adicionado suporte `enableSearchColumnSelector` (boolean) no toolbar config.
    - Opcão para esconder o dropdown de seleção de coluna (`false`), usando `searchField` como padrão fixo.

### 🧹 Comprehensive Component Standardization (Final Sweep)

Following the "View / Controller / Model" and "Modular Styles" patterns, we audited and standardized the following components:

- **`DataGrid.tsx`**:
    - **Logic Extraction**: Moved inline export logic (filtering/selection) to `useDataGridExportLogic.ts`.
    - Result: Component is now a pure orchestrator.

- **`DataGridHeaderRow`**:
    - **Refactoring**: Created `useDataGridHeaderRow.ts` to encapsulate logic for "Select All" checkbox state and style wrappers.
    - Result: `DataGridHeaderRow.tsx` is now a clean functional component.

- **`FastFiltersRow`**:
    - **Refactoring**: Created `useFastFiltersRow.ts` to handle column filtering and display value formatting.
    - Result: View logic separate from business logic.

- **`DataGridToolbar`**:
    - **Refactoring**: Logic moved to `useDataGridToolbar.ts`. Styles centralized in `DataGridToolbar.styles.ts`.

- **Verified Components (Already Standardized)**:
    - `DataGridCell` (uses `useDataGridCell`)
    - `DataGridPagination` (uses `useDataGridPaginationLogic`)
    - `DataGridModalFilters` (uses `useDataGridModalFilters`)
    - `DataGridModalColumns` (uses `useDataGridModalColumns`)

All key components in `src/components` now adhere to strict architectural guidelines.

## [2025-12-16] - Documentation & Final Polish

### 📚 Documentation Update
- **`DATAGRID_MASTER_GUIDE.md`**: Updated Internal Structure map and API Props.
- **`Docs.tsx`**: Updated Props table with new Export/Density/Search features.
- **`doc.md`**: Synchronized with latest API changes.

### ✅ System Status
The DataGrid system is now fully standardized, modular, and documented.
- **Architecture**: View / Controller / Model.
- **Styling**: Tailwind Variants (Modular).
- **Logic**: Encapsulated in Hooks.
- **Safety**: Loop detection and type safety enabled.

## [2025-12-18] - Custom Column Filters Breakdown

### 🚀 New Feature
- **Custom Column Filters**:
    - Added `renderColumnFilter` prop to `ColumnDef` interface.
    - Allows full replacement of the default filter UI.
    - Provides `value`, `onChange`, and `onClose` to the custom component.
    - Ideal for DatePickers, RangeSliders, or complex inputs.

### 🏗️ Refactoring
- **`FastFilterMenu`**:
    - Logic extracted to `useFastFilterMenu.ts`.
### 🏃 Dynamic Fast Filters
- **New "+ Filtro" Button**:
    - Users can now dynamically add filters that are not visible by default.
    - Added `filterVisibleInitially` prop to `ColumnDef`.
    - Created `FastFiltersAddMenu` component for searching and adding filters implementation.
    - Updated `useFastFiltersRow` to manage visibility state.


## [2025-12-18] - Final Polish & Code Health Audit

### 🛠️ Code Maintenance
- **Review Minucioso (Audit)**: Varredura completa em todos os arquivos `src/components/data-grid`.
- **Formatting**:
  - Adicionado `valueFormatter` no `ColumnDef` para suportar busca em campos customizados (ex: buscar "Sim" quando o valor é `true`).
  - Integrada lógica no `dataUtils.ts` para usar este formatter.
- **Fast Filters**:
  - Botão **"Limpar filtros"** agora usa estilos centralizados (`FastFiltersRow.styles.ts`).
  - Funcionalidade "Clear All" completamente implementada.
- **Fixes**:
  - Caminhos de importação corrigidos (`../../DataGrid.types`).
  - Exportação de tipos padronizada.

### 📚 Documentation
- Criada pasta `/src/Docs` para centralizar conhecimentos.
- Gerado `AUDIT_REPORT.md` detalhando a saúde do código.
- Atualizado `DATAGRID_MASTER_GUIDE.md` com as novas capacidades de filtro.

## [2025-12-21] - Docs "Premium" & UX Improvements

### 📚 Documentation Overhaul (Docs.tsx)
- **Portal Mode**: Refatorado `Docs.tsx` para um layout de portal com sidebar lateral fixa.
- **Deep Dive Content**:
  - Adicionada seção "Pitch" (Por que DataGrid?).
  - Restaurada e expandida seção de **AI Prompts**.
  - Diagramas explicativos de **Server-Side Integration**.
  - Detalhamento de **Slots** e **Arquitetura**.

### 🎨 Fast Filters Experience (UX)
- **"+ Filtro" Experience**:
  - Implementado botão `+ Filtro` para adicionar colunas não visíveis inicialmente.
  - Prop `filterVisibleInitially` adicionada ao `ColumnDef`.
  - Auto-foco e prevenção de fechamento do popover ao adicionar filtro.
- **Persistence**:
  - Integração total com `persistId`. Agora filtros adicionados dinamicamente sobrevivem ao F5.

### ⚙️  New Props (DataGrid & ColumnDef)
- **DataGrid**:
  - `persistId`: ID único para salvar estado (filtros, sort, pagination) no localStorage.
- **ColumnDef**:
  - `resizable`: Controle de redimensionamento por coluna.
  - `enableColumnMenu`: Controle do menu de contexto (três pontinhos).
  - `defaultFilterValue`: Define valor inicial para filtros rápidos.
