export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  dateOfBirth: string;
  isAdm: boolean;
  isActive: boolean;
  photo: string;
}

export interface IUserNoPassword {
  id: string;
  username: string;
  email: string;
  dateOfBirth: string;
  isAdm: boolean;
  isActive: boolean;
  photo: string;
}

export interface IUserRequest {
  username: string;
  email: string;
  password: string;
  dateOfBirth: string;
  isAdm?: boolean;
  photo?: any;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface MyToken {
  isAdm: boolean;
  email: string;
  id: string;
}

export interface IUserRequestPatch {
  username?: string;
  email?: string;
  password?: string;
  dateOfBirth?: string;
  isAdm?: boolean;
  file?: any;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IValidateUser {
  username: string;
  email: string;
  password: string;
  dateOfBirth: string;
  isAdm?: boolean;
  file?: any;
}
