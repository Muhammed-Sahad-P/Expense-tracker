'use client';

import { useGetExpenses } from '@/lib/queries';

interface Expense {
    id: string;
    title: string;
    amount: number;
    category: string;
}

export default function ExpenseList() {
    const { data: expenses, isLoading, error } = useGetExpenses();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Failed to load expenses.</p>;

    return (
        <ul className="mt-4">
            {expenses?.map((expense: Expense) => (
                <li key={expense.id} className="border p-2 rounded mb-2">
                    {expense.title} - ${expense.amount} ({expense.category})
                </li>
            ))}
        </ul>
    );
}
