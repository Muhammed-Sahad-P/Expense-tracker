import { Request, Response } from "express";
import * as incomeModel from "../models/incomeModel";
import { incomeSchema } from "../utils/zodSchema";
import { StandardResponse } from "../utils/standardResponse";

interface CustomRequest extends Request {
  userId?: string;
}

// Add income
export const addIncome = async (req: CustomRequest, res: Response) => {
  const userId = Number(req.userId);
  const { amount, source, date } = req.body;

  incomeSchema.parse({ amount, source, date });

  const newIncome = {
    user_id: userId,
    amount,
    source,
    date,
  };

  const newIncomeId = await incomeModel.addIncome(newIncome);
  res
    .status(201)
    .json(new StandardResponse("Income added successfully", newIncomeId));
};

// Get all incomes
export const getAllIncomes = async (req: CustomRequest, res: Response) => {
  const userId = Number(req.userId);
  const incomes = await incomeModel.getAllIncomes(userId);
  res.status(200).json(new StandardResponse(JSON.stringify(incomes)));
};

// Update income
export const updateIncome = async (req: CustomRequest, res: Response) => {
  const userId = Number(req.userId);
  const incomeId = Number(req.params.id);
  const { amount, source, date } = req.body;

  incomeSchema.parse({ amount, source, date });

  const updatedIncome = {
    user_id: userId,
    amount,
    source,
    date,
  };

  const incomeExists = await incomeModel.checkIncomeExists(incomeId, userId);

  if (!incomeExists) {
    return res
      .status(404)
      .json(new StandardResponse("Income not found or doesn't belong to you"));
  }

  const updated = await incomeModel.updateIncome(
    incomeId,
    userId,
    updatedIncome
  );
  if (updated) {
    res.status(200).json(new StandardResponse("Income updated successfully"));
  } else {
    res.status(400).json(new StandardResponse("Failed to update income"));
  }
};

// Delete income
export const deleteIncome = async (req: CustomRequest, res: Response) => {
  const userId = Number(req.userId);
  const incomeId = Number(req.params.id);

  const incomeExists = await incomeModel.checkIncomeExists(incomeId, userId);

  if (!incomeExists) {
    return res
      .status(404)
      .json(new StandardResponse("Income not found or doesn't belong to you"));
  }

  const deleted = await incomeModel.deleteIncome(incomeId, userId);
  if (deleted) {
    res.status(200).json(new StandardResponse("Income deleted successfully"));
  } else {
    res.status(400).json(new StandardResponse("Failed to delete income"));
  }
};
