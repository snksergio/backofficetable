
# DataGrid Master Guide

## Visão Geral e Arquitetura

O **Enhanced DataGrid** é um componente corporativo construído sobre princípios de alta performance, modularidade e escalabilidade.

### Arquitetura "Maestro"
O componente segue o padrão de separação rigorosa entre Lógica e Apresentação:
- **`DataGrid.tsx` (Maestro)**: Orquestra tudo. Não implementa lógica complexa. Apenas conecta Hooks a Componentes.
- **Hooks (`hooks/`)**: Encapsulam toda a regra de negócio (Filtro, Sort, Paginação, Modos Server/Client).
- **Context (`context/`)**: Distribui estado global para evitar Prop Drilling, mas é otimizado com `React.memo` na ponta (Rows) para evitar re-renders em massa.
- **Componentes (`components/`)**: Componentes visuais "burros" que apenas renderizam props.

### Padrão de Arquivos (Gold Standard)
Todo sub-componente (ex: `DataGridPagination`) DEVE seguir a estrutura de 4 arquivos:
1.  **`Index.ts`**: Exporta o componente, estilos e tipos.
2.  **`[Name].tsx`**: Lógica de renderização.
3.  **`[Name].types.ts`**: Interfaces TypeScript estritas (sem `any`).
4.  **`[Name].styles.ts`**: Estilização com `tailwind-variants`.

---

## Modos de Operação (CRÍTICO)

O DataGrid opera em dois modos mutuamente exclusivos. A detecção é automática baseada na presença da prop `fetchData`.

### 1. Modo Client-Side (Smart Mode)
Ativado quando você passa apenas `rows` (array completo).
- **Funcionamento**: O Hook `useDataGridProcessor` assume o controle.
- **Features**: Filtragem, Busca, Ordenação e Paginação são feitos localmente no navegador.
- **Uso**: Ideal para datasets pequenos/médios (< 5.000 linhas) já carregados na memória.

### 2. Modo Server-Side (Enterprise Mode)
Ativado quando você passa `fetchData`.
- **Funcionamento**: O Hook `useDataGridQuery` controla o fluxo.
- **Responsabilidade**: O DataGrid **delegan** a lógica. Ele diz: "Preciso da página 2, ordenada por nome". Sua função `fetchData` deve ir ao servidor e devolver `data` e `total`.
- **Importante**: `sortMode` e `paginationMode` devem ser configurados como `'server'` (embora o Grid tente inferir, seja explícito).

---

## API Reference

### Principais Props (`DataGridProps<T>`)

| Prop | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `rows` | `T[]` | `[]` | No modo Client: todos os dados. No modo Server: ignorado (usar o retorno de fetchData). |
| `persistId` | `string` | `undefined` | ID único para salvar filtros, sort e paginação no LocalStorage. |
| `columns` | `ColumnDef<T>[]` | **Obrigatório** | Definição das colunas. |
| `fetchData` | `(params) => Promise` | `undefined` | Função que transformao Grid em Server-Side. **Deve ser memoizada com useCallback**. |
| `loading` | `boolean` | `false` | Força estado de carregamento visual via Skeleton/Spinner. |
| `toolbar` | `DataGridToolbarConfig` | `{}` | Configurações da barra de topo (`enableSearch`, `enableFilters`, `title`). |
| `getRowId` | `(row) => id` | `row.id` | Retorna ID único da linha. Vital para seleção. |
| `selectionModel` | `GridSelectionState` | `undefined` | Estado controlado da seleção ({ type, ids }). |
| `onSelectionModelChange`| `(model) => void` | `undefined` | Callback de mudança de seleção. |
| `selectionField`| `string` | `undefined` | **DEPRECATED**. Use `selectionModel`. |

### Definição de Colunas (`ColumnDef<T>`)

Configuração vital para o funcionamento correto.

```typescript
interface ColumnDef<T> {
  field: keyof T | string;  // Caminho do dado (ex: 'user.name')
  headerName: string;       // Título da coluna
  type?: 'text' | 'number' | 'date' | 'boolean' | 'actions' | 'status';
  valueFormatter?: (value: any) => string; // [NOVO] Transforma dado para Busca/Export (ex: (v) => v ? 'Ativo' : 'Inativo')
  width?: number;           // Largura fixa (px)
  minWidth?: number;        // Largura mínima (flex)
  flex?: number;            // Fator de crescimento (ex: 1 ocupa o resto)
  pinned?: 'left' | 'right';// Fixa a coluna
  // Se false, o filtro começa oculto e só aparece ao clicar em "+ Filtro" ou se tiver valor ativo
  filterVisibleInitially?: boolean; 
  render?: (params) => ReactNode; // Renderização customizada (Badge, Imagem, etc)
  enableColumnFilter?: boolean; // Ativa Fast Filter (Chip) no topo desta coluna
  enableColumnMenu?: boolean; // Ativa menu de 3 pontos
  resizable?: boolean; // Permite redimensionar a coluna (default: true)
  defaultFilterValue?: any; // Valor inicial do filtro
  // Renderizador customizado COMPLETO para o filtro (ex: DatePicker, RangeSlider)
  renderColumnFilter?: (params: { value, onChange, onClose }) => ReactNode;
}
```

