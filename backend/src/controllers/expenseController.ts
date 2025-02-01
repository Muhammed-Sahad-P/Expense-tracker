import { Request, Response } from "express";
import * as expenseModel from "../models/expenseModel";
import { expenseSchema } from "../utils/zodSchema";
import { StandardResponse } from "../utils/standardResponse";

interface CustomRequest extends Request {
  userId?: string;
}

// Add an expense
export const addExpense = async (req: CustomRequest, res: Response) => {
  const userId = Number(req.userId);
  const validatedData = expenseSchema.parse(req.body);

  const newExpense = {
    user_id: userId,
    ...validatedData,
  };

  await expenseModel.addExpense(newExpense);
  res.status(201).json(new StandardResponse("Expense added successfully"));
};

// Update expense
export const updateExpense = async (req: CustomRequest, res: Response) => {
  const userId = Number(req.userId);
  const expenseId = Number(req.params.id);
  const validatedData = expenseSchema.parse(req.body);

  const expense = await expenseModel.getExpenseById(expenseId, userId);
  if (!expense) {
    return res
      .status(403)
      .json({ message: "Unauthorized or expense not found" });
  }

  await expenseModel.updateExpense(expenseId, userId, {
    ...validatedData,
    user_id: userId,
  });
  res.status(200).json(new StandardResponse("Expense updated successfully"));
};

// Get all expenses for a user
export const getAllExpenses = async (req: CustomRequest, res: Response) => {
  const userId = Number(req.userId);
  const expenses = await expenseModel.getAllExpenses(userId);
  res.status(200).json(new StandardResponse(expenses));
};

// Delete an expense
export const deleteExpense = async (req: CustomRequest, res: Response) => {
  const userId = Number(req.userId);
  const expenseId = Number(req.params.id);

  const expense = await expenseModel.getExpenseById(expenseId, userId);
  if (!expense) {
    return res
      .status(403)
      .json(new StandardResponse("Unauthorized or expense not found"));
  }

  await expenseModel.deleteExpense(expenseId, userId);
  res.status(200).json(new StandardResponse("Expense deleted successfully"));
};
