import React, { useMemo, useState } from 'react';
import { DataGrid } from '../components/data-grid/DataGrid';
import type { ColumnDef } from '../components/data-grid/DataGrid.types';
import {
    Shield, Moon, Plus,
    MoreHorizontal, Pencil, Trash2, Calendar
} from 'lucide-react';

// --- Interfaces & Mock Data ---

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    status: 'Active' | 'Vacation' | 'Busy' | 'Offline';
    phone: string;
    company: string;
    city: string;
    zipCode: string;
    twitter: string;
    github: string;
    timezone: string;
    loginIp: string;
    budget: number;
    joinedDate: string;
    language: string; // New field
    age: number; // New field
    salary: number; // New field
}

const ROLES = ['Admin', 'Manager', 'Developer', 'Designer', 'Editor', 'User', 'Moderator'];
const STATUS = ['Active', 'Vacation', 'Busy', 'Offline'];
const COMPANIES = ['TechCorp', 'Innovate Solutions', 'GreenEnergy', 'Nexus Labs', 'DataFlow', 'CloudNine'];
const CITIES = ['San Francisco', 'New York', 'London', 'Berlin', 'Tokyo', 'São Paulo', 'Toronto', 'Paris', 'Singapore'];
const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Japanese', 'Chinese', 'Russian'];

// Generative Helper
const generateUsers = (count: number): User[] => {
    return Array.from({ length: count }).map((_, i) => {
        const id = `user-${i + 1}`;
        const firstName = ['Emily', 'Michael', 'Emma', 'Olivia', 'Ethan', 'Isabella', 'Sophia', 'James', 'Alexander', 'Ava'][i % 10];
        const lastName = ['Johnson', 'Williams', 'Miller', 'Wilson', 'Martinez', 'Anderson', 'Brown', 'Davis', 'Jones', 'Taylor'][i % 10];
        const status = STATUS[i % STATUS.length] as 'Active' | 'Vacation' | 'Busy' | 'Offline';
        const role = ROLES[i % ROLES.length];
        const city = CITIES[i % CITIES.length];
        const language = LANGUAGES[i % LANGUAGES.length];

        return {
            id,
            firstName,
            lastName,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
            role,
            status,
            phone: `+55 (11) 9${Math.floor(Math.random() * 89999999) + 10000000}`,
            company: COMPANIES[i % COMPANIES.length],
            city,
            zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
            twitter: `@${firstName.toLowerCase()}_${i}`,
            github: `${firstName.toLowerCase()}${i}`,
            timezone: `UTC${Math.floor(Math.random() * 24) - 12}`,
            loginIp: `192.168.1.${i}`,
            budget: Math.floor(Math.random() * 10000) + 5000,
            joinedDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0],
            language,
            age: Math.floor(Math.random() * 40) + 20, // 20-60
            salary: Math.floor(Math.random() * 80000) + 40000,
        };
    });
};

const MOCK_DATA = generateUsers(100);

// --- Renderers ---

