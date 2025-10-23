import React, { useState, useRef } from 'react';
import { User } from '../types';
import { UserCircleIcon } from './icons/UserCircleIcon';

interface UserProfileProps {
    user: User;
    onUpdateUser: (updatedUser: User) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdateUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(user.profileImageUrl || null);
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const triggerFileSelect = () => {
        if (isEditing) {
            fileInputRef.current?.click();
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateUser({ 
            ...user, 
            ...formData,
            profileImageUrl: imagePreview || undefined,
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({ name: user.name, email: user.email });
        setImagePreview(user.profileImageUrl || null);
        setIsEditing(false);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>
            <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Profile" className="h-32 w-32 rounded-full object-cover" />
                    ) : (
                        <UserCircleIcon className="h-32 w-32 text-slate-400" />
                    )}
                    {isEditing && (
                        <div 
                            className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center cursor-pointer transition-all duration-300"
                            onClick={triggerFileSelect}
                            role="button"
                            aria-label="Change profile photo"
                        >
                            <p className="text-white opacity-0 group-hover:opacity-100 font-semibold">Change Photo</p>
                        </div>
                    )}
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImageChange}
                        className="hidden" 
                        accept="image/*" 
                    />
                </div>
                
                {!isEditing ? (
                    <div className="text-center space-y-4 w-full">
                        <div>
                            <label className="block text-sm font-medium text-slate-500">Name</label>
                            <p className="mt-1 text-lg font-semibold text-slate-800">{user.name}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-500">Email</label>
                            <p className="mt-1 text-lg font-semibold text-slate-800">{user.email}</p>
                        </div>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="mt-4 bg-sky-600 text-white py-2 px-6 rounded-md hover:bg-sky-700 transition duration-200 font-semibold"
                        >
                            Edit Profile
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSave} className="space-y-6 w-full">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                            />
                        </div>
                        <div className="flex justify-center space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="bg-slate-200 text-slate-700 py-2 px-6 rounded-md hover:bg-slate-300 transition duration-200 font-semibold"
                            >
                                Cancel
                            </button>
                             <button
                                type="submit"
                                className="bg-sky-600 text-white py-2 px-6 rounded-md hover:bg-sky-700 transition duration-200 font-semibold"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
