# Documentação DataGrid (Enterprise v2.1)

O componente de tabela definitivo para suas aplicações React. Rápido, flexível e "battery-included".

---

## 📌 Por que este DataGrid?
Esqueça tabelas HTML puras ou bibliotecas pesadas.
- **⚡ Alta Performance:** Virtualização e memoização garantem 60fps.
- **🎨 Fast Filters UX:** Interface de chips estilo Gmail/Jira.
- **💾 Persistência Automática:** Salva filtros e ordenação no LocalStorage.
- **🔌 Backend Agnostic:** Funciona com Arrays ou APIs complexas (Server-Side).

---

## 🚀 Quick Start

```tsx
import { DataGrid } from './components/data-grid/DataGrid';

const columns = [
    { field: 'name', headerName: 'Nome', flex: 1 },
    { field: 'role', headerName: 'Cargo', enableColumnFilter: true }, // Cria Chip
];

const rows = [
    { id: 1, name: 'Alice', role: 'Dev' },
    { id: 2, name: 'Bob', role: 'Design' },
];

export const App = () => (
    <div className="h-[600px]">
        <DataGrid 
            rows={rows} 
            columns={columns}
            persistId="my-grid-v1" // <--- Persistência mágica
            toolbar={{ title: "Team", enableSearch: true }}
        />
    </div>
);
```

---

## 📚 API Reference

### DataGridProps (Raiz)
| Prop | Tipo | Descrição |
| :--- | :--- | :--- |
| `rows` | `T[]` | Array de dados. Obrigatório ter `id`. |
| `columns` | `ColumnDef[]` | Definição das colunas. |
| `persistId` | `string` | ID único para salvar estado no LocalStorage. |
| `loading` | `boolean` | Mostra spinner/skeleton. |
| `autoHeight` | `boolean` | Remove scroll interno, cresce com conteúdo. |
| `density` | `'compact' \| 'standard'` | Espaçamento das linhas. |
| `toolbar` | `ToolbarConfig` | `{ title, enableSearch, enableExport, ... }` |

### ColumnDef (Colunas)
| Prop | Padrão | Descrição |
| :--- | :--- | :--- |
| `field` | - | Caminho do dado (ex: `user.name`). |
| `headerName` | - | Título visível. |
| `width` / `flex` | - | Largura fixa ou flexível. |
| `enableColumnFilter` | `false` | Ativa o **Fast Filter (Chip)**. |
| `filterVisibleInitially` | `true` | Se `false`, filtro fica oculto no botão "+ Filtro". |
| `defaultFilterValue` | - | Valor inicial do filtro. |
| `render` | - | `(params) => ReactNode`. Customiza a célula. |
| `resizable` | `true` | Permite redimensionar. |

---

## 🎨 Fast Filters (Chips)
Uma interface moderna de filtros.
- **Ativar:** `enableColumnFilter: true` na coluna.
- **Opções:** Passe `filterOptions: [{ label, value }]` para dropdowns.
- **Oculto:** Use `filterVisibleInitially: false` para filtros que o usuário adiciona sob demanda clicando no botão **"+ Filtro"**.

```tsx
{
    field: 'status',
    headerName: 'Status',
    enableColumnFilter: true,
    filterVisibleInitially: false, // Começa escondido
    filterOptions: [{ label: 'Ativo', value: 'active' }]
}
```

---

## 💾 Persistência (LocalStorage)
O DataGrid possui um "cérebro" que salva o estado automaticamente.
Ao adicionar `persistId="users-v1"`, ele salva:
1.  Filtros ativos.
2.  Ordenação.
3.  Página atual e tamanho.
4.  Densidade.

> **Dica:** Para resetar o cache de todos os usuários (ex: breaking change), basta mudar o ID para `v2`.

---

## 🔌 Integração Server-Side
O DataGrid segue o padrão **"Dumb UI, Smart Parent"**.
1.  **Eventos:** O Grid avisa quando a página muda (`onPaginationModelChange`).
2.  **Fetch:** O Pai busca os dados na API.
3.  **Props:** O Pai atualiza `rows` com os novos dados.

```tsx
const fetchData = useCallback(async (params) => {
    // params contém { pagination, sort, filters }
    // Transforme em Query String: ?page=1&sort=name...
    const data = await api.get(queryString);
    return { data: data.items, total: data.total };
}, []);

<DataGrid 
    fetchData={fetchData} 
    paginationMode="server" 
/>
```

---

## 🤖 AI Prompts (Acelerador)
Copie e cole para sua IA favorita criar telas:

**Prompt: Criar Tabela**
> "Aja como um sênior React Developer. Com base no `DataGrid.types.ts`, crie uma tela para listar [ENTIDADE].
> Requisitos:
> 1. Colunas: [LISTA].
> 2. Habilite Fast Filters para [COLUNAS].
> 3. Adicione persistência com ID '[ID]'.
> 4. Use dados mockados."

---

## 🏗️ Arquitetura
- **Rendering:** Virtualizado (apenas o que está na tela é renderizado).
- **State:** Gerenciado via Hooks customizados (`useDataGridController`).
- **Styles:** Tailwind Variants (Modular e Performático).
