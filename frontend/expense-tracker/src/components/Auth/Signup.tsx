'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { signup } from '@/lib/auth';
import { useAuthStore } from '@/lib/store/useAuthStore';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useAuthStore();

    const { mutate, isPending, error } = useMutation({
        mutationFn: signup,
        onSuccess: (data) => {
            setUser({ username: data.username, email: data.email });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ username, email, password });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="p-2 border rounded w-full mb-2" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="p-2 border rounded w-full mb-2" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="p-2 border rounded w-full mb-2" />
            <button type="submit" disabled={isPending} className="bg-blue-500 text-white p-2 rounded w-full">
                {isPending ? 'Signing up...' : 'Sign Up'}
            </button>
            {error && <p className="text-red-500">{error.message}</p>}
        </form>
    );
}
