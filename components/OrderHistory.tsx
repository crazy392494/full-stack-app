import React from 'react';
import { Order } from '../types';
import OrderCard from './OrderCard';

interface OrderHistoryProps {
    orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Order History</h2>
            {orders.length > 0 ? (
                <div className="space-y-6">
                    {orders.map(order => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <p className="text-slate-500">You haven't placed any orders yet.</p>
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
