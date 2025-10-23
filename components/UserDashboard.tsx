import React, { useState, useCallback } from 'react';
import { User, Issue, Product, CartItem, IssueStatus, LocationType, Order, OrderStatus } from '../types';
import { MOCK_ISSUES, MOCK_PRODUCTS, MOCK_ORDERS, DELIVERY_COSTS } from '../constants';
import ReportIssueForm from './ReportIssueForm';
import IssueCard from './IssueCard';
import ProductCard from './ProductCard';
import Cart from './Cart';
import UserProfile from './UserProfile';
import OrderHistory from './OrderHistory';

interface UserDashboardProps {
    user: User;
    onUpdateUser: (updatedUser: User) => void;
}

type ActiveTab = 'my-issues' | 'report-issue' | 'marketplace' | 'my-orders' | 'my-profile';

const UserDashboard: React.FC<UserDashboardProps> = ({ user, onUpdateUser }) => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('my-issues');
    const [issues, setIssues] = useState<Issue[]>(MOCK_ISSUES.filter(i => i.reportedById === user.id));
    const [products] = useState<Product[]>(MOCK_PRODUCTS);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS.filter(o => o.userId === user.id));
    const [locationType, setLocationType] = useState<LocationType>(LocationType.URBAN);

    const handleAddIssue = (newIssue: Omit<Issue, 'id' | 'reportedById' | 'createdAt' | 'status'>) => {
        const issueToAdd: Issue = {
            ...newIssue,
            id: `issue-${Date.now()}`,
            reportedById: user.id,
            createdAt: new Date().toISOString(),
            status: IssueStatus.PENDING,
        };
        setIssues(prev => [issueToAdd, ...prev]);
        setActiveTab('my-issues');
    };

    const addToCart = useCallback((product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    }, []);

    const removeFromCart = useCallback((productId: string) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCart(prevCart => prevCart.map(item =>
            item.id === productId ? { ...item, quantity } : item
        ));
    }, [removeFromCart]);

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const deliveryCost = DELIVERY_COSTS[locationType];

        const newOrder: Order = {
            id: `order-${Date.now()}`,
            userId: user.id,
            items: [...cart],
            subtotal,
            deliveryCost,
            total: subtotal + deliveryCost,
            createdAt: new Date().toISOString(),
            status: OrderStatus.PROCESSING,
        };

        setOrders(prevOrders => [newOrder, ...prevOrders]);
        setCart([]);
        alert('Order placed successfully!');
        setActiveTab('my-orders');
    };


    const TABS: { id: ActiveTab; label: string }[] = [
        { id: 'my-issues', label: 'My Issues' },
        { id: 'report-issue', label: 'Report New Issue' },
        { id: 'marketplace', label: 'Marketplace' },
        { id: 'my-orders', label: 'My Orders'},
        { id: 'my-profile', label: 'My Profile' },
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
                {activeTab === 'my-issues' && (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {issues.length > 0 ? issues.map(issue => (
                            <IssueCard key={issue.id} issue={issue} />
                        )) : <p>You have not reported any issues yet.</p>}
                    </div>
                )}
                {activeTab === 'report-issue' && <ReportIssueForm onSubmit={handleAddIssue} />}
                {activeTab === 'marketplace' && (
                     <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <div className="lg:col-span-3">
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {products.map(product => (
                                    <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                                ))}
                            </div>
                        </div>
                        <div className="lg:col-span-1">
                            <Cart 
                                cartItems={cart} 
                                onRemove={removeFromCart} 
                                onUpdateQuantity={updateQuantity}
                                locationType={locationType}
                                onLocationTypeChange={setLocationType}
                                onCheckout={handleCheckout}
                            />
                        </div>
                    </div>
                )}
                 {activeTab === 'my-orders' && <OrderHistory orders={orders} />}
                {activeTab === 'my-profile' && (
                    <UserProfile user={user} onUpdateUser={onUpdateUser} />
                )}
            </div>
        </div>
    );
};

export default UserDashboard;