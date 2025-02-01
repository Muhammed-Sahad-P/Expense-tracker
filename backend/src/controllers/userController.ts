import { Request, Response } from "express";
import * as userModel from "../models/userModel";
import { generateToken } from "../utils/authUtils";
import { loginSchema, registerSchema } from "../utils/zodSchema";
import { StandardResponse } from "../utils/standardResponse";

// Register a new user
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = registerSchema.parse(req.body);

  if (!username || !email || !password) {
    return res.status(400).json(new StandardResponse("Please fill all fields"));
  }

  const existingUser = await userModel.getUserByUsername(username);

  if (existingUser) {
    return res.status(400).json(new StandardResponse("User already exists"));
  }

  await userModel.createUser({ username, email, password });

  res.status(201).json(new StandardResponse("User created successfully"));
};

// Login an existing user
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = loginSchema.parse(req.body);

  if (!username || !password) {
    return res.status(400).json(new StandardResponse("Please fill all fields"));
  }

  const user = await userModel.getUserByUsername(username);
  if (!user) {
    return res.status(404).json(new StandardResponse("User not found"));
  }

  const passwordMatch = await userModel.comparePassword(
    password,
    user.password
  );

  if (!passwordMatch) {
    return res.status(401).json(new StandardResponse("Invalid credentials"));
  }

  const token = generateToken(user.id);

  res.status(200).json(new StandardResponse("Login successful", { token }));
};

//get all users
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userModel.getAllUsers();

  if (!users)
    return res.status(404).json(new StandardResponse("No users found"));

  res.status(200).json(users);
};
