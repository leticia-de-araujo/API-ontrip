import { User } from "../../entities/users.entity";
import AppDataSource from "../../data-source";

const listUsersService = async (): Promise<User[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  return users;
};

export default listUsersService;
