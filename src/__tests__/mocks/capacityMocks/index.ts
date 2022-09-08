import {
  ICapacityRequest,
  ICapacityRequestPatch,
} from "../../../interfaces/capacities";

export const mockedCapacity: ICapacityRequest = {
  rooms: 1,
  beds: 1,
  totalGuests: 2,
  bathrooms: 1,
};

export const mockedCapacity2: ICapacityRequest = {
  rooms: 1,
  beds: 2,
  totalGuests: 2,
  bathrooms: 1,
};

export const mockedCapacity3: ICapacityRequest = {
  rooms: 1,
  beds: 2,
  totalGuests: 3,
  bathrooms: 1,
};

export const mockedCapacityInvalid: ICapacityRequest = {
  rooms: -1,
  beds: 1,
  totalGuests: 0,
  bathrooms: 1,
};

export const mockedCapacityPatch: ICapacityRequestPatch = {
  totalGuests: 1,
};

export const mockedCapacityInvalidPatch: ICapacityRequestPatch = {
  totalGuests: 0,
};
