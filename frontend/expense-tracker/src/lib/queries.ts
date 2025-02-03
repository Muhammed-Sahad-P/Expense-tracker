"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./api";
import axios from "axios";

export const useGetExpenses = () => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/api/expense/totals");
      return response.data;
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
      const response = await apiClient.post("/expenses", expense);
      console.log(response);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};
