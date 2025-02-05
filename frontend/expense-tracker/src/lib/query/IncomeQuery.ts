"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api";

export const useGetIncomes = () => {
  return useQuery({
    queryKey: ["incomes"],
    queryFn: async () => {
      const response = await apiClient.get("/income");
      return response.data.message;
    },
  });
};

export const useAddIncome = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (income: {
      source: string;
      amount: number;
      date: string;
    }) => {
      const formattedDate = new Date(income.date)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      const formattedExpense = {
        description: income.source,
        amount: Number(income.amount),
        date: formattedDate,
      };

      const response = await apiClient.post("/income", formattedExpense);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
    },
  });
};
