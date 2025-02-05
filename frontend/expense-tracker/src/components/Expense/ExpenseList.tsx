"use client";

import { useGetExpenses } from "@/lib/query/ExpenseQuery";
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
                    <li key={expense.id} className="bg-[#3A4046] shadow-lg rounded-lg p-4 flex items-center justify-between">
                        <div>
                            <p className="text-white text-sm font-semibold flex items-center gap-2">
                                <CreditCard className="text-red-500" size={16} /> {expense.description}
                            </p>
                            <p className="text-black flex items-center gap-2 text-sm">
                                <Calendar className="text-[#FAD350]" size={16} />
                                {new Date(expense.date).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <span className="bg-blue-100 text-red-600 text-[10px] p-1 rounded-md flex items-center gap-1">
                                <Tag size={12} /> {expense.category}
                            </span>
                            <p className="text-md font-poppins text-white">₹{expense.amount}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
