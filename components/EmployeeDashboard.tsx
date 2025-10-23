import React, { useState } from 'react';
import { User, Issue, Product, IssueStatus } from '../types';
import { MOCK_ISSUES, MOCK_PRODUCTS } from '../constants';
import IssueCard from './IssueCard';
import ProductManagement from './ProductManagement';

interface EmployeeDashboardProps {
    user: User;
}

type ActiveTab = 'all-issues' | 'manage-products';

const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ user }) => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('all-issues');
    const [issues, setIssues] = useState<Issue[]>(MOCK_ISSUES);
    const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

    const handleUpdateIssueStatus = (issueId: string, status: IssueStatus, repairedImageUrl?: string) => {
        setIssues(prevIssues =>
            prevIssues.map(issue => {
                if (issue.id === issueId) {
                    return { 
                        ...issue, 
                        status, 
                        ...(repairedImageUrl && { repairedImageUrl })
                    };
                }
                return issue;
            })
        );
    };

    const handleAddProduct = (product: Omit<Product, 'id'>) => {
        const newProduct = { ...product, id: `prod-${Date.now()}` };
        setProducts(prev => [newProduct, ...prev]);
    };
    
    const handleUpdateProduct = (updatedProduct: Product) => {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    };

    const handleDeleteProduct = (productId: string) => {
        setProducts(prev => prev.filter(p => p.id !== productId));
    };


    const TABS: { id: ActiveTab; label: string }[] = [
        { id: 'all-issues', label: 'All Reported Issues' },
        { id: 'manage-products', label: 'Manage Products' },
    ];

    return (
        <div className="container mx-auto">
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                     {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`${
                                activeTab === tab.id
                                    ? 'border-sky-500 text-sky-600'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="mt-8">
                {activeTab === 'all-issues' && (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {issues.map(issue => (
                            <IssueCard 
                                key={issue.id} 
                                issue={issue} 
                                userRole="employee"
                                onStatusChange={handleUpdateIssueStatus}
                            />
                        ))}
                    </div>
                )}
                {activeTab === 'manage-products' && (
                    <ProductManagement 
                        products={products}
                        onAddProduct={handleAddProduct}
                        onUpdateProduct={handleUpdateProduct}
                        onDeleteProduct={handleDeleteProduct}
                    />
                )}
            </div>
        </div>
    );
};

export default EmployeeDashboard;