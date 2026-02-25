import React, { useState } from 'react';

export const Docs = () => {
    const [activeSection, setActiveSection] = useState('intro');

    const scrollTo = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const Link = ({ id, children }: { id: string, children: React.ReactNode }) => (
        <button
            onClick={() => scrollTo(id)}
            className={`block w-full text-left px-4 py-2 text-sm rounded transition-colors ${activeSection === id
                ? 'bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-500'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
        >
            {children}
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-white border-r border-gray-200 fixed h-full overflow-y-auto hidden md:block shadow-sm z-10">
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">DataGrid Docs</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold">Stable</span>
                        <span className="text-xs text-gray-500">v2.1.0 Enterprise</span>
                    </div>
                </div>
                <nav className="px-4 py-6 space-y-8">
                    <div>
                        <h3 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Visão Geral</h3>
                        <div className="space-y-1">
                            <Link id="intro">Introdução & Pitch</Link>
                            <Link id="quick-start">Quick Start</Link>
                            <Link id="architecture">Arquitetura</Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">API Reference</h3>
                        <div className="space-y-1">
                            <Link id="props">DataGridProps (Root)</Link>
                            <Link id="columns">Colunas (ColumnDef)</Link>
                            <Link id="toolbar">Toolbar & Slots</Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Funcionalidades</h3>
                        <div className="space-y-1">
                            <Link id="fast-filters">Fast Filters (Chips)</Link>
                            <Link id="selection">Seleção Checkbox</Link>
                            <Link id="persistence">Persistência (LocalStorage)</Link>
                            <Link id="server-side">Server-Side Integration</Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Ecossistema</h3>
                        <div className="space-y-1">
                            <Link id="ai-prompts">🤖 AI Prompts (Copy/Paste)</Link>
                            <Link id="performance">Performance & Best Practices</Link>
                        </div>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8 lg:p-12 max-w-5xl mx-auto">

                {/* Introduction Section (The Pitch) */}
                <Section id="intro" title="Por que usar este DataGrid?">
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        Esqueça tabelas HTML puras ou bibliotecas pesadas como MUI X (na versão free).
                        Nosso DataGrid foi construído do zero para ser <strong>o padrão-ouro</strong> da empresa.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <BenefitCard
                            icon="🚀"
                            title="Zero Config, Máximo Poder"
                            desc="Paginação, ordenação e filtros client-side funcionam 'out of the box'. Basta passar rows e columns."
                        />
                        <BenefitCard
                            icon="🧠"
                            title="Inteligente & Persistente"
                            desc="Seus usuários nunca mais perderão o filtro aplicado ao dar F5. Ele salva estado automaticamente."
                        />
                        <BenefitCard
                            icon="🎨"
                            title="Fast Filters UX"
                            desc="Esqueça modais de filtro complexos. Usamos 'Chips' (tags) estilo Gmail para filtragem rápida e intuitiva."
                        />
                        <BenefitCard
                            icon="🔌"
                            title="Backend Agnostic"
                            desc="Funciona com Arrays locais ou APIs complexas (Server-Side) com a mesma interface simples."
                        />
                    </div>
                </Section>

                {/* Quick Start */}
                <Section id="quick-start" title="Quick Start">
                    <p className="mb-4 text-gray-600">
                        O exemplo mínimo para ter uma tabela funcional em 30 segundos.
                    </p>
                    <CodeBlock title="App.tsx" code={`import { DataGrid } from './components/data-grid/DataGrid';

// 1. Defina as colunas
const columns = [
    { field: 'name', headerName: 'Nome Completo', flex: 1 },
    { field: 'role', headerName: 'Cargo', enableColumnFilter: true }, // <--- Cria o filtro rápido
    { field: 'active', headerName: 'Status', type: 'boolean', width: 100 }
];

// 2. Tenha seus dados (deve ter 'id')
const rows = [
    { id: 1, name: 'Alice Silva', role: 'Dev', active: true },
    { id: 2, name: 'Bob Santos', role: 'Design', active: false },
];

export const MinhaTela = () => (
    <div className="h-[600px] w-full">
        <DataGrid 
            rows={rows} 
            columns={columns}
            toolbar={{ title: "Funcionários", enableSearch: true }}
            persistId="tabela-funcionarios-v1" // <--- Ativa persistência mágica
        />
    </div>
);`} />
                </Section>

                {/* Architecture */}
                <Section id="architecture" title="Arquitetura do Componente">
                    <p className="mb-6 text-gray-600">
                        O DataGrid foi desenhado com o padrão "Compound Component" + "Headless State".
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <h4 className="font-bold text-gray-800 mb-4">Estrutura de Diretórios</h4>
                        <pre className="text-sm text-gray-700 font-mono">
                            {`src/components/data-grid/
├── DataGrid.tsx          # Componente Raiz (Orquestrador)
├── DataGrid.types.ts     # Typings (Single source of truth)
├── hooks/
│   ├── useDataGridController.ts # Lógica de estado e efeitos
│   └── usePagination.ts         # Hook isolado de paginação
├── internal/             # Sub-componentes (não exportados)
│   ├── header/           
│   ├── row/
│   └── filters/
└── index.ts              # Public API`}
                        </pre>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                        <strong>Design Decision:</strong> Isolamos a lógica complexa (filtros, sort, paginação) em hooks customizados (`useDataGridController`) para manter o componente de UI limpo e testável.
                    </p>
                </Section>

                <hr className="my-16 border-gray-200" />

                {/* API Reference: Props */}
                <Section id="props" title="DataGridProps">
                    <p className="mb-6 text-gray-600">
                        Propriedades aceitas pelo componente raiz <code>{`<DataGrid />`}</code>.
                    </p>

                    <h3 className="text-lg font-bold text-gray-800 mb-2 mt-8">Essenciais</h3>
                    <Table>
                        <HeaderRow>
                            <Th>Prop</Th>
                            <Th>Tipo</Th>
                            <Th>Descrição</Th>
                        </HeaderRow>
                        <tbody>
                            <Row prop="rows" type="T[]" desc="Array de dados principal. Obrigatório conter propriedade 'id' única." />
                            <Row prop="columns" type="ColumnDef[]" desc="Definição da estrutura e comportamento das colunas." />
                            <Row prop="loading" type="boolean" desc="Se true, exibe estado de carregamento (Skeleton/Spinner)." />
                        </tbody>
                    </Table>

                    <h3 className="text-lg font-bold text-gray-800 mb-2 mt-8">Configuração & Comportamento</h3>
                    <Table>
                        <HeaderRow>
                            <Th>Prop</Th>
                            <Th>Tipo</Th>
                            <Th>Descrição</Th>
                        </HeaderRow>
                        <tbody>
                            <Row prop="persistId" type="string" desc="ID único (namespace) para salvar filtros/sort no LocalStorage. Se omitir, não persiste." />
                            <Row prop="autoHeight" type="boolean" desc="Se true, remove o scroll interno e cresce conforme o conteúdo." />
                            <Row prop="autoFit" type="boolean" desc="Ativa o cálculo automático de largura das colunas baseado no conteúdo." />
                            <Row prop="density" type="'compact' | 'standard'" desc="Controla o espaçamento vertical das células." />
                            <Row prop="getRowId" type="(row) => id" desc="Função para extrair o ID, caso seus dados usem '_id' ou 'cod'." />
                            <Row prop="getRowClassName" type="(params) => string" desc="Classe condicional por linha (ex: destacar status)." />
                            <Row prop="className" type="string" desc="Classe CSS para o container externo." />
                            <Row prop="renderLoading" type="ReactNode" desc="Componente customizado para loading overlay." />
                            <Row prop="renderEmpty" type="ReactNode" desc="Componente customizado para quando não há dados (rows=[])." />
                            <Row prop="renderNoResults" type="ReactNode" desc="Componente customizado para busca/filtro sem resultados." />
                        </tbody>
                    </Table>

                    <h3 className="text-lg font-bold text-gray-800 mb-2 mt-8">Controle de Estado (Opcional)</h3>
                    <Table>
                        <HeaderRow>
                            <Th>Prop</Th>
                            <Th>Tipo</Th>
                            <Th>Descrição</Th>
                        </HeaderRow>
                        <tbody>
                            <Row prop="paginationModel" type="{ page, pageSize }" desc="Controle total da paginação." />
                            <Row prop="onPaginationModelChange" type="(model) => void" desc="Callback de mudança de página." />
                            <Row prop="selectionModel" type="{ type, ids }" desc="Controle total da seleção de linhas." />
                            <Row prop="onRowChange" type="(row) => void" desc="Callback disparado ao editar uma linha (se editável)." />
                        </tbody>
                    </Table>

                    <h3 className="text-lg font-bold text-gray-800 mb-2 mt-8">Configurações Avançadas (Objetos)</h3>
                    <Table>
                        <HeaderRow>
                            <Th>Prop</Th>
                            <Th>Tipo</Th>
                            <Th>Descrição</Th>
                        </HeaderRow>
                        <tbody>
                            <Row prop="sortMode" type="'client' | 'server'" desc="Define quem ordena. 'server' ignora a lógica local." />
                            <Row prop="paginationConfig" type="{ mode, pageSizeOptions }" desc="Configuração fina da paginação (server/client, array de tamanhos)." />
                            <Row prop="selectionConfig" type="{ enabled, mode }" desc="Configuração de comportamento da seleção (inclusão/exclusão)." />
                            <Row prop="initialFilterModel" type="FilterModel" desc="Filtros iniciais aplicados (se não houver persistência)." />
                        </tbody>
                    </Table>
                </Section>

                {/* Toolbar & Slots */}
                <Section id="toolbar" title="Toolbar & Custom Slots">
                    <p className="mb-6 text-gray-600">
                        O DataGrid é flexível. Você pode injetar componentes customizados ou configurar a Toolbar padrão.
                    </p>

                    <h3 className="font-bold text-gray-800 mt-6 mb-2">Toolbar Config</h3>
                    <CodeBlock code={`<DataGrid
    toolbar={{
        title: "Relatórios",
        enableSearch: true,
        searchPlaceholder: "Buscar por nome...",
        enableFilters: true, // Botão de filtros globais
        enableDensity: true, // Botão de compactar
        enableExport: true,  // Botão de exportar CSV
        endContent: <Button>Novo Item</Button> // Injeta no canto direito
    }}
/>`} />

                    <h3 className="font-bold text-gray-800 mt-6 mb-2">Slots (Avançado)</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Substitua partes inteiras da UI interna por componentes seus.
                    </p>
                    <Table>
                        <HeaderRow>
                            <Th>Slot</Th>
                            <Th>Tipo</Th>
                            <Th>Uso</Th>
                        </HeaderRow>
                        <tbody>
                            <Row prop="slots.columnMenu" type="Component" desc="Substitui o menu de 3 pontinhos do header." />
                            <Row prop="slots.loadingOverlay" type="Component" desc="Customiza o spinner de loading." />
                            <Row prop="slots.noResultsOverlay" type="Component" desc="Customiza a tela de 'Nenhum resultado'." />
                        </tbody>
                    </Table>
                </Section>

                {/* API Reference: Columns */}
                <Section id="columns" title="Definição de Colunas (ColumnDef)">
                    <p className="mb-6 text-gray-600">
                        O objeto de coluna é onde a mágica acontece. Você controla renderização, filtros e layout por aqui.
                    </p>

                    <h3 className="font-bold text-gray-800 mt-6 mb-2">Básico</h3>
                    <Table>
                        <HeaderRow>
                            <Th>Prop</Th>
                            <Th>Tipo</Th>
                            <Th>Descrição</Th>
                        </HeaderRow>
                        <tbody>
                            <Row prop="field" type="string" desc="Caminho do dado (ex: 'user.address.city')." />
                            <Row prop="headerName" type="string" desc="Título visível no cabeçalho." />
                            <Row prop="width" type="number" desc="Largura fixa em pixels." />
                            <Row prop="flex" type="number" desc="Fator flex (ex: 1) para ocupar espaço restante." />
                            <Row prop="pinned" type="'left' | 'right'" desc="Fixa a coluna na lateral ao rolar horizontalmente." />
                        </tbody>
                    </Table>

                    <h3 className="font-bold text-gray-800 mt-6 mb-2">Features & Controles</h3>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 text-sm text-yellow-800">
                        💡 <strong>Dica:</strong> A maioria destas props é <code>true</code> por padrão. Você usa para <em>desativar</em> comportamentos.
                    </div>
                    <Table>
                        <HeaderRow>
                            <Th>Prop</Th>
                            <Th>Default</Th>
                            <Th>Descrição</Th>
                        </HeaderRow>
                        <tbody>
                            <Row prop="sortable" type="true" desc="Permite ordenar clicando no header." />
                            <Row prop="resizable" type="true" desc="Permite arrastar a borda para redimensionar." />
                            <Row prop="filterable" type="true" desc="Permite filtrar pelo menu de contexto." />
                            <Row prop="enableColumnMenu" type="true" desc="Exibe o menu de 3 pontinhos (⋮) com opções de coluna." />
                        </tbody>
                    </Table>

                    <h3 className="font-bold text-gray-800 mt-6 mb-2">Fast Filters (Chips)</h3>
                    <p className="text-sm text-gray-600 mb-2">Configurações para os filtros rápidos no topo da tabela.</p>
                    <Table>
                        <HeaderRow>
                            <Th>Prop</Th>
                            <Th>Tipo</Th>
                            <Th>Descrição</Th>
                        </HeaderRow>
                        <tbody>
                            <Row prop="enableColumnFilter" type="boolean" desc="Ativa o Chip de filtro rápido para esta coluna." />
                            <Row prop="filterType" type="enum" desc="'text', 'select', 'multiSelect', 'date', 'boolean'." />
                            <Row prop="filterOptions" type="array" desc="Opções para selects: [{ label: 'Ativo', value: 'active' }]." />
                            <Row prop="filterVisibleInitially" type="boolean" desc="Se false, o filtro começa oculto (acessível via botão '+ Filtro')." />
                            <Row prop="defaultFilterValue" type="any" desc="Valor inicial aplicado automaticamente." />
                        </tbody>
                    </Table>
                </Section>

                {/* Fast Filters Section */}
                <Section id="fast-filters" title="Fast Filters (Chips)">
                    <p className="text-gray-600 mb-4">
                        Uma interface moderna de filtros baseada em "Chips" (tags) no topo da tabela, similar ao Gmail/Jira.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                        <h4 className="font-bold text-blue-800">Como usar</h4>
                        <p className="text-sm text-blue-700 mt-1">
                            Adicione <code className="font-bold">enableColumnFilter: true</code> na coluna.
                            Para dropdowns, forneça também <code className="font-bold">filterOptions</code>.
                        </p>
                    </div>
                    <h4 className="font-bold text-gray-800 mt-4 mb-2">Botão "+ Filtro"</h4>
                    <p className="text-gray-600 text-sm mb-4">
                        Para criar filtros que começam ocultos (permitindo ao usuário adicionar sob demanda), use:
                    </p>
                    <CodeBlock code={`{
    field: 'company',
    headerName: 'Empresa',
    enableColumnFilter: true,
    filterVisibleInitially: false, // <--- O segredo
    filterType: 'select',
    filterOptions: [...] 
}`} />
                </Section>

                {/* Selection Section */}
                <Section id="selection" title="Seleção (Checkbox)">
                    <p className="text-gray-600 mb-4">
                        Adicione uma coluna do tipo `'checkbox'` para ativar. A seleção usa lógica de Inclusão/Exclusão para suportar seleções em massa através de paginação.
                    </p>
                    <CodeBlock title="Selection Example" code={`// 1. Coluna de Checkbox
{ field: 'select', type: 'checkbox', width: 50, pinned: 'left' }

// 2. Estado Controlado
const [selection, setSelection] = useState<GridSelectionState>({ 
    type: 'include', ids: new Set() 
});

// 3. Componente
<DataGrid
    selectionModel={selection}
    onSelectionModelChange={setSelection}
    getRowId={row => row.id}
    selectionConfig={{
        showSelectedCount: true,
        keepOnPageChange: true // Mantém seleção ao mudar de página
    }}
/>`} />
                </Section>

                {/* AI Prompts Section (RESTORED & EXPANDED) */}
                <Section id="ai-prompts" title="🤖 AI Prompts (Acelerador)">
                    <p className="text-gray-600 mb-6">
                        Use estes prompts para pedir ao ChatGPT/Claude/Gemini que construa tabelas completas para você, seguindo nossos padrões.
                    </p>

                    <div className="space-y-6">
                        <div>
                            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                <span>🏗️ Prompt: Criar Nova Tabela (Scaffold)</span>
                            </h4>
                            <div className="bg-gray-800 p-4 rounded-lg relative group">
                                <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap">
                                    "Aja como um sênior React Developer. Com base na documentação do componente DataGrid interno (DataGrid.types.ts), crie uma tela completa para listar [ENTIDADE].<br /><br />
                                    Requisitos:<br />
                                    1. Colunas: [LISTAR COLUNAS, ex: Nome, Status, Data, Valor].<br />
                                    2. Habilite Filtros Rápidos (Fast Filters) para as colunas de Status e Categoria.<br />
                                    3. A coluna 'Valor' deve ser formatada como moeda.<br />
                                    4. Adicione persistência com o ID '[ID_DA_TABELA]'.<br />
                                    5. Use dados mockados para exemplo."
                                </pre>
                                <button
                                    className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => navigator.clipboard.writeText("Prompt copiado!")}
                                >
                                    Copiar
                                </button>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                <span>🔌 Prompt: Integrar com API Real</span>
                            </h4>
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap">
                                    "Refatore o componente DataGrid acima para usar Server-Side Pagination e Filtering.<br />
                                    1. Crie uma função fetchData simulada que aceita (page, pageSize, filters).<br />
                                    2. Configure a prop paginationMode='server'.<br />
                                    3. Garanta que o loading state seja tratado corretamente."
                                </pre>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Server-Side Deep Dive */}
                <Section id="server-side" title="Integração Server-Side (Deep Dive)">
                    <div className="prose prose-blue text-gray-600 max-w-none">
                        <p>
                            Muitos desenvolvedores confundem como o DataGrid funciona com APIs.
                            Ele segue o princípio de <strong>"Dumb UI, Smart Parent"</strong>.
                        </p>

                        <div className="my-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                            <h4 className="font-bold text-gray-900 mb-4 text-center">Fluxo de Dados</h4>
                            <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-4">
                                <div className="text-center p-4 bg-blue-50 rounded border border-blue-200 w-full">
                                    <strong>1. Usuário Interage</strong><br />
                                    (Clica na pág. 2)
                                </div>
                                <div className="hidden md:block text-gray-400">➡️</div>
                                <div className="text-center p-4 bg-purple-50 rounded border border-purple-200 w-full">
                                    <strong>2. DataGrid Avisa</strong><br />
                                    (onPaginationModelChange)
                                </div>
                                <div className="hidden md:block text-gray-400">➡️</div>
                                <div className="text-center p-4 bg-orange-50 rounded border border-orange-200 w-full">
                                    <strong>3. Pai Busca Dados</strong><br />
                                    (fetchData &rarr; API)
                                </div>
                                <div className="hidden md:block text-gray-400">➡️</div>
                                <div className="text-center p-4 bg-green-50 rounded border border-green-200 w-full">
                                    <strong>4. Props Atualizam</strong><br />
                                    (rows={'{novosDados}'})
                                </div>
                            </div>
                        </div>

                        <h4 className="font-bold text-gray-800 mt-8 mb-2">Exemplo de Implementação Real</h4>
                        <CodeBlock title="ServerTable.tsx" code={`const fetchData = useCallback(async (params: GridFetchParams) => {
    // Params contém tudo que você precisa para montar a query string
    const { pagination, sort, filters } = params;
    
    // Ex: ?page=1&limit=10&sort=name:asc&status=active
    const queryString = buildQuery(pagination, sort, filters);
    
    const response = await api.get('/users?' + queryString);
    
    return {
        data: response.items,
        total: response.totalCount
    };
}, []); // <--- useCallback é CRÍTICO aqui! Sem ele, loop infinito.

return (
    <DataGrid
        fetchData={fetchData} // DataGrid chama isso automaticamente ao mudar pág/filtro
        paginationMode="server" // Avisa que o server controla a página
        // ...
    />
);`} />
                    </div>
                </Section>

                {/* Persistence */}
                <Section id="persistence" title="Persistência Automática">
                    <p className="text-gray-600 mb-4">
                        O DataGrid possui um "cérebro" interno que salva o estado da tabela no <code>localStorage</code> do navegador.
                    </p>
                    <Alert title="Como funciona?" type="success">
                        Ao adicionar <code>persistId="users-table-v1"</code>, o DataGrid passa a salvar:
                        <ul className="list-disc ml-5 mt-2">
                            <li>Filtros aplicados (incluindo Fast Filters)</li>
                            <li>Ordenação (Sort Model)</li>
                            <li>Paginação (Página atual e tamanho)</li>
                            <li>Densidade da tabela</li>
                        </ul>
                    </Alert>
                    <p className="text-gray-500 text-sm mt-4">
                        <strong>Estratégia de Versionamento:</strong> Se você alterar as colunas de forma que quebre a compatibilidade, basta alterar o ID (ex: <code>v1</code> para <code>v2</code>) e o cache será resetado automaticamente para todos os usuários.
                    </p>
                </Section>

                {/* Imperative Control */}
                <Section id="imperative" title="Controle Imperativo (Refresh)">
                    <p className="text-gray-600 mb-4">
                        Às vezes você precisa recarregar a tabela "de fora" (ex: usuário clicou em "Salvar" num modal de criação).
                        Use a ref para isso.
                    </p>
                    <CodeBlock code={`const gridRef = useRef<DataGridRef>(null);

const handleUserCreated = () => {
    // Força o DataGrid a chamar o fetchData() novamente
    gridRef.current?.refresh();
};

<DataGrid ref={gridRef} ... />`} />
                </Section>

                {/* Performance Section */}
                <Section id="performance" title="Performance & Best Practices">
                    <p className="text-gray-600 mb-6">
                        Para garantir 60fps mesmo com milhares de linhas, siga estas regras de ouro.
                    </p>

                    <div className="grid grid-cols-1 gap-6">
                        <Alert title="⚠️ Estabilidade do fetchData" type="warning">
                            No modo Server-Side, a função <code className="font-bold">fetchData</code> <strong>DEVE ser memoizada</strong> com <code className="font-bold">useCallback</code>.
                            Se não, ela será recriada a cada render, causando loops infinitos de requisição.
                        </Alert>
                        <Alert title="💡 Colunas Estáticas" type="info">
                            Defina o array de <code className="font-bold">columns</code> fora do componente ou use <code>useMemo</code>.
                            Recriar colunas a cada render reseta o estado de largura e ordenação se não houver persistId.
                        </Alert>
                        <Alert title="⚡ useMemo nas Rows" type="success">
                            Se você transforma os dados antes de passar para o grid, use <code>useMemo</code> para evitar processamento desnecessário.
                        </Alert>
                    </div>
                </Section>

            </main>
        </div >
    );
};

