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
    uniqueId: string; 
}

export default function AllTransactions() {
    const { data: expenses = [], isLoading: loadingExpenses, error: errorExpenses } = useGetExpenses();
    const { data: incomes = [], isLoading: loadingIncomes, error: errorIncomes } = useGetIncomes();

    const isLoading = loadingExpenses || loadingIncomes;
    const error = errorExpenses || errorIncomes;

    const formattedExpenses = expenses.map((expense: Expense) => ({
        ...expense,
        type: "expense",
        uniqueId: `expense-${expense.id}`,
    }));

    const formattedIncomes = incomes.map((income: Income) => ({
        ...income,
        type: "income",
        uniqueId: `income-${income.id}`,
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
            <div className="flex items-center justify-center min-h-screen bg-white">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white p-4">
                <div className="bg-red-50 rounded-lg p-6 text-red-600 text-center border border-red-100">
                    Error fetching transactions. Please try again later.
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-6 border border-indigo-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600">Total Income</p>
                                <p className="text-2xl font-bold text-indigo-600">
                                    +₹{totalIncome.toLocaleString()}
                                </p>
                            </div>
                            <div className="p-3 bg-indigo-50 rounded-full">
                                <TrendingUp className="w-6 h-6 text-indigo-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-indigo-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600">Total Expense</p>
                                <p className="text-2xl font-bold text-indigo-400">
                                    -₹{totalExpense.toLocaleString()}
                                </p>
                            </div>
                            <div className="p-3 bg-indigo-50 rounded-full">
                                <TrendingDown className="w-6 h-6 text-indigo-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-indigo-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600">Balance</p>
                                <p className={`text-2xl font-bold ${balance >= 0 ? "text-indigo-600" : "text-indigo-400"}`}>
                                    ₹{balance.toLocaleString()}
                                </p>
                            </div>
                            <div className="p-3 bg-indigo-50 rounded-full">
                                <Wallet className={`w-6 h-6 ${balance >= 0 ? "text-indigo-600" : "text-indigo-400"}`} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-indigo-100 shadow-sm">
                    <div className="p-6 border-b border-indigo-100">
                        <h2 className="text-xl font-bold text-gray-900">All Transactions</h2>
                    </div>

                    <ScrollArea className="h-[calc(100vh-24rem)] p-6">
                        {transactions.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">
                                No transactions found
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {transactions.map((transaction) => {
                                    const isIncome = transaction.type === "income";
                                    return (
                                        <div
                                            key={transaction.uniqueId}
                                            className="group relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-50/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                            <div className="relative flex items-center justify-between p-4 rounded-lg bg-white hover:bg-indigo-50/50 transition-colors border border-indigo-100">
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-2 rounded-full ${isIncome ? 'bg-indigo-50' : 'bg-indigo-50'}`}>
                                                        {isIncome ? (
                                                            <ArrowUpCircle className="w-6 h-6 text-indigo-600" />
                                                        ) : (
                                                            <ArrowDownCircle className="w-6 h-6 text-indigo-400" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {transaction.description || transaction.source}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {new Date(transaction.date).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className={`text-lg font-bold ${isIncome ? 'text-indigo-600' : 'text-indigo-400'}`}>
                                                    {isIncome ? '+' : '-'}₹{parseFloat(transaction.amount).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}
