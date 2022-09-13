import {
  IAccommodationRequest,
  IAccommodationRequestPatch,
} from "../../../interfaces/accommodations";

export const mockedAccommodation: IAccommodationRequest = {
  name: "Marolargo",
  description:
    "A stunning apartment, modern furnishings, an incredible view of the nearby beach.",
  dailyPrice: 300,
  categoryId: "",
  capacityId: "",
  userId: "",
  typeId: "",
};

export const mockedAccommodation2: IAccommodationRequest = {
  name: "Complete apartment to work",
  description:
    "Ideal apartment to work remotely, quiet, comfortable, and with all the requirements for a perfect home office.",
  dailyPrice: 450,
  categoryId: "",
  capacityId: "",
  userId: "",
  typeId: "",
};

export const mockedAccommodation3: IAccommodationRequest = {
  name: "Apartament to Work Remotely",
  description:
    "Beautiful apartment nearby to the beach. Combining work and travel has never been so easy. We wait for you!.",
  dailyPrice: 500,
  categoryId: "",
  capacityId: "",
  userId: "",
  typeId: "",
};

export const mockedAccommodationInvalid = {
  name: "Marolargo",
  description: "text",
  dailyPrice: "300",
  categoryId: "",
  capacityId: "",
  userId: "",
  typeId: "",
};

export const mockedAccommodationInvalidType = {
  name: 123456,
  description: "text",
  dailyPrice: "300",
  categoryId: "",
  capacityId: "",
  userId: "",
  typeId: "",
};

export const mockedAccommodationTooLarge: IAccommodationRequest = {
  name: "Marolargo Marolargo Marolargo Marolargo Marolargo",
  description:
    "A stunning apartment, modern furnishings, an incredible view of the nearby beach",
  dailyPrice: 300,
  categoryId: "",
  capacityId: "",
  userId: "",
  typeId: "",
};

export const mockedAccommodationPatch: IAccommodationRequestPatch = {
  dailyPrice: 420,
};

export const mockedAccommodationInvalidPatch = {
  description: "text",
  dailyPrice: "300",
};

export const mockedAccommodationTooLargePatch = {
  name: "Marolargo Marolargo Marolargo Marolargo Marolargo",
};
