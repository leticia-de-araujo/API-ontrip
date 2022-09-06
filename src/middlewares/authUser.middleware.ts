import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import jwt from "jsonwebtoken";

export const authUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    // Throwing an error if you don't send the token.
    if (!authorization) {
      throw new AppError(400, "Missing authorization token");
    }

    // Splitting the token regardless of whether it comes with the Bearer or not.
    let tokenArray = authorization.split(" ");
    let token: string;

    // Checking if the Token came with the bearer or not.
    if (tokenArray.length > 1) {
      // If it came, validating if the first name is Bearer to prevent the client from sending any name before the hash.
      if (tokenArray[0].toLowerCase() !== "bearer") {
        throw new AppError(
          400,
          "The authentication token must be of type Bearer."
        );
      }
      // Assigning the hash to the token variable
      token = tokenArray[1];
    } else {
      // If the token was sent without the Bearer keyword, assign the hash in the same way to the token variable.
      token = tokenArray[0];
    }

    jwt.verify(
      token as string,
      process.env.SECRET_KEY as string,
      (err: any, decoded: any) => {
        // If you want to extract more things from the decoded to add to the request, just assign them in the lines below.
        req.userEmail = decoded.email;
        req.userId = decoded.id;
        next();
      }
    );
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ message: err.message });
    }

    return res.status(401).json({ message: "Invalid token!" });
  }
};
