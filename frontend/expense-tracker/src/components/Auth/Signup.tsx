"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signup } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
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
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-900 to-gray-700 p-6">
            <Card className="w-full max-w-md bg-gray-800 shadow-lg rounded-xl p-8 border border-gray-700">
                <CardHeader>
                    <h2 className="text-3xl font-bold text-center text-yellow-400 mb-2">Create Account</h2>
                    <p className="text-center text-gray-400 text-sm">Join us and start tracking your expenses easily.</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-yellow-300">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Choose a username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="mt-1 p-3 w-full border rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-yellow-300">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 p-3 w-full border rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-yellow-300">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="mt-1 p-3 w-full border rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:outline-none pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="text-sm text-red-500 bg-red-900 p-2 rounded-lg border border-red-600 text-center">
                                {error instanceof Error ? error.message : "An error occurred"}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-yellow-500 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
                        >
                            {isPending ? "Creating Account..." : "Sign Up"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-gray-300">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="text-yellow-400 hover:underline font-medium transition"
                        >
                            Login
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
