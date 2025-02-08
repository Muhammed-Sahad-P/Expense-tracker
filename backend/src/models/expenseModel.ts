import { RowDataPacket } from "mysql2";
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
export const addExpense = async (expense: Expense): Promise<void> => {
  const query = `
    INSERT INTO expenses (user_id, amount, description, category, date)
    VALUES (?, ?, ?, ?, ?)
  `;
  await pool.query(query, [
    expense.user_id,
    expense.amount,
    expense.description,
    expense.category,
    expense.date,
  ]);
};

// Get all expenses for a user
export const getAllExpenses = async (userId: number): Promise<Expense[]> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM expenses WHERE user_id = ?",
    [userId]
  );
  return rows as Expense[];
};

// Check if an expense exists and belongs to the user
export const getExpenseById = async (
  expenseId: number,
  userId: number
): Promise<Expense | null> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM expenses WHERE id = ? AND user_id = ?",
    [expenseId, userId]
  );
  return (rows as Expense[])[0] || null;
};

// Update expense
export const updateExpense = async (
  expenseId: number,
  userId: number,
  expense: Omit<Expense, "id" | "user_id">
): Promise<void> => {
  const query = `
    UPDATE expenses
    SET amount = ?, description = ?, category = ?, date = ?
    WHERE id = ? AND user_id = ?
  `;
  await pool.query(query, [
    expense.amount,
    expense.description,
    expense.category,
    expense.date,
    expenseId,
    userId,
  ]);
};

// Delete an expense
export const deleteExpense = async (
  expenseId: number,
  userId: number
): Promise<void> => {
  const query = "DELETE FROM expenses WHERE id = ? AND user_id = ?";
  await pool.query(query, [expenseId, userId]);
};
