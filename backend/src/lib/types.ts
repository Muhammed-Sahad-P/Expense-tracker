import { Request } from "express";

export interface PrivateRequest extends Request {
  userId?: string;
}
