import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import updateUserService from "../../services/users/updateUser.service";
import { IUserRequest, IUserRequestPatch } from "../../interfaces/users";
import { instanceToPlain } from "class-transformer";

const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      username,
      email,
      password,
      dateOfBirth,
      isAdm,
      file,
    }: IUserRequestPatch = req.body;

    const user = await updateUserService(id, {
      username,
      email,
      password,
      dateOfBirth,
      isAdm,
      file,
    });

    return res.status(200).json({
      message: "User updated with success",
      user: instanceToPlain(user),
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default updateUserController;
