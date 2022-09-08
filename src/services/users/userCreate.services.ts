import AppDataSource from "../../data-source";
import { hash } from "bcryptjs";
import { AppError } from "../../errors/AppError";
import { IUserRequest } from "../../interfaces/users";
import { User } from "../../entities/users.entity";

const userCreateService = async ({
  username,
  email,
  password,
  dateOfBirth,
  isAdm,
  photo,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  console.log(username, email, password, dateOfBirth, isAdm, photo);

  const users = await userRepository.find();
  const emailAlreadyExist = users.find((user) => user.email === email);

  if (emailAlreadyExist) {
    throw new AppError(403, "This email already exists");
  }

  const hashedPassword = await hash(password, 10);

  const user = userRepository.create({
    username,
    email,
    dateOfBirth,
    isAdm,
    photo,
    password: hashedPassword,
  });

  await userRepository.save(user);

  return user;
};

export default userCreateService;
