import { SchemaOf } from "yup";
import * as yup from "yup";
import { ICapacityRequest } from "../../interfaces/capacities";

const capacityCreateSchema: SchemaOf<ICapacityRequest> = yup.object().shape({
  rooms: yup
    .number()
    .required()
    .max(10, "Rooms field should have up to 10 characters")
    .min(1, "Rooms field should have at least 1 character"),
  beds: yup
    .number()
    .required()
    .max(10, "Beds field should have up to 10 characters")
    .min(1, "Beds field should have at least 1 character"),
  totalGuests: yup
    .number()
    .required()
    .max(10, "TotalGuests field should have up to 10 characters")
    .min(1, "TotalGuests field should have at least 1 character"),
  bathrooms: yup
    .number()
    .required()
    .max(10, "Bathrooms field should have up to 10 characters")
    .min(1, "Bathrooms field should have at least 1 character"),
});

export default capacityCreateSchema;
