import {
  IBookingRequest,
  IBookingRequestPatch,
} from "../../../interfaces/bookings";

export const mockedBooking: IBookingRequest = {
  checkIn: "2023/01/01",
  checkout: "2023/07/01",
  userId: "",
  accommodationId: "",
};

//checkout antes do checkin
export const mockedBookingInvalidDate: IBookingRequest = {
  checkIn: "2023/01/01",
  checkout: "2022/07/01",
  userId: "",
  accommodationId: "",
};

export const mockedBookingPatch: IBookingRequestPatch = {
  status: "Canceled",
};
