"use client";

import { useGetExpenses } from "@/lib/queries";
import { CreditCard, Calendar, Tag } from "lucide-react";

interface Expense {
    id: number;
    amount: string;
    description: string;
    category: string;
    date: string;
}

export default function ExpenseList() {
    const { data: expenses, isLoading, error } = useGetExpenses();

    if (isLoading) return <p className="text-center text-gray-500">Loading expenses...</p>;
    if (error) return <p className="text-center text-red-500">Failed to load expenses.</p>;

    if (!Array.isArray(expenses) || expenses.length === 0) {
        return <p className="text-center text-gray-500">No expenses found.</p>;
    }

    return (
        <div className="max-w-lg mx-auto mt-6">
            <ul className="space-y-3">
                {expenses.map((expense: Expense) => (
                    <li key={expense.id} className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-between">
                        <div>
                            <p className="text-gray-800 font-semibold flex items-center gap-2">
                                <CreditCard className="text-red-500" size={18} /> {expense.description}
                            </p>
                            <p className="text-black flex items-center gap-2 text-sm">
                                <Calendar className="text-gray-400" size={16} />
                                {new Date(expense.date).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <span className="bg-blue-100 text-red-600 text-sm px-3 py-1 rounded-md flex items-center gap-1">
                                <Tag size={14} /> {expense.category}
                            </span>
                            <p className="text-lg font-bold text-gray-900">${expense.amount}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
