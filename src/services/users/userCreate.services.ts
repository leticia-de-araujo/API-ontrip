import AppDataSource from "../../data-source";
import { hash } from "bcryptjs";
import { AppError } from "../../errors/AppError";
import { IUserRequest } from "../../interfaces/users";
import { User } from "../../entities/users.entity";
import { v4 as uuid } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import handleErrorMiddleware from "../../middlewares/handleError.middleware";

const userCreateService = async ({
  username,
  email,
  password,
  dateOfBirth,
  isAdm,
  photo,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const emailAlreadyExists = await userRepository.findOneBy({
    email: email,
  });
  if (emailAlreadyExists) {
    throw new AppError(403, "This email already exists");
  }

  const cloudinaryFile: any = await cloudinary.uploader.upload(
    photo.path,
    (error: any, result: any) => {
      if (error) {
        throw new AppError(500, `Internal server error, ${error}`);
      }
      result;
    }
  );

  fs.unlink(photo.path, (error) => {
    if (error) {
      console.log("erro");
      throw new AppError(500, `Internal server error ${error}`);
    }
  });
  photo = cloudinaryFile.public_id;

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
