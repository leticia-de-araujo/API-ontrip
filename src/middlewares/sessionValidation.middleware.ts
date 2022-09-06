import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/users.entity";
import { AppError } from "../errors/AppError";
import { IUserLogin } from "../interfaces/users";
import { compareSync } from "bcrypt";

export const sessionValidationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    // Checking if the user is in the db
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });

    // If it doesn't exist, it throws an error but without saying where it is to prevent brute force attacks
    if (!user) {
      throw new AppError(401, "Invalid email/password");
    }

    // If it exists, it compares the passed password with the password hash that was saved in the db
    const passwordMatch = compareSync(password, user.password);

    // If the password doesn't match, it throws an error but doesn't say where it is to prevent brute force attacks
    if (!passwordMatch) {
      throw new AppError(401, "Invalid email/password");
    }

    // If everything is correct, forward it to the next middleware or controller
    next();
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};
