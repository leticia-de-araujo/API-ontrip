export interface ICapacity {
  id: string;
  rooms: number;
  beds: number;
  totalGuests: number;
  bathrooms: number;
}

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
