import { create } from "zustand";

interface Income {
  id: string;
  amount: number;
  source: string;
  date: string;
  userId: string;
}

interface IncomeStore {
  incomes: Income[];
  setIncomes: (incomes: Income[]) => void;
  addIncome: (income: Income) => void;
}

export const useIncomeStore = create<IncomeStore>((set) => ({
  incomes: [],
  setIncomes: (incomes: Income[]) => set({ incomes }),
  addIncome: (income: Income) =>
    set((state) => ({ incomes: [...state.incomes, income] })),
}));
