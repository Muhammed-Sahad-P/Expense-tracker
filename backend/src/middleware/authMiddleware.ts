import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/authUtils";
import { StandardResponse } from "../utils/standardResponse";

interface CustomRequest extends Request {
  userId?: string;
}

export const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json(new StandardResponse("Please provide a valid token"));
  }

  try {
    const decoded = verifyToken(token) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json(new StandardResponse("Invalid token"));
  }
};
