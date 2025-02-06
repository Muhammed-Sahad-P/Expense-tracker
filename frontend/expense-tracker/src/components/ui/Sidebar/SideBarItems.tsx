import Link from "next/link";
import { ReactNode } from "react";

interface SidebarItemProps {
    href: string;
    icon: ReactNode;
    text: string;
}

export const SidebarItem = ({ href, icon, text }: SidebarItemProps) => (
    <Link href={href} className="flex items-center gap-3 p-3 hover:bg-[#3A4046] rounded-lg transition-all">
        {icon}
        <span>{text}</span>
    </Link>
);