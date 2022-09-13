import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/AppError";

const authUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new AppError(401, "Missing authorization token");
    }

    let tokenArray = authorization.split(" ");
    let token: string;

    if (tokenArray.length > 1) {
      if (tokenArray[0].toLowerCase() !== "bearer") {
        throw new AppError(
          400,
          "The authentication token must be of type Bearer."
        );
      }
      token = tokenArray[1];
    } else {
      token = tokenArray[0];
    }

    jwt.verify(
      token as string,
      process.env.SECRET_KEY as string,
      (err: any, decoded: any) => {
        if (err) {
          throw new AppError(401, "Invalid token");
        }
        req.userEmail = decoded.email;
        req.userId = decoded.id;
        next();
      }
    );
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};

export default authUserMiddleware;
