import { useCallback, useMemo, useState } from 'react';
import { DataGrid } from '../components/data-grid/DataGrid';
import type { ColumnDef, GridFetchParams } from '../components/data-grid/DataGrid.types';

// 1. Definição da Tipagem dos Dados (Baseado em uma Fatura típica)
interface Invoice {
    id: string; // ou number
    dueDate: string;
    amount: number;
    status: string;
    description: string;
    pdfUrl?: string; // Link para boleto
    barCode?: string;
}

export const InvoiceTableExample = () => {

    // Configuração do CPF (poderia vir de um Contexto ou Input)
    const [cpf, setCpf] = useState('11967251606');

    // 2. Definição das Colunas
    const columns = useMemo<ColumnDef<Invoice>[]>(() => [
        {
            field: 'description',
            headerName: 'Descrição',
            minWidth: 200,
            flex: 1
        },
        {
            field: 'amount',
            headerName: 'Valor (R$)',
            minWidth: 120,
            type: 'number',
            render: ({ value }: any) =>
                new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
        },
        {
            field: 'dueDate',
            headerName: 'Vencimento',
            width: 150,
            type: 'date',
            render: ({ value }: any) => new Date(value).toLocaleDateString('pt-BR')
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            enableColumnFilter: true, // Filtro rápido
            render: ({ value }: any) => (
                <span className={`px-2 py-1 rounded text-xs font-bold ${value === 'OVERDUE' ? 'bg-red-100 text-red-800' :
                    value === 'PAID' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                    }`}>
                    {value === 'OVERDUE' ? 'Vencida' : value === 'PAID' ? 'Paga' : 'Aberta'}
                </span>
            )
        },
        {
            field: 'actions',
            headerName: 'Ações',
            width: 100,
            render: ({ row }: any) => (
                row.pdfUrl ? (
                    <a
                        href={row.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                        Baixar PDF
                    </a>
                ) : null
            )
        }
    ], []);

    // 3. Função de Busca (Fetch) conectada à API Real
    const fetchInvoices = useCallback(async (params: GridFetchParams) => {
        try {
            // Nota: Essa API parece retornar um Array direto [], sem paginação no envelope padrão.
            // O DataGrid suporta isso, basta a gente adaptar a resposta.

            const response = await fetch(`https://api-pudge.igreenenergy.com.br/v1/webhooks/customer/open-invoices?cpf=${cpf}`);

            if (!response.ok) throw new Error('Falha ao buscar faturas');

            const data: Invoice[] = await response.json();

            // Como a API retorna TUDO de uma vez (Client-Side Pagination com dados remotos),
            // nós retornamos o array completo e deixamos o DataGrid paginar se quiser,
            // OU fazemos o slice manual aqui se quisermos simular paginação no front.

            // Simulação de paginação no cliente (já que a API traz tudo)
            const { page, pageSize } = params.pagination;
            const start = (page - 1) * pageSize;
            const end = start + pageSize;
            const paginatedData = data.slice(start, end);

            return {
                data: paginatedData,
                total: data.length // Importante: Total real de itens vindos da API
            };

        } catch (error) {
            console.error(error);
            return { data: [], total: 0 };
        }
    }, [cpf]); // Recria a função se o CPF mudar

    return (
        <div className="p-8 h-screen bg-gray-50 flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-gray-800">Faturas em Aberto</h1>

            <div className="flex items-center gap-4 mb-4">
                <label className="text-sm font-medium text-gray-700">CPF do Cliente:</label>
                <input
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 text-sm"
                />
            </div>

            <DataGrid
                columns={columns}
                fetchData={fetchInvoices}
                getRowId={(row) => row.id || Math.random()} // Fallback se não tiver ID
                paginationConfig={{
                    enabled: true,
                    initialPageSize: 10
                }}
                autoHeight
            />
        </div>
    );
};
