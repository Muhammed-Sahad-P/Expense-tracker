"use client";

import { useState } from "react";
import { useAddIncome } from "@/lib/query/IncomeQuery";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";

export default function AddIncome() {
    const [source, setSource] = useState("");
    const [amount, setAmount] = useState("");
    const { mutate } = useAddIncome();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ source, amount: Number(amount), date: new Date().toISOString() });
        setSource("");
        setAmount("");
    };

    return (
        <Dialog>
            <DialogTrigger className="bg-[#FAD350] text-black font-semibold p-3 rounded-md w-full flex items-center justify-center gap-2 hover:bg-[#e5c144] transition">
                <PlusCircle className="h-5 w-5" />
                Add Income
            </DialogTrigger>

            <DialogContent className="bg-[#1D2329] border border-gray-700 text-white shadow-xl rounded-lg max-w-lg p-6">
                <DialogHeader>
                    <DialogTitle className="text-[#FAD350] text-lg font-semibold flex items-center gap-2">
                        <PlusCircle className="text-[#FAD350]" /> Add New Income
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Income Source"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        required
                        className="p-3 border border-gray-600 bg-[#2A2F36] text-white rounded-md w-full focus:ring-2 focus:ring-[#FAD350] outline-none shadow-sm"
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        className="p-3 border border-gray-600 bg-[#2A2F36] text-white rounded-md w-full focus:ring-2 focus:ring-[#FAD350] outline-none shadow-sm"
                    />

                    <div className="flex justify-end gap-2">
                        <DialogClose className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition">
                            Cancel
                        </DialogClose>
                        <button type="submit" className="bg-[#FAD350] text-black font-semibold px-4 py-2 rounded-md hover:bg-[#e5c144] transition">
                            Add Income
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
