import { IUserLogin } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { User } from "../../entities/users.entity";
import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginService = async ({ email, password }: IUserLogin) => {
  // Checking if the user is in the db
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email });

  // If it doesn't exist, it throws an error but without saying where it is to prevent brute force attacks
  if (!user) {
    throw new AppError(401, "Invalid email/password");
  }

  // If it exists, it compares the passed password with the password hash that was saved in the db
  const passwordMatch = compareSync(password, user.password);

  // If the password doesn't match, it throws an error but doesn't say where it is to prevent brute force attacks
  if (!passwordMatch) {
    throw new AppError(401, "Invalid email/password");
  }

  // Generating the token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    String(process.env.SECRET_KEY),
    { expiresIn: "24h" }
  );

  // Returning an object containing user data and auth token
  return {
    token,
    ...user,
  };
};
