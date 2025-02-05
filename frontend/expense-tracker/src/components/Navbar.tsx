"use client";

import { useAuthStore } from "@/lib/store/useAuthStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const router = useRouter();
    const { user, logout } = useAuthStore();
    const [hydrated, setHydrated] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) return null;

    return (
        <nav className="bg-white text-black fixed top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Expense Tracker</h1>

                <div className="hidden md:flex items-center gap-6">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <p className="text-sm font-medium text-gray-600">Welcome, {user.username}!</p>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600 transition">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <Link
                                href="/register"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition">
                                Sign Up
                            </Link>
                            <Link
                                href="/login"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition">
                                Login
                            </Link>
                        </div>
                    )}
                </div>

                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-white border-t shadow-lg p-4">
                    {user ? (
                        <div className="flex flex-col gap-4">
                            <p className="text-sm font-medium text-gray-600 text-center">Welcome, {user.username}!</p>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600 transition w-full">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <Link
                                href="/register"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition text-center">
                                Sign Up
                            </Link>
                            <Link
                                href="/login"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition text-center">
                                Login
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
