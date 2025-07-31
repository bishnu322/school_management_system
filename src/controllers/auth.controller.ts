// * login

import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.utils";
import { User } from "../models/user.model";
import { CustomError } from "../middlewares/error-handler.middleware";
import { comparePassword } from "../utils/bcrypt.utils";

export const logInUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  // console.log(user);
  if (!user) {
    throw new CustomError("User not found!, for this email", 404);
  }

  if (!password) {
    throw new CustomError("password is required", 400);
  }

  const isMatchedPassword = await comparePassword(password, user.password);

  console.log(isMatchedPassword);
  if (!isMatchedPassword) {
    throw new CustomError("password is wrong, enter valid password", 400);
  }

  res.status(200).json({
    message: "authorized user",
    status: "Success",
    success: true,
    data: user,
  });
});
// * changePassword

// *forget password
