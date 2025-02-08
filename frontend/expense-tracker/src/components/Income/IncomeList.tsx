"use client";

import { useState } from "react";
import { useGetIncomes, useUpdateIncome, useDeleteIncome } from "@/lib/query/IncomeQuery";
import { Calendar, Tag, Pencil, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

interface Income {
    id: number;
    amount: string;
    description: string;
    source: string;
    date: string;
}

const EditIncomeForm = ({ income, onClose }: { income: Income; onClose: () => void }) => {
    const [incomeAmount, setIncomeAmount] = useState(income.amount);
    const [source, setSource] = useState(income.source);
    const { mutate: updateIncome } = useUpdateIncome();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateIncome({
            id: income.id,
            data: {
                amount: Number(incomeAmount),
                source,
                date: new Date().toISOString().slice(0, 19).replace("T", " ")
            }
        });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm w-full mx-auto">
            <input
                type="text"
                placeholder="Source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                required
                className="p-3 border border-gray-600 bg-white text-black rounded-md w-full focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm sm:text-base text-sm"
            />
            <input
                type="number"
                placeholder="Amount"
                value={incomeAmount}
                onChange={(e) => setIncomeAmount(e.target.value)}
                required
                className="p-3 border border-gray-600 bg-white text-black rounded-md w-full focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm sm:text-base text-sm"
            />
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-indigo-600 text-black font-semibold px-4 sm:px-6 py-2 rounded-md hover:bg-indigo-600/80 transition"
                >
                    Update Income
                </button>
            </div>
        </form>

    );
};

export default function IncomeList() {
    const { data: incomes, isLoading, error } = useGetIncomes();
    const { mutate: deleteIncome } = useDeleteIncome();
    const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [incomeToDelete, setIncomeToDelete] = useState<number | null>(null);

    if (isLoading) return <p className="text-center text-gray-500">Loading incomes...</p>;
    if (error) return <p className="text-center text-red-500">Failed to load incomes.</p>;

    if (!Array.isArray(incomes) || incomes.length === 0) {
        return <p className="text-center text-gray-500">No incomes found.</p>;
    }

    const handleDelete = (id: number) => {
        setIncomeToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (incomeToDelete) {
            deleteIncome(incomeToDelete);
            setIsDeleteDialogOpen(false);
            setIncomeToDelete(null);
        }
    };

    const handleEdit = (income: Income) => {
        setSelectedIncome(income);
        setIsEditDialogOpen(true);
    };

    return (
        <div className="max-w-4xl mx-auto mt-6 p-4">
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white border border-gray-700 text-black shadow-xl rounded-lg p-6 overflow-y-auto max-h-[80vh]">
                    <DialogHeader>
                        <DialogTitle className="text-indigo-600 text-lg font-semibold flex items-center gap-2">
                            <Pencil className="text-indigo-600" /> Edit Income
                        </DialogTitle>
                    </DialogHeader>
                    {selectedIncome && (
                        <EditIncomeForm
                            income={selectedIncome}
                            onClose={() => setIsEditDialogOpen(false)}
                        />
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white border border-gray-700 text-black shadow-xl rounded-lg p-6 overflow-y-auto max-h-[80vh]">
                    <DialogHeader>
                        <DialogTitle className="text-indigo-600 text-lg font-semibold flex items-center gap-2">
                            <Trash2 className="text-indigo-600" /> Delete Income
                        </DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-black">Are you sure you want to delete this income? This action cannot be undone.</p>
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
                {incomes.map((income: Income) => (
                    <li key={income.id} className="bg-white shadow-xl rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between gap-3">
                        <div className="flex-1">
                            <p className="text-black text-sm font-semibold">{income.description}</p>
                            <p className="text-black flex items-center gap-2 text-sm">
                                <Calendar className="text-indigo-600" size={16} />
                                {new Date(income.date).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="bg-blue-100 text-green-600 text-xs p-1 rounded-md flex items-center gap-1">
                                <Tag size={12} /> {income.source}
                            </span>
                            <p className="text-md font-poppins text-black">₹{income.amount}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => handleEdit(income)} className="hover:bg-gray-100 p-1 rounded-full">
                                <Pencil className="text-indigo-600" size={16} />
                            </button>
                            <button onClick={() => handleDelete(income.id)} className="hover:bg-gray-100 p-1 rounded-full">
                                <Trash2 className="text-red-500" size={16} />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
