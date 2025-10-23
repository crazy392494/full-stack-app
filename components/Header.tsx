import React from 'react';
import { User } from '../types';

interface HeaderProps {
    user: User;
    onLogout: () => void;
}

const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-sky-600">
                    FixIt<span className="text-slate-800">+</span>
                </h1>
                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-slate-500 capitalize">{user.role}</p>
                    </div>
                     {user.profileImageUrl ? (
                        <img src={user.profileImageUrl} alt={user.name} className="h-12 w-12 rounded-full object-cover" />
                    ) : (
                        <div className="h-12 w-12 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-lg">
                            {getInitials(user.name)}
                        </div>
                    )}
                    <button
                        onClick={onLogout}
                        className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition duration-200"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
