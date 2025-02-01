import pool from "../config/db";

interface Income {
  user_id: number;
  amount: number;
  source: string;
  date: string;
}

// Add an income entry
export const addIncome = async (income: Income) => {
  const query =
    "INSERT INTO incomes (user_id, amount, source, date) VALUES (?, ?, ?, ?)";
  const [result]: any = await pool.query(query, [
    income.user_id,
    income.amount,
    income.source,
    income.date,
  ]);
  return result.insertId;
};

// Get all incomes for a user
export const getAllIncomes = async (userId: number) => {
  const query = "SELECT * FROM incomes WHERE user_id = ?";
  const [rows]: any = await pool.query(query, [userId]);
  return rows;
};

// Check if income exists and belongs to the user
export const checkIncomeExists = async (incomeId: number, userId: number) => {
  const query = "SELECT * FROM incomes WHERE id = ? AND user_id = ?";
  const [result]: any = await pool.query(query, [incomeId, userId]);
  return result.length > 0;
};

// Update an income entry
export const updateIncome = async (
  incomeId: number,
  userId: number,
  income: Income
) => {
  const query =
    "UPDATE incomes SET amount = ?, source = ?, date = ? WHERE id = ? AND user_id = ?";
  const [result]: any = await pool.query(query, [
    income.amount,
    income.source,
    income.date,
    incomeId,
    userId,
  ]);
  return result.affectedRows > 0;
};

// Delete an income entry
export const deleteIncome = async (incomeId: number, userId: number) => {
  const query = "DELETE FROM incomes WHERE id = ? AND user_id = ?";
  const [result]: any = await pool.query(query, [incomeId, userId]);
  return result.affectedRows > 0;
};
