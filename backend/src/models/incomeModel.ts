import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../config/db";

interface Income {
  user_id: number;
  amount: number;
  source: string;
  date: string;
}

// Add an income entry
export const addIncome = async (income: Income): Promise<number> => {
  const query =
    "INSERT INTO incomes (user_id, amount, source, date) VALUES (?, ?, ?, ?)";
  const [result] = await pool.query<ResultSetHeader>(query, [
    income.user_id,
    income.amount,
    income.source,
    income.date,
  ]);
  return result.insertId; 
};

// Get all incomes for a user
export const getAllIncomes = async (userId: number): Promise<Income[]> => {
  const query = "SELECT * FROM incomes WHERE user_id = ?";
  const [rows] = await pool.query<RowDataPacket[]>(query, [userId]);
  return rows as Income[];
};

// Check if income exists and belongs to the user
export const checkIncomeExists = async (
  incomeId: number,
  userId: number
): Promise<boolean> => {
  const query = "SELECT 1 FROM incomes WHERE id = ? AND user_id = ? LIMIT 1";
  const [result] = await pool.query<RowDataPacket[]>(query, [incomeId, userId]);
  return result.length > 0;
};

// Update an income entry
export const updateIncome = async (
  incomeId: number,
  userId: number,
  income: Omit<Income, "user_id">
): Promise<boolean> => {
  const query =
    "UPDATE incomes SET amount = ?, source = ?, date = ? WHERE id = ? AND user_id = ?";
  const [result] = await pool.query<ResultSetHeader>(query, [
    income.amount,
    income.source,
    income.date,
    incomeId,
    userId,
  ]);
  return result.affectedRows > 0;
};

// Delete an income entry
export const deleteIncome = async (
  incomeId: number,
  userId: number
): Promise<boolean> => {
  const query = "DELETE FROM incomes WHERE id = ? AND user_id = ?";
  const [result] = await pool.query<ResultSetHeader>(query, [incomeId, userId]);
  return result.affectedRows > 0;
};
