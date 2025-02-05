"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { LayoutDashboard, CreditCard, DollarSign, LogOut, User, LogIn, UserPlus } from "lucide-react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function Sidebar() {
    const { user, logout } = useAuthStore();
    const router = useRouter();
    const [isLargeScreen, setIsLargeScreen] = useState(true);

    useEffect(() => {
        const checkScreenSize = () => setIsLargeScreen(window.innerWidth >= 1024);
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    if (!isLargeScreen) return null;

    return (
        <div className="h-screen w-64 text-center bg-[#1D2329] text-black shadow-md fixed top-0 left-0 flex flex-col justify-between py-6">
            <h1 className="text-2xl font-bold text-[#FAD350] mb-4">Expense Tracker</h1>
            <nav className="flex flex-col gap-4 px-6 text-[#FAD350]">
                <SidebarItem href="/dashboard" icon={<LayoutDashboard />} text="Dashboard" />
                <SidebarItem href="/expense" icon={<CreditCard />} text="Expenses" />
                <SidebarItem href="/income" icon={<DollarSign />} text="Income" />
            </nav>
            <div className="mt-6 border-t border-gray-300 pt-6 px-6">
                {user ? (
                    <div className="flex flex-col gap-4 items-center">
                        <p className="text-sm font-medium text-[#FAD350] flex items-center gap-2">
                            <User size={18} /> {user.username}
                        </p>
                        <button
                            onClick={handleLogout}
                            className="bg-[#e1b833] text-black px-2 py-2 rounded-md text-sm hover:bg-[#e1b833]/80 transition w-full flex items-center justify-center gap-2">
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <Link
                            href="/register"
                            className="bg-[#e1b833] text-black px-4 py-2 rounded-md text-sm hover:bg-[#e1b833]/80 transition flex items-center justify-center gap-2">
                            <UserPlus size={16} /> Sign Up
                        </Link>
                        <Link
                            href="/login"
                            className="bg-[#e1b833] text-black px-4 py-2 rounded-md text-sm hover:bg-[#e1b833]/80 transition flex items-center justify-center gap-2">
                            <LogIn size={16} /> Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

interface SidebarItemProps {
    href: string;
    icon: React.ReactNode;
    text: string;
}

const SidebarItem = ({ href, icon, text }: SidebarItemProps) => (
    <Link href={href} className="flex items-center gap-3 p-3 hover:bg-[#3A4046] rounded-md transition-all">
        {icon}
        <span>{text}</span>
    </Link>
);
