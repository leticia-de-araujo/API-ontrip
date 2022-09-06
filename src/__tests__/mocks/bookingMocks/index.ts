import {
  IBookingRequest,
  IBookingRequestPatch
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

export const mockedBooking2: IBookingRequest = {
  checkIn: "2022/25/12",
  checkout: "2022/30/12",
  accommodationId: "1",
  userId: "1"
}

export const mockedBooking3: IBookingRequest = {
  checkIn: "2023/25/12",
  checkout: "2023/30/12",
  accommodationId: "1",
  userId: "1"
}

export const mockedUpdateBooking: IBookingRequestPatch = {
  checkIn: "2022/16/12",
  checkout: "2022/20/12",
  status: "booked"
}

export const mockedBookingWithoutAllFields: IBookingRequestPatch = {
  checkIn: "2022/16/12",
  status: "booked"
}