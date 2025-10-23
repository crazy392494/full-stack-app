
import React, { useState } from 'react';
import { Role } from '../types';

interface LoginPageProps {
    onLogin: (email: string, role: Role) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (role: Role) => (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            onLogin(email, role);
        } else {
            alert('Please enter an email.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-200 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-sky-600">
                        FixIt<span className="text-slate-800">+</span>
                    </h1>
                    <p className="text-slate-500 mt-2">Report and resolve local issues, fast.</p>
                </div>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password"  className="block text-sm font-medium text-slate-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                            placeholder="••••••••"
                        />
                    </div>
                </form>
                <div className="space-y-4">
                    <button
                        onClick={handleSubmit(Role.USER)}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-transform transform hover:scale-105"
                    >
                        Login as User
                    </button>
                    <button
                        onClick={handleSubmit(Role.EMPLOYEE)}
                        className="w-full flex justify-center py-3 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-transform transform hover:scale-105"
                    >
                        Login as Employee
                    </button>
                     <p className="text-center text-sm text-slate-500">
                        Don't have an account? <a href="#" className="font-medium text-sky-600 hover:text-sky-500">Register</a>
                     </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