// --- Styled Components for Docs ---

const Section = ({ id, title, children }: { id: string, title: string, children: React.ReactNode }) => (
    <section id={id} className="scroll-mt-10 mb-20 animate-fade-in">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b border-gray-200 pb-4">{title}</h2>
        {children}
    </section>
);

const BenefitCard = ({ icon, title, desc }: any) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group">
        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">{icon}</div>
        <h3 className="font-bold text-lg text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </div>
);

const CodeBlock = ({ title, code }: { title?: string, code: string }) => (
    <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-xl border border-gray-800 my-6">
        {title && <div className="bg-[#2d2d2d] px-4 py-2 text-xs font-mono text-gray-400 border-b border-gray-700">{title}</div>}
        <pre className="p-4 text-sm text-gray-100 overflow-x-auto font-mono custom-scrollbar leading-6">
            {code}
        </pre>
    </div>
);

const Alert = ({ title, children, type = 'info' }: any) => {
    const styles = {
        info: 'bg-blue-50 border-blue-400 text-blue-900',
        warning: 'bg-yellow-50 border-yellow-400 text-yellow-900',
        success: 'bg-emerald-50 border-emerald-400 text-emerald-900',
    };
    return (
        <div className={`${styles[type as keyof typeof styles]} border-l-4 p-4 rounded-r shadow-sm`}>
            {title && <h4 className="font-bold mb-1 flex items-center gap-2">{title}</h4>}
            <div className="text-sm opacity-90">{children}</div>
        </div>
    );
};

const Table = ({ children }: any) => (
    <div className="bg-white shadow-sm overflow-hidden border border-gray-200 rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
            {children}
        </table>
    </div>
);

const HeaderRow = ({ children }: any) => (
    <thead className="bg-gray-50">
        <tr>{children}</tr>
    </thead>
);

const Th = ({ children }: any) => (
    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{children}</th>
);

const Row = ({ prop, type, desc }: any) => (
    <tr className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 font-mono font-bold text-blue-600 whitespace-nowrap">{prop}</td>
        <td className="px-6 py-4 font-mono text-pink-600 text-xs whitespace-nowrap bg-pink-50/50 rounded">{type}</td>
        <td className="px-6 py-4 text-gray-700 leading-relaxed">{desc}</td>
    </tr>
);
