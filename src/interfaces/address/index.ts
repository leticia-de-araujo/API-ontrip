export interface IAddress {
  id: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  street: string;
  complement?: string;
  accommodationId: string;
}

//id gerado automaticamente
export interface IAddressRequest {
  country: string;
  state: string;
  city: string;
  postalCode: string;
  street: string;
  complement?: string;
  accommodationId: string;
}

export interface IAddressRequestPatch {
  country?: string;
  state?: string;
  city?: string;
  postalCode?: string;
  street?: string;
  complement?: string;
}
