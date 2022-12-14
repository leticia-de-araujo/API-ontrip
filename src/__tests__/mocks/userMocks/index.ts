import {
  IUserLogin,
  IUserRequest,
  IUserRequestPatch,
} from "../../../interfaces/users/index";

export const mockedUser: IUserRequest = {
  username: "Hitalo",
  email: "ontripm4@gmail.com",
  password: "123!Aa",
  dateOfBirth: "2000/02/11",
  isAdm: false,
};

export const mockedUser2: IUserRequest = {
  username: "hitalo Atalaia",
  email: "ontripm4@gmail.com",
  password: "123!Aa",
  dateOfBirth: "1998/02/11",
  isAdm: false,
};

export const mockedUser3: IUserRequest = {
  username: "Marquinhos Atalaia",
  email: "marquinhos@mail.com",
  password: "123!Aa",
  dateOfBirth: "1999/02/11",
  isAdm: false,
};

export const mockedUser4: IUserRequest = {
  username: "Paulo Silva",
  email: "paulosilva@mail.com",
  password: "123!Aa",
  dateOfBirth: "1995/08/07",
  isAdm: false,
};

export const mockedUser6: IUserRequest = {
  username: "Passos",
  email: "passos@mail.com",
  password: "123!Aa",
  dateOfBirth: "1995/08/07",
  isAdm: false,
};

export const mockedUserPatch: IUserRequestPatch = {
  email: "hitalo333@mail.com",
  password: "123!Aa",
};

export const mockedUserPatch2: IUserRequestPatch = {
  email: "hitalo444@mail.com",
  password: "123!Aa",
};

export const mockedUserAlternative: IUserRequest = {
  username: "Andre Perregil",
  email: "andre@mail.com",
  password: "123!Aa",
  dateOfBirth: "1989/02/11",
  isAdm: false,
};

export const mockedUserWithoutAllFields: any = {
  username: "Marquinhos Atalaia",
  email: "marquinhos@mail.com",
  password: "123!Aa",
  isAdm: false,
};

export const mockedAdmin: IUserRequest = {
  username: "Andre",
  email: "andre@mail.com",
  password: "123!Aa",
  dateOfBirth: "1993/02/07",
  isAdm: true,
};

export const mockedUserLogin: IUserLogin = {
  email: "ontripm4@gmail.com",
  password: "123!Aa",
};

export const mockedAdminLogin: IUserLogin = {
  email: "andre@mail.com",
  password: "123!Aa",
};

export const mockedUser3Login: IUserLogin = {
  email: "marquinhos@mail.com",
  password: "123!Aa",
};

export const mockedUser4Login: IUserLogin = {
  email: "paulosilva@mail.com",
  password: "123!Aa",
};

export const mockedUser6Login: IUserLogin = {
  email: "passos@mail.com",
  password: "123!Aa",
};

export const mockedUserAlternativeLogin: IUserLogin = {
  email: "andre@mail.com",
  password: "123!Aa",
};

export const mockedUserWrongType: any = {
  username: "hitaro",
  email: 1,
  password: 123456,
  dateOfBirth: "2000/02/11",
  isAdm: "false",
};

export const mockedUserTooLong: any = {
  username: "hitaro conectitur conetur confectum conferebamus confidam i",
  email: "hitalo@mail.com",
  password: "123!Aa",
  dateOfBirth: "2000/02/11",
  isAdm: false,
};
