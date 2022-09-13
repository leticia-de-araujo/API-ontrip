import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { IUserLogin } from "../../interfaces/users";
import { loginService } from "../../services/session/login.service";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUserLogin = req.body;

    if (!email) {
      throw new AppError(400, "email is a required field");
    }

    if (!password) {
      throw new AppError(400, "password is a required field");
    }

    const token = await loginService({ email, password });

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};
