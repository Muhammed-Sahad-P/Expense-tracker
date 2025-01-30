import { Request, Response } from "express";
import * as expenseModel from "../models/expenseModel";

interface CustomRequest extends Request {
  userId?: string;
}

// Add an expense
export const addExpense = async (req: CustomRequest, res: Response) => {
  const { amount, description, category, date } = req.body;
  const userId = req.userId;

  if (!amount || !description || !category || !date) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const newExpense = {
    user_id: userId !== undefined ? Number(userId) : 0,
    amount,
    description,
    category,
    date,
  };
  await expenseModel.addExpense(newExpense);

  res.status(201).json({ message: "Expense added successfully" });
};

// Get all expenses for a user
export const getAllExpenses = async (req: CustomRequest, res: Response) => {
  const userId = Number(req.userId);

  const expenses = await expenseModel.getAllExpenses(userId);
  res.status(200).json({ expenses });
};

// Delete an expense
export const deleteExpense = async (req: CustomRequest, res: Response) => {
  const expenseId = parseInt(req.params.id);
  const userId = Number(req.userId);

  await expenseModel.deleteExpense(expenseId, userId);

  res.status(200).json({ message: "Expense deleted successfully" });
};
