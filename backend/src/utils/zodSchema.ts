import { z } from "zod";

export const expenseSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
});

export const incomeSchema = z.object({
  amount: z
    .number()
    .positive("Amount must be positive")
    .min(1, "Amount is too small"),
  source: z.string().min(1, "Source is required"),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
});

export const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
