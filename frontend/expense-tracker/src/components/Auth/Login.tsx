"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/auth";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ErrorResponse {
    response: {
        data: {
            message: string;
        };
    };
}

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
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
        <div className="flex min-h-screen items-center justify-center bg-white">
            <Card className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-gray-700">
                <CardHeader>
                    <h2 className="text-3xl font-bold text-center text-indigo-600 mb-2">Welcome Back</h2>
                    <p className="text-center text-black text-sm">Login to continue tracking your expenses.</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-indigo-600 text-[12px]">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="mt-1 p-3 w-full border rounded-lg bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-indigo-600 text-[12px]">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="mt-1 p-3 w-full border rounded-lg bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="text-sm text-red-500 p-2 rounded-lg text-center">
                                {((error as unknown) as ErrorResponse).response?.data?.message || "Something went wrong. Please try again."}
                            </p>
                        )}

                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-indigo-600 text-gray-900 py-3 rounded-lg font-semibold hover:bg-indigo-600/80 transition"
                        >
                            {isPending ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-black gray-300">
                        Don&apos;t have an account?{" "}
                        <a
                            href="/register"
                            className="text-indigo-600 hover:underline font-medium transition"
                        >
                            Sign up
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
