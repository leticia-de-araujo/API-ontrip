import { IUserRequest } from './../../interfaces/users/index';
import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import app from "../../app";
import { v2 as cloudinary } from "cloudinary";

const listOneUserService = async (id: string):Promise<IUserRequest> => {

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
        where:{
            id:id
        }
    })

    if(!user){
        throw new AppError(404, "User not found");
    }

    const newImg = app.get(`/upload/:id`, (req, res) => {
        const image = cloudinary.url(user.photo);
        res.json(image);
      })

    console.log(newImg);

    const newUser = {
        username: user.username,
        email: user.email,
        password: user.password,
        dateOfBirth: user.dateOfBirth,
        isAdm: user.isAdm,
        photo: newImg
    }

    return newUser;
}

export default listOneUserService;