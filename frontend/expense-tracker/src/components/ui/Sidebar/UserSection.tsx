import Link from "next/link";
import { User, LogOut, UserPlus, LogIn } from "lucide-react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useRouter } from "next/navigation";

export const UserSection = () => {
    const { user, logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <div className="border-t border-gray-500 pt-4">
            {user ? (
                <div className="flex flex-col gap-3 items-center">
                    <p className="text-sm font-medium text-indigo-600 flex items-center gap-2">
                        <User size={18} /> {user.username}
                    </p>
                    <button
                        onClick={handleLogout}
                        className="bg-indigo-600 hover:bg-indigo-600/80 text-black px-3 py-2 rounded-lg text-sm  transition w-full flex items-center justify-center gap-2"
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    <Link
                        href="/register"
                        className="bg-[#e1b833] text-black px-4 py-2 rounded-lg text-sm hover:bg-[#e1b833]/80 transition flex items-center justify-center gap-2"
                    >
                        <UserPlus size={16} /> Sign Up
                    </Link>
                    <Link
                        href="/login"
                        className="bg-[#e1b833] text-black px-4 py-2 rounded-lg text-sm hover:bg-[#e1b833]/80 transition flex items-center justify-center gap-2"
                    >
                        <LogIn size={16} /> Login
                    </Link>
                </div>
            )}
        </div>
    );
};