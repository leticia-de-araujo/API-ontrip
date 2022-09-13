import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import listUsersService from "../../services/users/listUsers.service";

const listUsersController = async (req: Request, res: Response) => {
  try {
    const users = await listUsersService();

    return res.status(200).json({
      message: "Successful request",
      users: instanceToPlain(users),
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default listUsersController;
