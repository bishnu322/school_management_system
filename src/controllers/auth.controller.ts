// * login

import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.utils";
import { User } from "../models/user.model";
import { CustomError } from "../middlewares/error-handler.middleware";
import { comparePassword } from "../utils/bcrypt.utils";
import { IjwtPayload } from "../types/global.type";
import { generateJwtToken } from "../utils/jwt-token.utils";

export const logInUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user: any = await User.findOne({ email: email });

  // console.log(user);
  if (!user) {
    throw new CustomError("User not found!, for this email", 404);
  }

  if (!password) {
    throw new CustomError("password is required", 400);
  }

  const payload: IjwtPayload = {
    _id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
  };

  const isMatchedPassword = await comparePassword(password, user.password);

  if (!isMatchedPassword) {
    throw new CustomError("password is wrong, enter valid password", 400);
  }

  const access_token = await generateJwtToken(payload);

  res
    .cookie("access_token", access_token, {
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_EXPIRY) * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      message: "authorized user",
      status: "Success",
      success: true,
      data: user,
    });
});
// * changePassword

// *forget password
