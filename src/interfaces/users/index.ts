export interface IUserRequest {
  username: string;
  email: string;
  password: string;
  dateOfBirth: string;
  isAdm?: boolean;
  photo: string;
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
  photo?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}
