import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import updateUserService from "../../services/users/updateUser.service";
import { IUserRequest, IUserRequestPatch } from "../../interfaces/users";
import { instanceToPlain } from "class-transformer";

const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
<<<<<<< HEAD
    const {
      username,
      email,
      password,
      dateOfBirth,
      isAdm,
      photo,
    }: IUserRequest = req.body;
    const user = await updateUserService(id, {
      username,
      email,
      password,
      dateOfBirth,
      isAdm,
      photo,
    });
    return res.status(200).json({
      message: "User updated",
      user: user,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

=======

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

>>>>>>> 1e16bd453fa72064a562fd848bb1097667a6a2ce
export default updateUserController;
