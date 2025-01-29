import { Request, Response } from "express";
import * as userModel from "../models/userModel";
import { generateToken } from "../lib/utils/authUtils";

// Register a new user
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const existingUser = await userModel.getUserByUsername(username);

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  await userModel.createUser({ username, email, password });

  res.status(201).json({ message: "User created successfully" });
};

// Login an existing user
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const user = await userModel.getUserByUsername(username);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const passwordMatch = await userModel.comparePassword(
    password,
    user.password
  );

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user.id);

  res.status(200).json({ message: "Login successful", token });
};
