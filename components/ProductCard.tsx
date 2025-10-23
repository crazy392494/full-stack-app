
import React from 'react';
import { Product } from '../types';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group">
            <div className="overflow-hidden">
                {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300" />
                ) : (
                    <div className="w-full h-56 bg-slate-200 flex items-center justify-center text-slate-500">
                        No Image
                    </div>
                )}
            </div>
            <div className="p-4 flex-grow flex flex-col">
                <span className="text-xs text-slate-500 uppercase font-semibold">{product.category}</span>
                <h3 className="text-lg font-bold mt-1">{product.name}</h3>
                <p className="text-sm text-slate-600 mt-2 flex-grow">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                    <p className="text-xl font-extrabold text-slate-800">₹{product.price}</p>
                    <button
                        onClick={() => onAddToCart(product)}
                        className="flex items-center space-x-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition duration-200 disabled:bg-slate-300"
                        disabled={product.stock === 0}
                    >
                        <ShoppingCartIcon />
                        <span>{product.stock > 0 ? 'Add' : 'Out of Stock'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;