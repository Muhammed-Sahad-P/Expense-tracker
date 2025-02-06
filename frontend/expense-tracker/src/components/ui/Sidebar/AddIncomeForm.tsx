import { useState } from "react";
import { useAddIncome } from "@/lib/query/IncomeQuery";

export const AddIncomeForm = () => {
    const [source, setSource] = useState("");
    const [amount, setAmount] = useState("");
    const { mutate: mutateIncome } = useAddIncome();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!source.trim()) {
            alert("Income source is required");
            return;
        }

        mutateIncome({
            source,
            amount: Number(amount),
            date: new Date().toISOString(),
        });
        setSource("");
        setAmount("");
    };

    return (
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
                <button
                    type="submit"
                    className="bg-[#FAD350] text-black font-semibold px-4 py-2 rounded-md hover:bg-[#e5c144] transition"
                >
                    Add Income
                </button>
            </div>
        </form>
    );
};