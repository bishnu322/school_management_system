import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

export const zodValidation = <T>(schema: ZodType<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedData = schema.parse(req.body);
      next(parsedData);
    } catch (error) {}
  };
};
