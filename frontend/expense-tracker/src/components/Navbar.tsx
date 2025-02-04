'use client';

import { useAuthStore } from "@/lib/store/useAuthStore";


export default function Navbar() {
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
    }
    return (
        <nav className="p-4 bg-gray-900 text-white flex justify-between">
            <h1 className="text-lg font-bold">Expense Tracker</h1>
            {user ? (
                <div className="flex gap-4">
                    <p>Welcome, {user.username}!</p>
                    <button onClick={handleLogout} className="bg-red-500 px-2 py-1 rounded">Logout</button>
                </div>
            ) : (
                <a href="/auth" className="bg-blue-500 px-2 py-1 rounded">Login / Sign Up</a>
            )}
        </nav>
    );
}
