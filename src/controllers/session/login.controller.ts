import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { IUserLogin } from "../../interfaces/users";
import { loginService } from "../../services/session/login.service";

export const loginController = async (req: Request, res: Response) => {
  try {
    // Getting the request information
    const { email, password }: IUserLogin = req.body;

    // Ensuring that they were passed by the client
    if (!email || !password) {
      throw new AppError(
        400,
        "The following fields are mandatory: email, password"
      );
    }

    // calling the service
    const loggedUser = await loginService({ email, password });

    // Deconstructing to remove the password key from the returned object
    const { password: pwd, ...user } = loggedUser;

    return res.status(200).json(user);
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};
