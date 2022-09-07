import {
  IAccommodationRequest,
  IAccommodationRequestPatch,
} from "../../../interfaces/accommodations";

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

export const mockedAccomodationInvalid = {
  name: "Marolargo",
  description: "text",
  dailyPrice: "300",
  categoryId: "",
  capacityId: "",
  userId: "",
  typeId: "",
};

export const mockedAccomodationTooLarge: IAccommodationRequest = {
  name: "Marolargo Marolargo Marolargo Marolargo Marolargo",
  description:
    "A stunning apartment, modern furnishings, an incredible view of the nearby beach",
  dailyPrice: 300,
  categoryId: "",
  capacityId: "",
  userId: "",
  typeId: "",
};

export const mockedAccomodationPatch: IAccommodationRequestPatch = {
  dailyPrice: 350,
};