### 🧠 Column Type Registry (Extensibilidade)

O DataGrid utiliza um **Strategy Pattern** para gerenciar tipos de colunas. Em vez de switches hardcoded, cada tipo (`text`, `number`, `date`, `select`) é uma estratégia isolada registrada em uma biblioteca central.

#### Arquitetura
- **Definições**: `src/components/data-grid/column-types/definitions/*.tsx`
- **Registro**: `src/components/data-grid/column-types/ColumnTypeRegistry.ts`

#### Como criar um Novo Tipo (ex: 'identidade')

**1. Crie a Definição (`IdentityColumnType.tsx`)**
```tsx
export const IdentityColumnType: ColumnTypeDefinition = {
    type: 'identity',
    // 1. Input para o Query Builder (Modal)
    renderFilterInput: (props) => (
        <input 
            type="text" 
            placeholder="000.000.000-00" 
            className="border p-2 rounded bg-blue-50"
            value={props.itemValue} 
            onChange={e => props.onChange(e.target.value)} 
        />
    ),
    // 2. Input para o Fast Filter (Popover)
    renderFastFilterInput: (props) => (
        <div className="p-2 w-[300px]">
            <span className="text-xs text-gray-500">Documento de Identidade:</span>
            <input 
                autoFocus 
                className="w-full border p-2 rounded"
                value={props.value} 
                onChange={e => props.onChange(e.target.value)} 
            />
        </div>
    )
};
```

**2. Registre (`ColumnTypeRegistry.ts`)**
```typescript
columnTypeRegistry.register(IdentityColumnType);
```

**3. Use (`ColumnDef`)**
```typescript
{ field: 'doc', headerName: 'Documento', filterType: 'identity' }
```


### Controle Imperativo (`DataGridRef`)

Use `useRef<DataGridRef>` para acessar métodos internos.

- **`refresh()`**: Força uma nova chamada a `fetchData`. Útil após criar/editar registros em modais externos. Só funciona em modo Server-Side.

---

### Fast Filters Row
- **Clear All**: O botão "Limpar filtros" aparece automaticamente quando há filtros ativos.
- **Custom Input**: Use `renderFastFilterInput` para substituir o input padrão do chip.

---

## Exemplos de Código

### Cenário 1: Tabela Simples (Client-Side)

```tsx
import { DataGrid, type ColumnDef } from './components/data-grid/DataGrid';

interface User { id: number; name: string; role: string; }

// 1. Defina colunas estáticas (fora do componente ou useMemo)
const columns: ColumnDef<User>[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Nome', flex: 1 },
  { field: 'role', headerName: 'Cargo', type: 'text' },
];

const users = [{ id: 1, name: 'Alice', role: 'Admin' }, { id: 2, name: 'Bob', role: 'User' }];

export const SimpleList = () => (
  // O DataGrid cuida de tudo: sort, filter, paginate localmente.
  <DataGrid 
    rows={users} 
    columns={columns}
    toolbar={{ enableSearch: true, title: 'Usuários' }}
    paginationConfig={{ enabled: true }}
  />
);
```

### Cenário 2: Tabela Server-Side (Real World)

```tsx
import { useCallback, useRef } from 'react';
import { DataGrid, type DataGridRef } from './components/data-grid/DataGrid';

export const ServerList = () => {
  const tableRef = useRef<DataGridRef>(null);

  // CRÍTICO: Use useCallback para evitar loops infinitos
  const fetchUsers = useCallback(async (params) => {
    const { page, pageSize } = params.pagination;
    const { search } = params;
    
    // Converte params do Grid para params da sua API
    const url = \`/api/users?page=\${page}&limit=\${pageSize}&q=\${search}\`;
    const res = await fetch(url).then(r => r.json());
    
    return {
      data: res.items, // Array de itens da página
      total: res.totalCount // Total global para calcular paginação
    };
  }, []);

  return (
    <>
      <button onClick={() => tableRef.current?.refresh()}>Recarregar</button>
      
      <DataGrid
        ref={tableRef}
        fetchData={fetchUsers}
        columns={columns}
        toolbar={{ enableSearch: true }}
        paginationConfig={{
          enabled: true,
          initialPageSize: 10
        }}
      />
    </>
  );
};
```

### Cenário 3: Customização de Célula

```tsx
const columns = [
  { 
    field: 'status', 
    headerName: 'Status',
    // Custom Render
    render: ({ value }) => (
      <span className={value === 'active' ? 'text-green-600' : 'text-red-600'}>
        {value.toUpperCase()}
      </span>
    )
  }
];
```

