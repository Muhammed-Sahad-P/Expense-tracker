import { useState } from "react";
import { useAddExpense } from "@/lib/query/ExpenseQuery";

export const AddExpenseForm = () => {
    const [title, setTitle] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");
    const [category, setCategory] = useState("");
    const { mutate: mutateExpense } = useAddExpense();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutateExpense({ title, amount: Number(expenseAmount), category, date: new Date().toISOString() });
        setTitle("");
        setExpenseAmount("");
        setCategory("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Description"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="p-3 border border-gray-600 bg-[#2A2F36] text-white rounded-md w-full focus:ring-2 focus:ring-[#FAD350] outline-none shadow-sm"
            />
            <input
                type="number"
                placeholder="Amount"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                required
                className="p-3 border border-gray-600 bg-[#2A2F36] text-white rounded-md w-full focus:ring-2 focus:ring-[#FAD350] outline-none shadow-sm"
            />
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="p-3 border border-gray-600 bg-[#2A2F36] text-white rounded-md w-full focus:ring-2 focus:ring-[#FAD350] outline-none shadow-sm"
            />
            <div className="flex justify-end gap-2">
                <button
                    type="submit"
                    className="bg-[#FAD350] text-black font-semibold px-4 py-2 rounded-md hover:bg-[#e5c144] transition"
                >
                    Add Expense
                </button>
            </div>
        </form>
    );
};