"use client";

import { useGetIncomes } from "@/lib/query/IncomeQuery";
import { Calendar, Tag } from "lucide-react";

interface Income {
    id: number;
    amount: string;
    description: string;
    source: string;
    date: string;
}

export default function IncomeList() {
    const { data: incomes, isLoading, error } = useGetIncomes();

    if (isLoading) return <p className="text-center text-gray-500">Loading incomes...</p>;
    if (error) return <p className="text-center text-red-500">Failed to load incomes.</p>;

    if (!Array.isArray(incomes) || incomes.length === 0) {
        return <p className="text-center text-gray-500">No incomes found.</p>;
    }

    return (
        <div className="max-w-lg mx-auto mt-6">
            <ul className="space-y-3">
                {incomes.map((income: Income) => (
                    <li key={income.id} className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-between">
                        <div>
                            <p className="text-black flex items-center gap-2 text-sm">
                                <Calendar className="text-black" size={16} />
                                {new Date(income.date).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <span className="bg-blue-100 text-green-600 text-sm px-3 py-1 rounded-md flex items-center gap-1">
                                <Tag size={14} /> {income.source}
                            </span>
                            <p className="text-lg font-bold text-gray-900">${income.amount}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
