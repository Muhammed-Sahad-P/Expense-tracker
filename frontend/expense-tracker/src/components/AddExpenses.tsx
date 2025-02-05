"use client";

import { useState } from "react";
import { useAddExpense } from "@/lib/queries";
import { PlusCircle } from "lucide-react";

export default function AddExpense() {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const { mutate } = useAddExpense();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ title, amount: Number(amount), category, date: new Date().toISOString() });
        setTitle("");
        setAmount("");
        setCategory("");
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <PlusCircle className="text-blue-500" /> Add New Expense
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Description"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
                />
                <button type="submit" className="bg-blue-500 text-white p-3 rounded-md w-full hover:bg-blue-600 transition">
                    Add Expense
                </button>
            </form>
        </div>
    );
}
