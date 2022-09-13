export interface IBooking {
  checkIn: string;
  checkOut: string;
  status: string;
  userId: string;
  accommodationId: string;
}

export interface IBookingRequest {
  checkIn: string;
  checkOut: string;
  userId: string;
  accommodationId: string;
}

export interface IBookingRequestPatch {
  checkIn?: string;
  checkOut?: string;
  status?: string;
}
