export interface ICapacity {
  id: string;
  name: string;
}

//id e' gerado automaticamente e serve pra PATCH
export interface ICapacityRequest {
  name: string;
}
