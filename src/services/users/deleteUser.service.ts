import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";

const deleteUserService = async (id: string): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { id: id } });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (!user.isActive) {
    throw new AppError(400, "User already deleted");
  }

  user.isActive = false;

  await userRepository.save(user);

  return user;
};

export default deleteUserService;
