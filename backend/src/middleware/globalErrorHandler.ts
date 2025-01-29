import { NextFunction, Request, Response } from "express";

const globalErrorHandle = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === "development") {
    console.log(error);
  }

  if (!error) res.status(404).json({ message: "Unknown error occurred" });
  else if (error.message) res.status(500).json({ message: error.message });
  else res.status(500).json({ message: "Something broke!" });
};

export default globalErrorHandle;
