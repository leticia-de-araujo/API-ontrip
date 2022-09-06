export interface IAccommodation {
  id: string;
  name: string;
  description: string;
  dailyPrice: number;
  isActive: boolean;
  verifiedByAdm: boolean;
  specialOffer: String;
  typeId: string;
  userId: string;
  capacityId: string;
  categoryId: string;
}

//id e' gerado automaticamente, isActive, verifiedByAdm e specialoffer tem valores default
export interface IAccommodationRequest {
  name: string;
  description: string;
  dailyPrice: number;
  typeId: string;
  userId: string;
  capacityId: string;
  categoryId: string;
}

export interface IAccommodationRequestPatch {
  name?: string;
  description?: string;
  dailyPrice?: number;
  isActive?: boolean;
  verifiedByAdm?: boolean;
  specialOffer?: String;
}
