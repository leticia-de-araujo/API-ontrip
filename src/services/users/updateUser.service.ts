import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { IUserRequest } from "../../interfaces/users";
import { hash } from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const updateUserService = async (
  id: string,
  { username, email, password, dateOfBirth, isAdm, photo }: IUserRequest
): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { id: id } });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  let hashedPassword;

  if (password) {
    hashedPassword = await hash(password, 10);
  }

  if (photo) {
    const cloudinaryFile: any = await cloudinary.uploader.upload(
      photo.path,
      (error: any, result: any) => {
        if (error) {
          throw new AppError(500, `Internal server error, ${error}`);
        }
        return result;
      }
    );

    fs.unlink(photo.path, (error) => {
      if (error) {
        console.log("erro");
        throw new AppError(500, `Internal server error ${error}`);
      }
    });

    photo = cloudinaryFile.url;
  }

  if (!photo) {
    photo = "Imagem padrão";
  }

  const newUser = userRepository.save({
    id: id,
    username,
    email,
    dateOfBirth,
    password: hashedPassword,
    isAdm,
    photo,
  });

  return newUser;
};

export default updateUserService;
