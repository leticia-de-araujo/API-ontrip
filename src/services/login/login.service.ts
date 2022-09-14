import { IUserLogin } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { User } from "../../entities/users.entity";
import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginService = async ({ email, password }: IUserLogin) => {
  if (!email) {
    throw new AppError(400, "email is a required field");
  }

  if (!password) {
    throw new AppError(400, "password is a required field");
  }

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email });

  if (!user) {
    throw new AppError(401, "Invalid email or password");
  }

  if (!user.isActive) {
    throw new AppError(401, "Account deleted, please contact customer service");
  }

  const passwordMatch = compareSync(password, user.password);

  if (!passwordMatch) {
    throw new AppError(401, "Invalid email or password");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    String(process.env.SECRET_KEY),
    { expiresIn: "24h" }
  );

  return token;
};
