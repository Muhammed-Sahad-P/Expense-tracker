import pool from "../config/db";

export interface Expense {
  id?: number;
  user_id: number;
  amount: number;
  description: string;
  category: string;
  date: string;
}

// Add an expense
export const addExpense = async (expense: Expense) => {
  const query =
    "INSERT INTO expenses (user_id, amount, description, category, date) VALUES (?, ?, ?, ?, ?)";
  await pool.query(query, [
    expense.user_id,
    expense.amount,
    expense.description,
    expense.category,
    expense.date,
  ]);
};

// Get all expenses for a user
export const getAllExpenses = async (userId: number) => {
  const [rows]: any = await pool.query(
    "SELECT * FROM expenses WHERE user_id = ?",
    [userId]
  );
  return rows;
};

// Delete an expense
export const deleteExpense = async (expenseId: number, userId: number) => {
  const query = "DELETE FROM expenses WHERE id = ? AND user_id = ?";
  await pool.query(query, [expenseId, userId]);
};
