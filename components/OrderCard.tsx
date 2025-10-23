import React from 'react';
import { Order, OrderStatus } from '../types';

interface OrderCardProps {
    order: Order;
}

const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.PROCESSING: return 'bg-blue-100 text-blue-800';
        case OrderStatus.SHIPPED: return 'bg-indigo-100 text-indigo-800';
        case OrderStatus.DELIVERED: return 'bg-green-100 text-green-800';
        default: return 'bg-slate-100 text-slate-800';
    }
};

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center flex-wrap gap-2">
                <div>
                    <h3 className="font-bold text-slate-800">Order #{order.id.split('-')[1]}</h3>
                    <p className="text-sm text-slate-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                     <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                    </span>
                     <p className="font-bold text-lg">₹{order.total.toFixed(2)}</p>
                </div>
            </div>
            <div className="p-4">
                <h4 className="font-semibold mb-3 text-slate-700">Items Purchased:</h4>
                <ul className="space-y-3">
                    {order.items.map(item => (
                        <li key={item.id} className="flex justify-between items-center text-sm">
                            <div className="flex items-center space-x-3">
                                {item.imageUrl ? 
                                    <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded-md object-cover" /> :
                                    <div className="w-10 h-10 rounded-md bg-slate-200"></div>
                                }
                                <div>
                                    <span className="font-medium text-slate-800">{item.name}</span>
                                    <span className="text-slate-500 block">Qty: {item.quantity}</span>
                                </div>
                            </div>
                            <span className="text-slate-600 font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                 <div className="border-t mt-4 pt-3 space-y-1 text-sm">
                    <div className="flex justify-between">
                        <span className="text-slate-500">Subtotal</span>
                        <span>₹{order.subtotal.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-slate-500">Delivery</span>
                        <span>₹{order.deliveryCost.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
