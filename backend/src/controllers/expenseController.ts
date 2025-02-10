import { Request, Response } from "express";
import * as expenseModel from "../models/expenseModel";
import { expenseSchema } from "../utils/zodSchema";
import { StandardResponse } from "../utils/standardResponse";

interface CustomRequest extends Request {
  userId?: number;
}

// Add an expense
export const addExpense = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json(new StandardResponse("Unauthorized"));
  }

  const validatedData = expenseSchema.safeParse(req.body);
  if (!validatedData.success) {
    return res.status(400).json(new StandardResponse("Invalid expense data"));
  }

  const newExpense = { user_id: userId, ...validatedData.data };
  await expenseModel.addExpense(newExpense);
  res.status(201).json(new StandardResponse("Expense added successfully"));
};

// Update expense
export const updateExpense = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const expenseId = Number(req.params.id);

  if (!userId) {
    return res.status(401).json(new StandardResponse("Unauthorized"));
  }

  if (isNaN(expenseId)) {
    return res.status(400).json(new StandardResponse("Invalid expense ID"));
  }

  const validatedData = expenseSchema.safeParse(req.body);
  if (!validatedData.success) {
    return res.status(400).json(new StandardResponse("Invalid expense data"));
  }

  const expense = await expenseModel.getExpenseById(expenseId, userId);
  if (!expense) {
    return res
      .status(403)
      .json(new StandardResponse("Expense not found or unauthorized"));
  }

  await expenseModel.updateExpense(expenseId, userId, {
    ...validatedData.data,
  });

  res.status(200).json(new StandardResponse("Expense updated successfully"));
};

// Get all expenses for a user
export const getAllExpenses = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json(new StandardResponse("Unauthorized"));
  }

  const expenses = await expenseModel.getAllExpenses(userId);
  res
    .status(200)
    .json(new StandardResponse("Expenses fetched successfully", expenses));
};

// Delete an expense
export const deleteExpense = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const expenseId = Number(req.params.id);

  if (!userId) {
    return res.status(401).json(new StandardResponse("Unauthorized"));
  }

  if (isNaN(expenseId)) {
    return res.status(400).json(new StandardResponse("Invalid expense ID"));
  }

  const expense = await expenseModel.getExpenseById(expenseId, userId);
  if (!expense) {
    return res
      .status(403)
      .json(new StandardResponse("Expense not found or unauthorized"));
  }

  await expenseModel.deleteExpense(expenseId, userId);
  res.status(200).json(new StandardResponse("Expense deleted successfully"));
};
