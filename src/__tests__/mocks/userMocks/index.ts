import { IUserLogin, IUserRequest } from "../../../interfaces/users/index";

export const mockedUser: IUserRequest = {
  username: "Hitalo",
  email: "hitalo@mail.com",
  password: "123456",
  dateOfBirth: "2000-02-11",
  isAdm: false,
};

export const mockedUser2: IUserRequest = {
  username: "Marquinhos Atalaia",
  email: "hitalo@mail.com",
  password: "123456",
  dateOfBirth: "1999-02-11",
  isAdm: false,
};

export const mockedUser3: IUserRequest = {
  username: "Marquinhos Atalaia",
  email: "marquinhos@mail.com",
  password: "123456",
  dateOfBirth: "1999-02-11",
  isAdm: false,
};

export const mockedUserWithoutAllFields: any = {
  username: "Marquinhos Atalaia",
  email: "marquinhos@mail.com",
  password: "123456",
  isAdm: false,
};

export const mockedAdmin: IUserRequest = {
  username: "Andre",
  email: "andre@mail.com",
  password: "123456",
  dateOfBirth: "1993-02-07",
  isAdm: true,
};

export const mockedUserLogin: IUserLogin = {
  email: "hitalo@mail.com",
  password: "123456",
};

export const mockedAdminLogin: IUserLogin = {
  email: "andre@mail.com",
  password: "123456",
};

export const mockedUser3Login: IUserLogin = {
  email: "marquinhos@mail.com",
  password: "123456",
};

export const mockedUserWrongType: any = {
  username: "Hitalo",
  email: "hitalo@mail.com",
  password: 123456,
  dateOfBirth: "2000-02-11",
  isAdm: "false",
};
