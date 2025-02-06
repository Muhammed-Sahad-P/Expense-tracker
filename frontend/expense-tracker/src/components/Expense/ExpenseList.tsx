"use client";

import { useState } from "react";
import { useGetExpenses, useUpdateExpense, useDeleteExpense } from "@/lib/query/ExpenseQuery";
import { CreditCard, Calendar, Tag, Pencil, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

interface Expense {
    id: number;
    title: string;
    amount: string;
    description: string;
    category: string;
    date: string;
}

const EditExpenseForm = ({ expense, onClose }: { expense: Expense; onClose: () => void }) => {
    const [title, setTitle] = useState(expense.description);
    const [expenseAmount, setExpenseAmount] = useState(expense.amount);
    const [category, setCategory] = useState(expense.category);
    const { mutate: updateExpense } = useUpdateExpense();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateExpense({
            id: expense.id,
            data: {
                description: title,
                amount: Number(expenseAmount),
                category,
                date: new Date().toISOString().slice(0, 19).replace("T", " ")
            }
        });
        onClose();
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
                    Update Expense
                </button>
            </div>
        </form>
    );
};

export default function ExpenseList() {
    const { data: expenses, isLoading, error } = useGetExpenses();
    const { mutate: deleteExpense } = useDeleteExpense();
    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null);

    if (isLoading) return <p className="text-center text-gray-500">Loading expenses...</p>;
    if (error) return <p className="text-center text-red-500">Failed to load expenses.</p>;

    if (!Array.isArray(expenses) || expenses.length === 0) {
        return <p className="text-center text-gray-500">No expenses found.</p>;
    }

    const handleDelete = (id: number) => {
        setExpenseToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (expenseToDelete) {
            deleteExpense(expenseToDelete);
            setIsDeleteDialogOpen(false);
            setExpenseToDelete(null);
        }
    };

    const handleEdit = (expense: Expense) => {
        setSelectedExpense(expense);
        setIsEditDialogOpen(true);
    };

    return (
        <div className="max-w-lg mx-auto mt-6">
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="bg-[#1D2329] border border-gray-700 text-white shadow-xl rounded-lg max-w-lg p-6">
                    <DialogHeader>
                        <DialogTitle className="text-[#FAD350] text-lg font-semibold flex items-center gap-2">
                            <Pencil className="text-[#FAD350]" /> Edit Expense
                        </DialogTitle>
                    </DialogHeader>
                    {selectedExpense && (
                        <EditExpenseForm
                            expense={selectedExpense}
                            onClose={() => setIsEditDialogOpen(false)}
                        />
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="bg-[#1D2329] border border-gray-700 text-white shadow-xl rounded-lg max-w-lg p-6">
                    <DialogHeader>
                        <DialogTitle className="text-red-500 text-lg font-semibold flex items-center gap-2">
                            <Trash2 className="text-red-500" /> Delete Expense
                        </DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-gray-300">Are you sure you want to delete this expense? This action cannot be undone.</p>
                    </div>
                    <DialogFooter className="flex gap-2 justify-end">
                        <button
                            onClick={() => setIsDeleteDialogOpen(false)}
                            className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDelete}
                            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                        >
                            Delete
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <ul className="space-y-3">
                {expenses.map((expense: Expense) => (
                    <li key={expense.id} className="bg-[#3A4046] shadow-lg rounded-lg p-2 flex items-center justify-between">
                        <div>
                            <p className="text-white text-sm font-semibold flex items-center gap-2">
                                <CreditCard className="text-red-500" size={16} /> {expense.description}
                            </p>
                            <p className="text-black flex items-center gap-2 text-sm">
                                <Calendar className="text-[#FAD350]" size={16} />
                                {new Date(expense.date).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div>
                                <span className="bg-blue-100 text-red-600 text-[10px] p-1 rounded-md flex items-center gap-1">
                                    <Tag size={12} /> {expense.category}
                                </span>
                                <p className="text-md font-poppins text-white">₹{expense.amount}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                                    onClick={() => handleEdit(expense)}
                                >
                                    <Pencil className="text-[#FAD350]" size={16} />
                                </button>
                                <button
                                    className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                                    onClick={() => handleDelete(expense.id)}
                                >
                                    <Trash2 className="text-red-500" size={16} />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}