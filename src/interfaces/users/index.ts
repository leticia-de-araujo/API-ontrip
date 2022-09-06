<<<<<<< HEAD
=======
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
>>>>>>> 0a1c8345307d7d7788aa61e50e767e4e03667e52
export interface IUserRequest {
  username: string;
  email: string;
  password: string;
  dateOfBirth: string;
  isAdm?: boolean;
  photo: string;
}

<<<<<<< HEAD
export interface IUserLogin {
  email: string;
  password: string;
}

export interface MyToken {
  isAdm: boolean;
  email: string;
  id: string;
}

=======
>>>>>>> 0a1c8345307d7d7788aa61e50e767e4e03667e52
export interface IUserRequestPatch {
  username?: string;
  email?: string;
  password?: string;
  dateOfBirth?: string;
  isAdm?: boolean;
  photo?: string;
}
