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
        <form onSubmit={handleSubmit} className="space-y-3">
            <input
                type="text"
                placeholder="Description"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="p-2 border border-gray-600 bg-white text-black rounded-md w-full focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            />
            <input
                type="number"
                placeholder="Amount"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                required
                className="p-2 border border-gray-600 bg-white text-black rounded-md w-full focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            />
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="p-2 border border-gray-600 bg-white text-black rounded-md w-full focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            />
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-indigo-600 text-black font-semibold px-3 py-2 rounded-md hover:bg-indigo-600/80 transition"
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
        <div className="max-w-4xl mx-auto mt-6 p-4">
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white border border-gray-700 text-black shadow-xl rounded-lg p-6 overflow-y-auto max-h-[80vh]">
                    <DialogHeader>
                        <DialogTitle className="text-indigo-600 text-lg font-semibold flex items-center gap-2">
                            <Pencil className="text-indigo-600" /> Edit Expense
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
                <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white border border-gray-700 text-black shadow-xl rounded-lg p-6 overflow-y-auto max-h-[80vh]">
                    <DialogHeader>
                        <DialogTitle className="text-indigo-600 text-lg font-semibold flex items-center gap-2">
                            <Trash2 className="text-indigo-600" /> Delete Expense
                        </DialogTitle>
                    </DialogHeader>
                    <div className="py-4 text-md">
                        <p className="text-black">Are you sure you want to delete this expense? This action cannot be undone.</p>
                    </div>
                    <DialogFooter className="flex gap-2 justify-end mt-4">
                        <button
                            onClick={() => setIsDeleteDialogOpen(false)}
                            className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDelete}
                            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
                        >
                            Delete
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <ul className="space-y-3">
                {expenses.map((expense: Expense) => (
                    <li key={expense.id} className="bg-white shadow-xl rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between gap-3">
                        <div className="flex-1">
                            <p className="text-black text-sm font-semibold flex items-center gap-2">
                                <CreditCard className="text-indigo-600" size={16} /> {expense.description}
                            </p>
                            <p className="text-black flex items-center gap-2 text-sm">
                                <Calendar className="text-indigo-600" size={16} />
                                {new Date(expense.date).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="bg-blue-100 text-red-600 text-xs p-1 rounded-md flex items-center gap-1">
                                <Tag size={12} /> {expense.category}
                            </span>
                            <p className="text-md font-poppins text-black">₹{expense.amount}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => handleEdit(expense)}><Pencil className="text-indigo-600" size={16} /></button>
                            <button onClick={() => handleDelete(expense.id)}><Trash2 className="text-red-500" size={16} /></button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
