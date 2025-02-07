"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import IncomeList from "../Income/IncomeList";
import ExpenseList from "../Expense/ExpenseList";
import { useGetExpenses } from "@/lib/query/ExpenseQuery";
import { useGetIncomes } from "@/lib/query/IncomeQuery";

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

interface MonthlyData {
    name: string;
    Income: number;
    Expenses: number;
}

interface PieChartData {
    name: string;
    value: number;
}

const COLORS = ["#16A34A", "#DC2626"];

export default function Dashboard() {
    const { data: expenses = [] } = useGetExpenses();
    const { data: incomes = [] } = useGetIncomes();

    const totalIncome = incomes.reduce((sum: number, income: Income) =>
        sum + parseFloat(income.amount || "0"), 0
    );

    const totalExpenses = expenses.reduce((sum: number, expense: Expense) =>
        sum + parseFloat(expense.amount || "0"), 0
    );

    const pieData: PieChartData[] = [
        { name: "Income", value: totalIncome },
        { name: "Expenses", value: totalExpenses },
    ];

    const processMonthlyData = (): MonthlyData[] => {
        const monthlyData: Record<string, MonthlyData> = {};
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        months.forEach(month => {
            monthlyData[month] = { name: month, Income: 0, Expenses: 0 };
        });

        incomes.forEach((income: Income) => {
            const date = new Date(income.date);
            const month = months[date.getMonth()];
            monthlyData[month].Income += parseFloat(income.amount || "0");
        });

        expenses.forEach((expense: Expense) => {
            const date = new Date(expense.date);
            const month = months[date.getMonth()];
            monthlyData[month].Expenses += parseFloat(expense.amount || "0");
        });

        return Object.values(monthlyData).filter(item => item.Income > 0 || item.Expenses > 0);
    };

    const barData = processMonthlyData();

    return (
        <div className="flex flex-col p-6 text-center font-poppins bg-[#3A4046] h-[calc(100vh-4rem)]">
            <h2 className="text-3xl font-extrabold text-[#FAD350] mb-2">Expense & Income Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-base font-semibold text-[#FAD350] mb-2">Recent Incomes</h2>
                    <div className="bg-[#1D2329] shadow-lg rounded-xl p-4 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                        <IncomeList />
                    </div>
                </div>

                <div>
                    <h2 className="text-base font-semibold text-[#FAD350] mb-2">Recent Expenses</h2>
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
                                label={({ name, value }: PieChartData) =>
                                    `${name} ₹${value.toLocaleString()}`
                                }
                            >
                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: number) => `₹${value.toLocaleString()}`}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-[#1D2329] shadow-lg rounded-xl p-6 flex flex-col items-center justify-center h-[350px]">
                    <h2 className="text-xl font-semibold text-[#FAD350] mb-4">Monthly Income vs Expenses</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={barData}>
                            <XAxis dataKey="name" stroke="#8884d8" />
                            <YAxis />
                            <Tooltip
                                formatter={(value: number) => `₹${value.toLocaleString()}`}
                            />
                            <Legend />
                            <Bar
                                dataKey="Income"
                                fill="url(#incomeGradient)"
                                barSize={40}
                                radius={[10, 10, 0, 0]}
                            />
                            <Bar
                                dataKey="Expenses"
                                fill="url(#expensesGradient)"
                                barSize={40}
                                radius={[10, 10, 0, 0]}
                            />
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