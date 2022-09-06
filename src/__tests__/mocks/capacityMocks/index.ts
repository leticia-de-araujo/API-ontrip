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

export const mockedCapacityPatch: ICapacityRequestPatch = {
  totalGuests: 1,
};