---

## Guia de Estilização

Utilizamos **Tailwind Variants (`tv`)** para estilização tipada e variantes.
Evite CSS modules ou classes inline complexas no componente.

### Exemplo de `.styles.ts`
```ts
import { tv } from 'tailwind-variants';

export const feedbackStyles = tv({
    slots: {
        container: 'flex flex-col items-center justify-center p-8 text-gray-400',
        icon: 'w-12 h-12 mb-4 opacity-50',
        text: 'text-sm font-medium'
    },
    variants: {
        variant: {
            loading: { icon: 'animate-spin text-blue-500' },
            error: { icon: 'text-red-500' }
        }
    }
});
```

---

## Engenharia e Estrutura Interna

Esta seção documenta o "Cérebro" do DataGrid para mantenedores e IAs futuras.

### 1. Mapa da Estrutura de Arquivos

```
src/components/
├── data-grid/            
│   ├── context/          # Gestão de Estado Global
│   ├── hooks/            # Lógica de Negócio (Hooks Customizados)
│   ├── column-types/     # Registry de Tipos de Coluna
│   ├── internal/         # Sub-componentes Internos
│   │   ├── data-grid-toolbar/  
│   │   ├── data-grid-header-row/
│   │   ├── data-grid-row/      
│   │   ├── data-grid-cell/     
│   │   ├── fast-filters-row/   
│   │   └── ...
│   ├── DataGrid.tsx      # Ponto de Entrada (Orchestrator)
│   └── DataGrid.types.ts # Interfaces e Tipos Globais
├── icons/                # Biblioteca de Ícones
└── ...
```

### 2. O Cérebro (Hooks Detalhados)

Cada Hook tem uma Responsabilidade Única (SRP):

- **`useDataGridQuery`**: Gerenciador de Estado Server-Side.
  - *Função*: Controla `loading`, `error` e chama `fetchData`. Guarda o estado dos dados retornados do servidor.
  - *Detalhe*: Possui **Debounce automátio de 500ms** para buscas. Possui um mecanismo interno `refreshKey` para forçar recarregamento.

- **`useDataGridProcessor`**: Pipeline de Dados Client-Side.
  - *Função*: Recebe `rows` brutas e aplica: Filtro -> Busca -> Ordenação -> Paginação.
  - *Otimização*: Utiliza `useMemo` em cascata. Se você mudar a página, ele **não** re-executa o Filtro ou Sort.

- **`useDataGridFastFilters`**: Gerenciador de Filtros Rápidos (Chips).
  - *Função*: Gerencia estado de filtros clicáveis na topo da tabela.
  - *Integração*: Seus filtros são "merged" com os filtros do modal avançado automaticamente.

- **`useDataGridColumns`**: Gerenciador de Layout.
  - *Função*: Calcula larguras reais (em pixels), gerencia colunas "pinned" (fixas) e colunas ocultas.

- **`useDataGridSelection`**: Gerenciador de Seleção.
  - *Função*: Gerencia estado Include/Exclude.
  - *Feature*: Suporta "Select All" global (todos os dados server-side) sem carregar todas as linhas.

### 3. Fluxo de Dados e Contexto

O `DataGrid` utiliza um padrão de Contexto Híbrido para performance máxima:

1.  **Provider Central**: O `DataGridProvider` em `DataGrid.tsx` recebe todos os estados e funções dos hooks acima.
2.  **Anti-Thrashing (Memoização)**: O valor do Contexto (`contextValue`) é **estritamente memoizado** com `useMemo`. Ele só muda se uma prop vital mudar.
    - *Por que?* Se o objeto de contexto for recriado a cada render, **toda a tabela** piscaria (re-render) sempre que você digitasse uma letra na busca.
3.  **Proteção na Ponta (`DataGridRow`)**:
    - O componente `DataGridRow` foi **desacoplado** do Contexto. Ele não usa `useContext` diretamente para dados vitais.
    - Em vez disso, recebe dados via **props** (`columns`, `styles`, `isSelected`).
    - É protegido com `React.memo`. Resultado: Se você selecionar a linha 1, a linha 2 **não** renderiza novamente.

### 4. Padrão de Componentes (Gold Standard)

Para manter a sanidade em um projeto complexo:

- **Separação Style/Logic**: Nunca escreva `className="text-red-500 p-4 absolute..."` dentro do componente.
  - *Certo*: Use `const { base, icon } = myComponentStyles();` vindo de um arquivo `.styles.ts`. Mantenha o JSX limpo e semântico.
- **Types Isolados**: Interfaces ficam em `.types.ts`. Isso evita que importar um Tipo cause um ciclo de importação de Componentes.
- **Index Exports**: Sempre exporte via `index.ts` para encapsular a pasta. O consumidor importa de `../data-grid-row`, não de `../data-grid-row/DataGridRow`.
