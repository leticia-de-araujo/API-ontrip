import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { IUserRequestPatch } from "../../interfaces/users";
import { hash } from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const updateUserService = async (
  id: string,
  admStatus: boolean,
  isActive: boolean,
  { username, email, password, dateOfBirth, isAdm, file }: IUserRequestPatch
): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { id: id } });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (email) {
    const emailAlreadyExists = await userRepository.findOne({
      where: { email: email },
    });

    if (emailAlreadyExists) {
      throw new AppError(409, "Email already exists");
    }
  }

  let hashedPassword;

  if (password) {
    hashedPassword = await hash(password, 10);
  }

  let photo;

  if (file) {
    const cloudinaryFile: any = await cloudinary.uploader.upload(
      file.path,
      (error: any, result: any) => {
        if (error) {
          throw new AppError(500, `Internal server error, ${error}`);
        }
        return result;
      }
    );

    fs.unlink(file.path, (error) => {
      if (error) {
        throw new AppError(500, `Internal server error ${error}`);
      }
    });

    photo = cloudinaryFile.url;
  }

  if (!file) {
    photo =
      "https://res.cloudinary.com/duz8wq1jo/image/upload/v1663107146/Profile_qinmi4.png";
  }

  const userToUpdate = {
    username: username ? username : user.username,
    email: email ? email : user.email,
    dateOfBirth: dateOfBirth ? dateOfBirth : user.dateOfBirth,
    password: password ? hashedPassword : user.password,
    isAdm: isAdm ? isAdm : user.isAdm,
    isActive: admStatus ? isActive : user.isActive,
    photo: file ? photo : user.photo,
  };

  const userCheck = await userRepository.findOne({
    where: {
      username: userToUpdate.username,
      email: userToUpdate.email,
      dateOfBirth: userToUpdate.dateOfBirth,
      password: userToUpdate.password,
      isAdm: userToUpdate.isAdm,
      isActive: userToUpdate.isActive,
      photo: userToUpdate.photo,
    },
  });

  if (userCheck) {
    throw new AppError(
      400,
      "Not possible to update a user without having any changes in any field"
    );
  }

  await userRepository.update(id, userToUpdate);

  const userUpdated = await userRepository.findOne({ where: { id: id } });

  return userUpdated!;
};

export default updateUserService;
