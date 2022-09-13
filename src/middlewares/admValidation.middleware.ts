import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/users.entity";
import { AppError } from "../errors/AppError";

export const admValidationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userEmail } = req;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email: userEmail });

    if (!user) {
      throw new AppError(404, "User not found");
    }

    if (!user.isAdm) {
      throw new AppError(401, "User is not an admin");
    }

    req.isAdm = true;
    next();
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};
