import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import {
  CustomError,
  errorHandler,
} from "./middlewares/error-handler.middleware";
import { dbConnection } from "./config/dbConnection.config";

//*importing routers
import studentRouter from "./routes/student.route";
import roleRouter from "./routes/role.route";

const app = express();
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI ?? "";

//* connecting database

dbConnection(DB_URI);

//
app.use(express.json({ limit: "5mb" }));

//* using routers
app.use("/api/student", studentRouter);
app.use("/api/role", roleRouter);

app.get("/", (req, res) => {
  res.send("hello backend");
});

//* for all routes error middleware
app.get("/{*all}", (req: Request, res: Response, next: NextFunction) => {
  const message = `cannot ${req.method} on the path ${req.originalUrl}`;
  const error = new CustomError(message, 404);

  next(error);
});

//* using error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is listening on port http://localhost:${PORT}`);
});
