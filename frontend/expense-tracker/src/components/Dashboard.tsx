"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import ExpenseList from "@/components/ExpenseList";
import IncomeList from "./Income/IncomeList";

const data = [
    { name: "Jan", Income: 4000, Expenses: 2400 },
    { name: "Feb", Income: 3000, Expenses: 1398 },
    { name: "Mar", Income: 5000, Expenses: 2210 },
    { name: "Apr", Income: 4780, Expenses: 2908 },
    { name: "May", Income: 5890, Expenses: 4800 },
    { name: "Jun", Income: 4390, Expenses: 3800 },
];

export default function Dashboard() {
    return (
        <div className="p-6 mt-12">
            <h2 className="text-2xl font-bold mb-4">Expense & Income Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Incomes</h2>
                    <IncomeList />
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Expenses</h2>
                    <ExpenseList />
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Income vs Expenses</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <XAxis dataKey="name" stroke="#8884d8" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Income" fill="#4CAF50" barSize={30} />
                            <Bar dataKey="Expenses" fill="#F44336" barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
}
