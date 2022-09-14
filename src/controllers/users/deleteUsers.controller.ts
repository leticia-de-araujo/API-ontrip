import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import deleteUserService from "../../services/users/deleteUser.service";

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await deleteUserService(id);

    return res.status(200).json({
      message: "User deleted with success",
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default deleteUserController;
