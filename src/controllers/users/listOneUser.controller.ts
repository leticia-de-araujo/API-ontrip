import { instanceToPlain } from "class-transformer";
import { Response, Request } from "express";
import { AppError } from "../../errors/AppError";
import listOneUserService from "../../services/users/listOneUser.service";

const listOneUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await listOneUserService(id);
    return res.status(200).json({
      message: "Successful request",
      user: instanceToPlain(user),
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default listOneUserController;
