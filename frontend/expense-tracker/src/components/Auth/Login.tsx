'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/lib/auth';
import { useAuthStore } from '@/lib/store/useAuthStore';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useAuthStore();
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
            }
        },
    });


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ username, password });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="p-2 border rounded w-full mb-2" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="p-2 border rounded w-full mb-2" />
            <button type="submit" disabled={isPending} className="bg-green-500 text-white p-2 rounded w-full">
                {isPending ? 'Logging in...' : 'Login'}
            </button>
            {error && <p className="text-red-500">{error.message}</p>}
        </form>
    );
}
