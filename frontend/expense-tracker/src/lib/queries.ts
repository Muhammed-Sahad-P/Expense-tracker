"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./api";

export const useGetExpenses = () => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await apiClient.get("/expense/totals");
      return response.data.message;
    },
  });
};

export const useAddExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (expense: {
      title: string;
      amount: number;
      category: string;
      date: string;
    }) => {
      const formattedDate = new Date(expense.date)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      const formattedExpense = {
        description: expense.title,
        amount: Number(expense.amount),
        category: expense.category,
        date: formattedDate,
      };

      const response = await apiClient.post("/expense", formattedExpense);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};