const Badge = ({ children, variant = 'gray' }: { children: React.ReactNode, variant?: 'gray' | 'green' | 'red' | 'yellow' }) => {
    const styles = {
        gray: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
        green: 'bg-green-50 text-green-700 dark:bg-green-500/20 dark:text-green-300',
        red: 'bg-red-50 text-red-700 dark:bg-red-500/20 dark:text-red-300',
        yellow: 'bg-orange-50 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300',
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border border-transparent ${styles[variant]}`}>
            {children}
        </span>
    );
};

// Helper for Status Tags
const renderStatusTag = (status: string) => {
    let classes = '';
    let dotColor = '';

    switch (status) {
        case 'Active':
            classes = 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50';
            dotColor = 'rgb(0, 168, 89)'; // Correct Emerald Green Dot
            break;
        case 'Vacation':
            classes = 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/50';
            dotColor = 'rgb(245, 158, 11)'; // Amber Dot
            break;
        case 'Busy':
            classes = 'bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800/50';
            dotColor = 'rgb(244, 63, 94)'; // Rose Dot
            break;
        case 'Offline':
        default:
            classes = 'bg-slate-50 text-slate-700 border-slate-100 dark:bg-slate-900/30 dark:text-slate-400 dark:border-slate-800/50';
            dotColor = 'rgb(148, 163, 184)'; // Slate Dot
            break;
    }

    return (
        <div className={`inline-flex items-center gap-1.5 whitespace-nowrap px-2 py-0.5 rounded-full font-semibold border text-xs ${classes}`}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dotColor }}></div>
            {status}
        </div>
    );
};

// --- Main Page ---

export const ExampleFinalPage: React.FC = () => {
    const [data] = useState<User[]>(MOCK_DATA);
    const [paginationModel, setPaginationModel] = useState({ page: 1, pageSize: 12 });

    const columns: ColumnDef<User>[] = useMemo(() => [
        {
            field: 'select',
            headerName: '',
            width: 60,
            pinned: 'left',
            type: 'checkbox'
        },
        {
            field: 'firstName',
            headerName: 'First Name',
            width: 250,
            pinned: 'left',
            filterType: 'text',
            render: (params) => (
                <div className="flex items-center gap-3">
                    <img
                        src={`https://i.pravatar.cc/150?u=${params.row.id}`}
                        alt={params.row.firstName}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-900 dark:text-gray-100 leading-tight">
                            {params.row.firstName} {params.row.lastName}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {params.row.email}
                        </span>
                    </div>
                </div>
            )
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            width: 140,
            filterType: 'text',
            render: (params) => <span className="text-gray-600 dark:text-gray-300">{params.row.lastName}</span>
        },
        {
            field: 'email',
            headerName: 'Email Address',
            width: 240,
            filterType: 'text',
            render: (params) => <span className="text-gray-600 dark:text-gray-300">{params.row.email}</span>
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 130,
            enableColumnFilter: true,
            filterType: 'select',
            filterOptions: ROLES.map(r => ({ label: r, value: r })),
            render: (params) => (
                <Badge variant="gray">{params.row.role}</Badge>
            )
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 140,
            enableColumnFilter: true,
            filterType: 'select',
            filterOptions: STATUS.map(s => ({ label: s, value: s })),
            defaultFilterValue: ['Active', 'Busy'], // 2 filters applied by default
            renderFilterOption: (option) => renderStatusTag(option.value),
            render: (params) => renderStatusTag(params.row.status)
        },
        { field: 'phone', headerName: 'Phone', width: 140 },
        {
            field: 'company',
            headerName: 'Company',
            width: 150,
            enableColumnFilter: true, // Enable fast filter
            filterVisibleInitially: false, // Hide initially so it appears in "Add Filter" menu
            filterType: 'select',
            filterOptions: COMPANIES.map(c => ({ label: c, value: c }))
        },
        {
            field: 'city',
            headerName: 'City',
            width: 120,
            enableColumnFilter: true,
            filterType: 'select',
            filterOptions: CITIES.map(c => ({ label: c, value: c }))
        },
        { field: 'zipCode', headerName: 'Zip Code', width: 100 },
        {
            field: 'language',
            headerName: 'Language',
            width: 120,
            render: (p) => <span className="text-gray-600 dark:text-gray-300">{p.row.language}</span>
        },
        {
            field: 'age',
            headerName: 'Age',
            width: 80,
            type: 'number',
            align: 'left',
            render: (p) => <span className="text-gray-600 dark:text-gray-300">{p.row.age}</span>
        },
        {
            field: 'joinedDate',
            headerName: 'Joined Date',
            width: 130,
            enableColumnFilter: true, // Fast filter for date
            filterType: 'date',
            render: (p) => (
                <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">{new Date(p.row.joinedDate).toLocaleDateString()}</span>
                </div>
            )
        },
        { field: 'twitter', headerName: 'Twitter', width: 130, render: (p) => <span className="text-gray-500">{p.row.twitter}</span> },
        { field: 'github', headerName: 'GitHub', width: 120, render: (p) => <span className="text-gray-500">{p.row.github}</span> },
        { field: 'timezone', headerName: 'Timezone', width: 100, render: (p) => <span className="text-gray-500">{p.row.timezone}</span> },
        { field: 'loginIp', headerName: 'Login IP', width: 130, render: (p) => <span className="text-gray-500">{p.row.loginIp}</span> },
        {
            field: 'budget',
            headerName: 'Budget',
            width: 120,
            align: 'right',
            render: (p) => <span className="font-semibold text-gray-700 dark:text-gray-300">${p.row.budget?.toLocaleString() ?? '0'}.00</span>
        },
        {
            field: 'salary',
            headerName: 'Salary',
            width: 120,
            align: 'right',
            render: (p) => <span className="font-semibold text-gray-700 dark:text-gray-300">${p.row.salary?.toLocaleString() ?? '0'}.00</span>
        },
        {
            field: 'actions',
            headerName: 'Actions',
            pinned: 'right',
            width: 120,
            align: 'center',
            enableColumnMenu: false, // Menu disabled
            render: () => (
                <div className="flex items-center justify-center gap-4">
                    <button className="text-gray-400 hover:text-blue-600 transition-colors"><Pencil size={16} /></button>
                    <button className="text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors"><MoreHorizontal size={16} /></button>
                </div>
            )
        }

    ], []);

    return (
        <div className="bg-[#fafaf9] dark:bg-[#0B0F19] p-8 flex flex-col gap-6 font-sans">
            {/* Header Section */}
            <div className="flex flex-col gap-6">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">User management</h1>
                            <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-800/50">100</span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Manage your team members and their account permissions here.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#00A859] hover:bg-[#008F4C] text-white rounded-lg text-sm font-semibold transition-all shadow-sm ring-offset-2 focus:ring-2 focus:ring-[#00A859] dark:ring-offset-gray-900">
                            <Plus size={18} />
                            Add User
                        </button>
                    </div>
                </div>

                {/* Grid Container */}
                <div className="flex-1 w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden max-h-[80vh] flex flex-col">
                    <DataGrid
                        rows={data}
                        columns={columns}
                        getRowId={(row) => row.id}
                        persistId="user-management-demo-v1" // Enable persistence
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        // Simplified Toolbar to match design
                        toolbar={{
                            enableSearch: true,
                            enableFilters: true,
                            enableDensitySelector: true,
                            enableExport: true,
                            enableColumnConfig: true,
                            searchField: 'firstName',
                            moreActions: [
                                { label: 'Sync Users', onClick: () => { } },
                                { label: 'Delete Selected', onClick: () => { }, variant: 'danger' }
                            ]
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
