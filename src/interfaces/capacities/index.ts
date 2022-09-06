export interface ICapacity {
  id: string;
  rooms: number;
  beds: number;
  totalGuests: number;
  bathrooms: number;
}

//id e' gerado automaticamente e serve pra PATCH
export interface ICapacityRequest {
  rooms: number;
  beds: number;
  totalGuests: number;
  bathrooms: number;
}

export interface ICapacityRequestPatch {
  rooms?: number;
  beds?: number;
  totalGuests?: number;
  bathrooms?: number;
}
