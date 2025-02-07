"use client";

import React from "react";
import { useGetExpenses } from "@/lib/query/ExpenseQuery";
import { useGetIncomes } from "@/lib/query/IncomeQuery";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpCircle, ArrowDownCircle, Wallet, TrendingUp, TrendingDown, Loader2 } from "lucide-react";

interface Income {
    id: number;
    amount: string;
    description: string;
    source: string;
    date: string;
}

interface Expense {
    id: number;
    title: string;
    amount: string;
    description: string;
    category: string;
    date: string;
}

interface Transaction extends Income, Expense {
    type: "income" | "expense";
}

export default function AllTransactions() {
    const { data: expenses = [], isLoading: loadingExpenses, error: errorExpenses } = useGetExpenses();
    const { data: incomes = [], isLoading: loadingIncomes, error: errorIncomes } = useGetIncomes();

    const isLoading = loadingExpenses || loadingIncomes;
    const error = errorExpenses || errorIncomes;

    const formattedExpenses = expenses.map((expense: Expense) => ({
        ...expense,
        type: "expense",
    }));

    const formattedIncomes = incomes.map((income: Income) => ({
        ...income,
        type: "income",
    }));

    const transactions: Transaction[] = [...formattedExpenses, ...formattedIncomes]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


    const totalIncome = incomes.reduce((sum: number, income: Income) =>
        sum + parseFloat(income.amount || "0"), 0
    );

    const totalExpense = expenses.reduce((sum: number, expense: Expense) =>
        sum + parseFloat(expense.amount || "0"), 0
    );

    const balance = totalIncome - totalExpense;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
                <div className="backdrop-blur-xl bg-black/30 rounded-lg p-6 text-red-400 text-center">
                    Error fetching transactions. Please try again later.
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="max-w-6xl mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="backdrop-blur-xl bg-black/30 rounded-lg p-6 border border-white/10">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400">Total Income</p>
                                <p className="text-2xl font-bold text-emerald-400">
                                    +₹{totalIncome.toLocaleString()}
                                </p>
                            </div>
                            <div className="p-3 bg-emerald-500/20 rounded-full">
                                <TrendingUp className="w-6 h-6 text-emerald-500" />
                            </div>
                        </div>
                    </div>

                    <div className="backdrop-blur-xl bg-black/30 rounded-lg p-6 border border-white/10">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400">Total Expense</p>
                                <p className="text-2xl font-bold text-red-400">
                                    -₹{totalExpense.toLocaleString()}
                                </p>
                            </div>
                            <div className="p-3 bg-red-500/20 rounded-full">
                                <TrendingDown className="w-6 h-6 text-red-500" />
                            </div>
                        </div>
                    </div>

                    <div className="backdrop-blur-xl bg-black/30 rounded-lg p-6 border border-white/10">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400">Balance</p>
                                <p className={`text-2xl font-bold ${balance >= 0 ? "text-emerald-400" : "text-red-400"
                                    }`}>
                                    ₹{balance.toLocaleString()}
                                </p>
                            </div>
                            <div className={`p-3 rounded-full ${balance >= 0 ? "bg-emerald-500/20" : "bg-red-500/20"
                                }`}>
                                <Wallet className={`w-6 h-6 ${balance >= 0 ? "text-emerald-500" : "text-red-500"
                                    }`} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="backdrop-blur-xl bg-black/30 rounded-lg border border-white/10">
                    <div className="p-6 border-b border-white/10">
                        <h2 className="text-xl font-bold text-white">All Transactions</h2>
                    </div>

                    <ScrollArea className="h-[calc(100vh-24rem)] p-6">
                        {transactions.length === 0 ? (
                            <p className="text-gray-400 text-center py-8">
                                No transactions found
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {transactions.map((transaction) => {
                                    const isIncome = transaction.type === "income";
                                    return (
                                        <div
                                            key={transaction.id}
                                            className="group relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                            <div className="relative flex items-center justify-between p-4 rounded-lg backdrop-blur-md bg-white/5 hover:bg-white/10 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-2 rounded-full ${isIncome ? 'bg-emerald-500/20' : 'bg-red-500/20'
                                                        }`}>
                                                        {isIncome ? (
                                                            <ArrowUpCircle className="w-6 h-6 text-emerald-500" />
                                                        ) : (
                                                            <ArrowDownCircle className="w-6 h-6 text-red-500" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-white">
                                                            {transaction.description || transaction.source}
                                                        </p>
                                                        <p className="text-sm text-gray-400">
                                                            {new Date(transaction.date).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className={`text-lg font-bold ${isIncome ? 'text-emerald-400' : 'text-red-400'
                                                    }`}>
                                                    {isIncome ? '+' : '-'}₹{parseFloat(transaction.amount).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                }
                                )}
                            </div>
                        )}
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}