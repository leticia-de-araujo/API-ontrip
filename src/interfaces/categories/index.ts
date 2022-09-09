export interface ICategory {
  id: string;
  name: string;
}

//id e' gerado automaticamente e serve pra PATCH
export interface ICategoryRequest {
  name: string;
}

export interface ICategoryRequestPatch {
  name?: string;
}
