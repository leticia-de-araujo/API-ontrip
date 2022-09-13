import {
  IAddressRequest,
  IAddressRequestPatch,
} from "../../../interfaces/address";

export const mockedAddress: IAddressRequest = {
  country: "Brazil",
  state: "Bahia",
  city: "Salvador",
  street: "Rua da praia",
  complement: "complexo 1 apartamento 33",
  postalCode: "40020-901",
  accommodationId: "",
};

export const mockedAddressInvalidAccommodationId: IAddressRequest = {
  country: "Brazil",
  state: "Bahia",
  city: "Salvador",
  street: "Rua da praia",
  complement: "complexo 1 apartamento 33",
  postalCode: "40020-901",
  accommodationId: "",
};

export const mockedAddressPatch: IAddressRequestPatch = {
  street: "Avenida papagaio paraguaio",
  accommodationId: "",
};
