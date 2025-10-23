
import React, { useState } from 'react';
import { Product } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';
import { PencilIcon } from './icons/PencilIcon';

interface ProductManagementProps {
    products: Product[];
    onAddProduct: (product: Omit<Product, 'id'>) => void;
    onUpdateProduct: (product: Product) => void;
    onDeleteProduct: (productId: string) => void;
}

const ProductForm: React.FC<{ product?: Product, onSave: (p: any) => void, onCancel: () => void }> = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Omit<Product, 'id'>>({
        name: product?.name || '',
        description: product?.description || '',
        category: product?.category || '',
        price: product?.price || 0,
        stock: product?.stock || 0,
        imageUrl: product?.imageUrl || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'stock' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(product ? { ...formData, id: product.id } : formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                <h3 className="text-xl font-bold mb-4">{product ? 'Edit Product' : 'Add New Product'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required/>
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required/>
                    <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border rounded" required/>
                    <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" required/>
                    <input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="Stock" className="w-full p-2 border rounded" required/>
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onCancel} className="bg-slate-200 px-4 py-2 rounded">Cancel</button>
                        <button type="submit" className="bg-sky-600 text-white px-4 py-2 rounded">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const ProductManagement: React.FC<ProductManagementProps> = ({ products, onAddProduct, onUpdateProduct, onDeleteProduct }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

    const handleOpenForm = (product?: Product) => {
        setEditingProduct(product);
        setIsFormOpen(true);
    };
    
    const handleCloseForm = () => {
        setEditingProduct(undefined);
        setIsFormOpen(false);
    };

    const handleSave = (productData: Product | Omit<Product, 'id'>) => {
        if ('id' in productData) {
            onUpdateProduct(productData);
        } else {
            onAddProduct(productData);
        }
        handleCloseForm();
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Product Inventory</h2>
                <button onClick={() => handleOpenForm()} className="flex items-center space-x-2 bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700">
                    <PlusIcon />
                    <span>Add Product</span>
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {products.map(product => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            {product.imageUrl ? (
                                                <img className="h-10 w-10 rounded-full object-cover" src={product.imageUrl} alt={product.name} />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
                                                    <span className="text-xs text-slate-500">?</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-slate-900">{product.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{product.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">₹{product.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{product.stock}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleOpenForm(product)} className="text-indigo-600 hover:text-indigo-900 mr-4"><PencilIcon/></button>
                                    <button onClick={() => onDeleteProduct(product.id)} className="text-red-600 hover:text-red-900"><TrashIcon/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isFormOpen && <ProductForm product={editingProduct} onSave={handleSave} onCancel={handleCloseForm} />}
        </div>
    );
};

export default ProductManagement;