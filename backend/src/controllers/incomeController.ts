import { Request, Response } from "express";
import * as incomeModel from "../models/incomeModel";

interface CustomRequest extends Request {
  userId?: string;
}

//add income
export const addIncome = async (req: CustomRequest, res: Response) => {
  const userId = Number(req.userId);
  const { amount, source, date } = req.body;

  if (!amount || !source || !date) {
    return res.status(400).json({ message: "Pls provide all fields" });
  }

  const newIncome = {
    user_id: userId !== undefined ? Number(userId) : 0,
    amount,
    source,
    date,
  };

  await incomeModel.addIncome(newIncome);

  res.status(201).json({ message: "Income added successfully" });
};

//get all income
export const getAllIncomes = async (req: CustomRequest, res: Response) => {
  const userId = Number(req.userId);

  const incomes = await incomeModel.getAllIncomes(userId);

  res.status(200).json(incomes);
};

//update income
export const updateIncome = async (req: CustomRequest, res: Response) => {
  const userId = Number(req.userId);
  const incomeId = Number(req.params.id);
  const { amount, source, date } = req.body;

  if (!amount || !source || !date) {
    return res.status(400).json({ message: "Pls provide all fields" });
  }

  const updatedIncome = {
    user_id: userId !== undefined ? Number(userId) : 0,
    amount,
    source,
    date,
  };

  await incomeModel.updateIncome(incomeId, userId, updatedIncome);

  res.status(200).json({ message: "Income updated successfully" });
};

//delete income
export const deleteIncome = async (req: CustomRequest, res: Response) => {
  const userId = Number(req.userId);
  const incomeId = Number(req.params.id);

  await incomeModel.deleteIncome(incomeId, userId);

  res.status(200).json({ message: "Income deleted successfully" });
};
