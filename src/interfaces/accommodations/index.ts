export interface IAccommodation {
  id: string;
  name: string;
  description: string;
  dailyPrice: number;
  isActive: boolean;
  verifiedByAdm: boolean;
  specialOffer: string;
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

export interface IAccommodationCreated {
  id: string;
  name: string;
  description: string;
  dailyPrice: number;
  isActive: true;
  verifiedByAdm: false;
  specialOffer: false;
  type: {
    name: string;
  };
  user: {
    userName: string;
    email: string;
    dateOfBirth: Date;
    isAdm: false;
    isActive: true;
    photo: string;
  };
  capacity: {
    rooms: number;
    beds: number;
    totalGuests: number;
    bathrooms: number;
  };
  category: {
    name: string;
  };
}

export interface IAccommodationRequestPatch {
  name?: string;
  description?: string;
  dailyPrice?: number;
  isActive?: boolean;
  verifiedByAdm?: boolean;
  specialOffer?: string;
  capacityId?: string;
  typeId?: string;
}
