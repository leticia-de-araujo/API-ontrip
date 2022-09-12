import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { IUserRequest } from "../../interfaces/users";
import userCreateService from "../../services/users/userCreate.services";
const userCreateController = async (req: Request, res: Response) => {
  try {
    const { username, email, password, dateOfBirth, isAdm }: IUserRequest =
      req.body;

    let photo = req.file;

    const user = await userCreateService({
      username,
      email,
      password,
      dateOfBirth,
      isAdm,
      photo,
    });

    return res.status(201).json({
      message: "User created with success",
      user: instanceToPlain(user),
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default userCreateController;
