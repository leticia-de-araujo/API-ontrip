import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import path from "path";
import { AppError } from "../../errors/AppError";
import { IUserRequest } from "../../interfaces/users";
import handleErrorMiddleware from "../../middlewares/handleError.middleware";
import userCreateService from "../../services/users/userCreate.services";
import { v4 as uuid } from "uuid";

const userCreateController = async (req: Request, res: Response) => {
  try {
    const { username, email, password, dateOfBirth, isAdm }: IUserRequest =
      req.body;
    const files: any = req.files;
    let photo!: string;
    Object.keys(files).forEach((key) => {
      photo = path.join(__dirname, "profilePictures", uuid() + files[key].name);
      files[key].mv(photo, (err: any) => {
        if (err) {
          throw new AppError(500, err.message);
        }
      });
    });
    const user = await userCreateService({
      username,
      email,
      password,
      dateOfBirth,
      isAdm,
      photo,
    });

    return res.status(201).json({
      message: "User created with success!",
      data: instanceToPlain(user),
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default userCreateController;
