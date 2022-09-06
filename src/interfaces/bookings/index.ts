export interface IBooking {
  checkIn: string;
  checkout: string;
  status: string;
  userId: string;
  accommodationId: string;
}

//id criado automaticamente, status tem valor padrao
export interface IBookingRequest {
  checkIn: string;
  checkout: string;
  userId: string;
  accommodationId: string;
}

export interface IBookingRequestPatch {
  checkIn?: string;
  checkout?: string;
  status?: string;
}
