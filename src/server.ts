import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import {
  CustomError,
  errorHandler,
} from "./middlewares/error-handler.middleware";

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("hello backend");
});

//! for all routes error middleware
app.get("/{*all}", (req: Request, res: Response, next: NextFunction) => {
  const message = `cannot ${req.method} on the path ${req.originalUrl}`;
  const error = new CustomError(message, 404);

  next(error);
});

//! using error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is listening on port http://localhost:${PORT}`);
});
