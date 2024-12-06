import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const globalErrorHandle = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === "development") {
    console.log(error);
  }

  if (error instanceof ZodError) {
    res.status(400).json({
      message: `Invalid data, ${error.errors[0].path}: ${error.errors[0].message}`,
    });
    return;
  }

  if (!error) res.status(404).json({ message: "Unknown error occurred" });
  else if (error.message) res.status(500).json({ message: error.message });
  else res.status(500).json({ message: "Something broke!" });
};

export default globalErrorHandle;
