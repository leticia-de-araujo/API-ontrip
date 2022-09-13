import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/users.entity";
import { AppError } from "../errors/AppError";

export const accountValidationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.userId;

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: id });

  if (!user?.isActive) {
    throw new AppError(
      400,
      "Account deactivated, please contact our customer services for more information"
    );
  }
  next();
};
