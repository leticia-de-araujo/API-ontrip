import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";

const listOneUserService = async (id: string):Promise<User> => {

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
        where:{
            id:id
        }
    })

    if(!user){
        throw new AppError(404, "User not found");
    }

    return user;
}

export default listOneUserService;