import { Request, Response } from "express";
import * as expenseModel from "../models/expenseModel";

// Function to add an expense
export const addExpense = async (req: Request, res: Response) => {
  const { userId, amount, description, category, date } = req.body;

  const expense = {
    id: Date.now().toString(),
    userId,
    amount,
    description,
    category,
    date,
  };

  await expenseModel.addExpense(expense);
  res.status(201).json({ message: "Expense added successfully" });
};

// Function to get all expenses
export const getAllExpenses = async (req: Request, res: Response) => {
  const expenses = await expenseModel.getAllExpenses();
  res.status(200).json(expenses);
};

// Function to delete an expense
export const deleteExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  await expenseModel.deleteExpense(id);
  res.status(200).json({ message: "Expense deleted successfully" });
};
