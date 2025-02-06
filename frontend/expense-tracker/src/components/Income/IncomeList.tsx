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
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                required
                className="p-3 border border-gray-600 bg-[#2A2F36] text-white rounded-md w-full focus:ring-2 focus:ring-[#FAD350] outline-none shadow-sm"
            />
            <input
                type="number"
                placeholder="Amount"
                value={incomeAmount}
                onChange={(e) => setIncomeAmount(e.target.value)}
                required
                className="p-3 border border-gray-600 bg-[#2A2F36] text-white rounded-md w-full focus:ring-2 focus:ring-[#FAD350] outline-none shadow-sm"
            />
            <div className="flex justify-end gap-2">
                <button
                    type="submit"
                    className="bg-[#FAD350] text-black font-semibold px-4 py-2 rounded-md hover:bg-[#e5c144] transition"
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
        <div className="max-w-lg mx-auto mt-6">
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="bg-[#1D2329] border border-gray-700 text-white shadow-xl rounded-lg max-w-lg p-6">
                    <DialogHeader>
                        <DialogTitle className="text-[#FAD350] text-lg font-semibold flex items-center gap-2">
                            <Pencil className="text-[#FAD350]" /> Edit Income
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
                <DialogContent className="bg-[#1D2329] border border-gray-700 text-white shadow-xl rounded-lg max-w-lg p-6">
                    <DialogHeader>
                        <DialogTitle className="text-red-500 text-lg font-semibold flex items-center gap-2">
                            <Trash2 className="text-red-500" /> Delete Income
                        </DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-gray-300">Are you sure you want to delete this income? This action cannot be undone.</p>
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
                {incomes.map((income: Income) => (
                    <li key={income.id} className="bg-[#3A4046] shadow-lg rounded-lg p-2 flex items-center justify-between">
                        <div>
                            <p className="text-white text-sm font-semibold">{income.description}</p>
                            <p className="text-black flex items-center gap-2 text-sm">
                                <Calendar className="text-[#FAD350]" size={16} />
                                {new Date(income.date).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div>
                                <span className="bg-blue-100 text-green-600 text-[10px] p-1 rounded-md flex items-center gap-1">
                                    <Tag size={12} /> {income.source}
                                </span>
                                <p className="text-md font-poppins text-white">₹{income.amount}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                                    onClick={() => { }}
                                >
                                    <Pencil onClick={() => handleEdit(income)} className="text-[#FAD350]" size={16} />
                                </button>
                                <button
                                    className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                                    onClick={() => { }}
                                >
                                    <Trash2 onClick={() => handleDelete(income.id)} className="text-red-500" size={16} />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
