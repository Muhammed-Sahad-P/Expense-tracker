import ExpenseList from "@/components/ExpenseList";


export default function Home() {
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">Expense Tracker</h1>
            <ExpenseList />
        </div>
    );
}
