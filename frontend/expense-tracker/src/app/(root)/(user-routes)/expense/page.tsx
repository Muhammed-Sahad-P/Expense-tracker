import AddExpense from "@/components/AddExpenses";


export default function Home() {
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">Expense Tracker</h1>
            <AddExpense />
        </div>
    );
}
