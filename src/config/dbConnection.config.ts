import mongoose from "mongoose";

export const dbConnection = (DB_URI: string) => {
  mongoose
    .connect(DB_URI)
    .then(() => {
      console.log("DB connected successfully...");
    })
    .catch((error) => {
      console.log("DB connection failed", error);
    });
};
