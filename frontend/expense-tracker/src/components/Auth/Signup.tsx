"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signup } from "@/lib/auth";
import { useRouter } from "next/navigation"; 

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter(); 

    const { mutate, isPending, error } = useMutation({
        mutationFn: signup,
        onSuccess: () => {
            console.log("User registered successfully!");
            router.push("/login");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ username, email, password });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

                <div className="mb-4">
                    <label className="block text-gray-700">Username</label>
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                    {isPending ? "Signing up..." : "Sign Up"}
                </button>

                {error && <p className="text-red-500 mt-2">{error.message}</p>}

                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login here
                    </a>
                </p>
            </form>
        </div>
    );
}
