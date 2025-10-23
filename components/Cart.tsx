
import React from 'react';
import { CartItem, LocationType } from '../types';
import { DELIVERY_COSTS } from '../constants';
import { TrashIcon } from './icons/TrashIcon';

interface CartProps {
    cartItems: CartItem[];
    onRemove: (productId: string) => void;
    onUpdateQuantity: (productId: string, quantity: number) => void;
    locationType: LocationType;
    onLocationTypeChange: (type: LocationType) => void;
    onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onRemove, onUpdateQuantity, locationType, onLocationTypeChange, onCheckout }) => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryCost = cartItems.length > 0 ? DELIVERY_COSTS[locationType] : 0;
    const total = subtotal + deliveryCost;

    return (
        <aside className="bg-white p-6 rounded-lg shadow-lg sticky top-8">
            <h3 className="text-xl font-bold mb-4">Your Cart</h3>
            {cartItems.length === 0 ? (
                <p className="text-slate-500">Your cart is empty.</p>
            ) : (
                <div className="space-y-4">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                {item.imageUrl ? (
                                    <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-md object-cover" />
                                ) : (
                                    <div className="w-12 h-12 rounded-md bg-slate-200 flex-shrink-0"></div>
                                )}
                                <div>
                                    <p className="font-semibold text-sm">{item.name}</p>
                                    <p className="text-xs text-slate-500">₹{item.price}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value, 10))}
                                    className="w-14 p-1 border rounded-md text-center"
                                />
                                <button onClick={() => onRemove(item.id)} className="text-slate-400 hover:text-red-500">
                                    <TrashIcon />
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="pt-4 border-t mt-4 space-y-2">
                         <div>
                            <label className="block text-sm font-medium text-slate-700">Delivery Location</label>
                            <select value={locationType} onChange={e => onLocationTypeChange(e.target.value as LocationType)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500">
                                <option value={LocationType.URBAN}>Urban (₹{DELIVERY_COSTS.Urban})</option>
                                <option value={LocationType.RURAL}>Rural (₹{DELIVERY_COSTS.Rural})</option>
                            </select>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Delivery</span>
                            <span>₹{deliveryCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                    </div>
                    <button 
                        onClick={onCheckout}
                        disabled={cartItems.length === 0}
                        className="w-full bg-sky-600 text-white py-3 rounded-md hover:bg-sky-700 transition font-semibold disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </aside>
    );
};

export default Cart;