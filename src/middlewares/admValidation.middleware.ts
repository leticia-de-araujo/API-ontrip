import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/users.entity";
import { AppError } from "../errors/AppError";

// rota de validação de adm deve vir sempre depois da de autenticação pois ela usa o userEmail do request que é provido pelo authUserMiddleware
// atencao este middleware so' deve ser usado nas rotas exclusivas a' admins (nao admin ou owner)
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
      throw new AppError(401, "User not admin");
    }

    req.isAdm = true;
    next();
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};
