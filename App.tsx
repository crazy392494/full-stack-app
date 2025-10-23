import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import UserDashboard from './components/UserDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import { User, Role } from './types';
import { MOCK_USERS, MOCK_EMPLOYEES } from './constants';
import Header from './components/Header';

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        // This is a mock session check. In a real app, you'd verify a token.
        const storedUser = sessionStorage.getItem('fixit-user');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogin = (email: string, role: Role) => {
        const userPool = role === Role.USER ? MOCK_USERS : MOCK_EMPLOYEES;
        const foundUser = userPool.find(u => u.email === email);
        if (foundUser) {
            setCurrentUser(foundUser);
            sessionStorage.setItem('fixit-user', JSON.stringify(foundUser));
        } else {
            alert('User not found. Using mock user for demonstration.');
            const mockUser = userPool[0];
            setCurrentUser(mockUser);
            sessionStorage.setItem('fixit-user', JSON.stringify(mockUser));
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
        sessionStorage.removeItem('fixit-user');
    };

    const handleUpdateUser = (updatedUser: User) => {
        setCurrentUser(updatedUser);
        sessionStorage.setItem('fixit-user', JSON.stringify(updatedUser));
    };

    const renderContent = () => {
        if (!currentUser) {
            return <LoginPage onLogin={handleLogin} />;
        }

        return (
            <div className="min-h-screen bg-slate-100">
                <Header user={currentUser} onLogout={handleLogout} />
                <main className="p-4 md:p-8">
                    {currentUser.role === Role.USER && <UserDashboard user={currentUser} onUpdateUser={handleUpdateUser} />}
                    {currentUser.role === Role.EMPLOYEE && <EmployeeDashboard user={currentUser} />}
                </main>
            </div>
        );
    };

    return <div className="antialiased">{renderContent()}</div>;
};

export default App;