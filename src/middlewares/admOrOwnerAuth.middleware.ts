import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/users.entity";
import { AppError } from "../errors/AppError";

export const admOrOwnerAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const route = req.originalUrl.split("/");
  console.log(route);
  if (route[1] === "users") {
    const { id } = req.params;
    const userRepo = AppDataSource.getRepository(User);
    const user = userRepo.findOneBy({ id });
  }
};
