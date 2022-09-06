export interface IType {
  id: string;
  name: string;
}

//id gerado automaticamente e serve pra PATCH
export interface ITypeRequest {
  name: string;
}
