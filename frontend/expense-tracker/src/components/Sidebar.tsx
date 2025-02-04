'use client';

import Link from 'next/link';
import { useState } from 'react';
import { LayoutDashboard, CreditCard, DollarSign, User } from 'lucide-react';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`h-screen bg-gray-900 text-white transition-all ${isOpen ? 'w-64' : 'w-20'}`}>
            <div className="p-4 flex items-center justify-between">
                <h1 className={`text-xl font-bold transition-all ${isOpen ? 'block' : 'hidden'}`}>Dashboard</h1>
                <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                    {isOpen ? '⬅' : '➡'}
                </button>
            </div>
            <nav className="mt-4">
                <SidebarItem href="/" icon={<LayoutDashboard />} text="Dashboard" isOpen={isOpen} />
                <SidebarItem href="/expense" icon={<CreditCard />} text="Expenses" isOpen={isOpen} />
                <SidebarItem href="/income" icon={<DollarSign />} text="Income" isOpen={isOpen} />
                <SidebarItem href="/profile" icon={<User />} text="Profile" isOpen={isOpen} />
            </nav>
        </div>
    );
}

interface SidebarItemProps {
    href: string;
    icon: React.ReactNode;
    text: string;
    isOpen: boolean;
}

const SidebarItem = ({ href, icon, text, isOpen }: SidebarItemProps) => (
    <Link href={href} className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-md transition-all">
        {icon}
        <span className={`${isOpen ? 'block' : 'hidden'}`}>{text}</span>
    </Link>
);
