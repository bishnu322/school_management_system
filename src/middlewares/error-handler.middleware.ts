import { NextFunction, Request, Response } from "express";

export class CustomError extends Error {
  success: boolean;
  statusCode: number;
  status: "error" | "failed";

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode || 500;
    this.status =
      this.statusCode >= 400 && this.statusCode < 500 ? "failed" : "error";
    this.success = false;
    Error.captureStackTrace(this, CustomError);
  }
}

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = error?.message || "Internal server error";
  const statusCode = error?.statusCode || 500;
  const status = error?.status || "error";
  const success = error?.statusCode || "failed";

  res.status(statusCode).json({
    message,
    statusCode,
    status,
    success,
    data: null,
  });
};
