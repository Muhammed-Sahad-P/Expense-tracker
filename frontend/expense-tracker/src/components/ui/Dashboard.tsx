"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import IncomeList from "../Income/IncomeList";
import ExpenseList from "../Expense/ExpenseList";

const data = [
    { name: "Jan", Income: 4000, Expenses: 2400 },
    { name: "Feb", Income: 3000, Expenses: 1398 },
    { name: "Mar", Income: 5000, Expenses: 2210 },
    { name: "Apr", Income: 4780, Expenses: 2908 },
    { name: "May", Income: 5890, Expenses: 4800 },
    { name: "Jun", Income: 4390, Expenses: 3800 },
];

const totalIncome = data.reduce((sum, item) => sum + item.Income, 0);
const totalExpenses = data.reduce((sum, item) => sum + item.Expenses, 0);

const pieData = [
    { name: "Income", value: totalIncome },
    { name: "Expenses", value: totalExpenses },
];

const COLORS = ["#16A34A", "#DC2626"];

export default function Dashboard() {
    return (
        <div className="flex flex-col p-6 text-center font-poppins bg-[#3A4046] h-[calc(100vh-4rem)] ">
            <h2 className="text-3xl font-extrabold text-[#FAD350] mb-6">Expense & Income Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-xl font-semibold text-[#FAD350] mb-2">Recent Incomes</h2>
                    <div className="bg-[#1D2329] shadow-lg rounded-xl p-4 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                        <IncomeList />
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-[#FAD350] mb-2">Recent Expenses</h2>
                    <div className="bg-[#1D2329] shadow-lg rounded-xl p-4 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                        <ExpenseList />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 mt-6">
                <div className="bg-[#1D2329] shadow-lg rounded-xl p-6 flex flex-col items-center justify-center h-[350px]">
                    <h2 className="text-xl font-semibold text-[#FAD350] mb-4">Income vs Expenses Breakdown</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={100}
                                paddingAngle={2}
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-[#1D2329] shadow-lg rounded-xl p-6 flex flex-col items-center justify-center h-[350px]">
                    <h2 className="text-xl font-semibold text-[#FAD350] mb-4">Income vs Expenses</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={data}>
                            <XAxis dataKey="name" stroke="#8884d8" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Income" fill="url(#incomeGradient)" barSize={40} radius={[10, 10, 0, 0]} />
                            <Bar dataKey="Expenses" fill="url(#expensesGradient)" barSize={40} radius={[10, 10, 0, 0]} />
                            <defs>
                                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#16A34A" stopOpacity={0.9} />
                                    <stop offset="100%" stopColor="#16A34A" stopOpacity={0.4} />
                                </linearGradient>
                                <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#DC2626" stopOpacity={0.9} />
                                    <stop offset="100%" stopColor="#DC2626" stopOpacity={0.4} />
                                </linearGradient>
                            </defs>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
