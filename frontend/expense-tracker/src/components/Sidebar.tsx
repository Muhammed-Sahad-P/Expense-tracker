"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { LayoutDashboard, CreditCard, DollarSign } from "lucide-react";
import { useAuthStore } from "@/lib/store/useAuthStore";

export default function Sidebar() {
    const { user } = useAuthStore();
    const [isLargeScreen, setIsLargeScreen] = useState(true);

    useEffect(() => {
        const checkScreenSize = () => setIsLargeScreen(window.innerWidth >= 1024);
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    if (!user || !isLargeScreen) return null;

    return (
        <div className="h-screen w-64 bg-white text-black shadow-md fixed top-0 left-0">
            <div className="p-6">
                <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
            <nav className="mt-4 px-6">
                <SidebarItem href="/dashboard" icon={<LayoutDashboard />} text="Dashboard" />
                <SidebarItem href="/expense" icon={<CreditCard />} text="Expenses" />
                <SidebarItem href="/income" icon={<DollarSign />} text="Income" />
            </nav>
        </div>
    );
}

interface SidebarItemProps {
    href: string;
    icon: React.ReactNode;
    text: string;
}

const SidebarItem = ({ href, icon, text }: SidebarItemProps) => (
    <Link href={href} className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-md transition-all">
        {icon}
        <span>{text}</span>
    </Link>
);
