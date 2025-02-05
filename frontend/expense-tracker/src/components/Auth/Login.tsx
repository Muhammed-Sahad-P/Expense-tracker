"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/auth";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useAuthStore();
    const router = useRouter();

    const { mutate, isPending, error } = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            const userData = data?.data?.user;
            if (userData?.token) {
                setUser(
                    {
                        username: userData.username,
                        email: userData.email,
                    },
                    userData.token
                );
                router.push("/dashboard");
            }
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ username, password });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error.message}</p>}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        {isPending ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-sm text-gray-600 text-center mt-4">
                    Don&apos;t have an account?{" "}
                    <a href="/register" className="text-blue-600 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
