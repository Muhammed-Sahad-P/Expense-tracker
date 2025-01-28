import db from "../config/db";

interface Expense {
  id: string;
  userId: number;
  amount: number;
  description: string;
  category: string;
  date: string;
}

export const addExpense = async (expense: Expense): Promise<void> => {
  const query = `INSERT INTO expenses (user_id, amount, description, category, date) VALUES (?, ?, ?, ?, ?)`;
  try {
    await db.query(query, [
      expense.userId,
      expense.amount,
      expense.description,
      expense.category,
      expense.date,
    ]);
  } catch (error) {
    throw new Error(`Failed to add expense: ${(error as Error).message}`);
  }
};

// Function to get all expenses
export const getAllExpenses = async (): Promise<any> => {
  const query = "SELECT * FROM expenses";
  try {
    const [results] = await db.query(query);
    return results;
  } catch (error) {
    throw new Error(`Failed to retrieve expenses: ${(error as Error).message}`);
  }
};

// Function to delete an expense
export const deleteExpense = async (id: string): Promise<void> => {
  const query = "DELETE FROM expenses WHERE id = ?";
  try {
    await db.query(query, [id]);
  } catch (error) {
    throw new Error(`Failed to delete expense: ${(error as Error).message}`);
  }
};

export default { addExpense, getAllExpenses, deleteExpense };
