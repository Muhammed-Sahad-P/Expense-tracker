'use client';

import { useGetExpenses } from '@/lib/queries';

interface Expense {
    id: number;
    amount: string;
    description: string;
    category: string;
    date: string;
}

export default function ExpenseList() {
    const { data: expenses, isLoading, error } = useGetExpenses();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Failed to load expenses.</p>;

    if (!Array.isArray(expenses)) {
        return <p>No expenses found.</p>;
    }

    return (
        <ul className="mt-4">
            {expenses.map((expense: Expense) => (
                <li key={expense.id} className="border p-2 rounded mb-2">
                    {expense.description} - ${expense.amount} ({expense.category})
                </li>
            ))}
        </ul>
    );
}
