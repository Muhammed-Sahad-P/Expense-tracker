"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useAddIncome } from "@/lib/query/IncomeQuery";

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
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <PlusCircle className="text-blue-500" /> Add New Income
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Description"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
          className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
        />
        <button type="submit" className="bg-blue-500 text-white p-3 rounded-md w-full hover:bg-blue-600 transition">
          Add Income
        </button>
      </form>
    </div>
  );
}
