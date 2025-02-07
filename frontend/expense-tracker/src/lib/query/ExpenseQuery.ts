"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api";

export const useGetExpenses = () => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await apiClient.get("/expense/totals");
      console.log(response.data);
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

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: {
        description: string;
        amount: number;
        category: string;
        date: string;
      };
    }) => {
      const response = await apiClient.put(`/expense/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (expenseId: number) => {
      const response = await apiClient.delete(`/expense/${expenseId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};
