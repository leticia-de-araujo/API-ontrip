import { IUserLogin, IUserRequest } from "../../interfaces/users";
import {
  IAccommodationRequest,
  IAccommodationRequestPatch,
} from "../../interfaces/accommodations";
import {
  IAddressRequest,
  IAddressRequestPatch,
} from "../../interfaces/address";
import {
  IBookingRequest,
  IBookingRequestPatch,
} from "../../interfaces/bookings";
import { ICategoryRequest } from "../../interfaces/categories";
import { ICapacityRequest } from "../../interfaces/capacities";
import { ITypeRequest } from "../../interfaces/types";
import { IPhotoRequest, IPhotoRequestPatch } from "../../interfaces/photos";

export const mockedUser: IUserRequest = {
  username: "Adalberto",
  email: "adal@berto.com",
  dateOfBirth: "2000/01/01",
  password: "123456",
  isAdm: false,
  photo: "aquiSeriaAFotoBase64",
};

export const mockedAdmin: IUserRequest = {
  username: "Euclides",
  email: "eu@clides.com",
  dateOfBirth: "2000/01/01",
  password: "123456",
  isAdm: true,
  photo: "aquiSeriaAFotoBase64",
};

export const mockedUserLogin: IUserLogin = {
  email: "adal@berto.com",
  password: "123456",
};

export const mockedAdminLogin: IUserLogin = {
  email: "eu@clides.com",
  password: "123456",
};

export const mockedCategory: ICategoryRequest = {
  name: "bedroom",
};

export const mockedPhoto: IPhotoRequest = {
  content: "thisIsAStringBase64",
  accommodationId: "",
};

export const mockedPhotoPatch: IPhotoRequestPatch = {
  content: "thisIsAStringBase64, Mas essa mudou agora",
};

export const mockedType: ITypeRequest = {
  name: "apartment",
};

export const mockedCapacity: ICapacityRequest = {
  rooms: 1,
  beds: 1,
  totalGuests: 2,
  bathrooms: 1,
};

export const mockedAccomodation: IAccommodationRequest = {
  name: "Marolargo",
  description:
    "A stunning apartment, modern furnishings, an incredible view of the nearby beach",
  dailyPrice: 300,
  categoryId: "",
  capacityId: "",
  userId: "",
  typeId: "",
};

export const mockedAccomodationInvalidDescription: IAccommodationRequest = {
  name: "Marolargo",
  description: "text",
  dailyPrice: 300,
  categoryId: "",
  capacityId: "",
  userId: "",
  typeId: "",
};

export const mockedAccomodationPatch: IAccommodationRequestPatch = {
  dailyPrice: 350,
};

export const mockedAddress: IAddressRequest = {
  country: "Brazil",
  state: "Bahia",
  city: "Salvador",
  street: "Rua da praia",
  complement: "complexo 1 apartamento 33",
  postalCode: "40020-901",
  accommodationId: "",
};

export const mockedAddressInvalidZipCode: IAddressRequest = {
  country: "Brazil",
  state: "Bahia",
  city: "Salvador",
  street: "Rua da praia",
  complement: "complexo 1 apartamento 33",
  postalCode: "40020-901420",
  accommodationId: "",
};

export const mockedAdressPatch: IAddressRequestPatch = {
  country: "Brasil",
};

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
