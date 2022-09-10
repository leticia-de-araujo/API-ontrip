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

//a interface seguinte pode nao ser necessaria se usarmos return {...user, password:undefined} no service de criacao de Usuario
export interface IUserNoPassword {
  id: string;
  username: string;
  email: string;
  dateOfBirth: string;
  isAdm: boolean;
  isActive: boolean;
  photo: string;
}

//id gerado automaticamente
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
  photo?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}
