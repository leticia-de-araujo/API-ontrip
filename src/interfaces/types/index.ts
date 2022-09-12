export interface IType {
  id: string;
  name: string;
  isActive?: boolean;
}

//id gerado automaticamente e serve pra PATCH
export interface ITypeRequest {
  name: string;
}
