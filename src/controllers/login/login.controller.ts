import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { IUserLogin } from "../../interfaces/users";
import { loginService } from "../../services/login/login.service";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUserLogin = req.body;

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
