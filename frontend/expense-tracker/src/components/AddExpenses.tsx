'use client';

import { useState } from 'react';
import { useAddExpense } from '@/lib/queries';

export default function AddExpense() {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const { mutate } = useAddExpense();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ title, amount: Number(amount), category, date: new Date().toISOString() });
        setTitle('');
        setAmount('');
        setCategory('');
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded">
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="p-2 border rounded w-full mb-2" />
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required className="p-2 border rounded w-full mb-2" />
            <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required className="p-2 border rounded w-full mb-2" />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Add Expense</button>
        </form>
    );
}
