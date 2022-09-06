import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/users.entity";
import { AppError } from "../errors/AppError";

// rota de validação de adm deve vir sempre depois da de autenticação pois ela usa o userEmail do request que é provido pelo authUserMiddleware
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
      throw new AppError(
        401,
        "This service can only be requested by administrators"
      );
    }

    next();
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
  }
};
