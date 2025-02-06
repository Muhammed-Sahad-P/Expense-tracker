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

      const formattedIncome = {
        source: income.source,
        amount: Number(income.amount),
        date: formattedDate,
      };

      const response = await apiClient.post("/income", formattedIncome);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
    },
  });
};

export const useUpdateIncome = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: {
        source: string;
        amount: number;
        date: string;
      };
    }) => {
      const response = await apiClient.put(`/income/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
    },
  });
};

export const useDeleteIncome = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (incomeId: number) => {
      const response = await apiClient.delete(`/income/${incomeId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
    },
  });
};
