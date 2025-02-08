import { useState } from "react";
import { useAddIncome } from "@/lib/query/IncomeQuery";

export const AddIncomeForm = ({ onSuccess }: { onSuccess: () => void }) => {
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
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input
                type="text"
                placeholder="Income Source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                required
                className="p-3 border border-black bg-white text-black rounded-md w-full focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="p-3 border border-black bg-white text-black rounded-md w-full focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            />
            <div className="flex justify-end gap-2 pt-2">
                <button
                    type="submit"
                    className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-600/80 transition"
                >
                    Add Income
                </button>
            </div>
        </form>
    );
};
