import { SchemaOf } from "yup";
import * as yup from "yup";
import { ICapacityRequest } from "../../interfaces/capacities";

const capacityCreateSchema: SchemaOf<ICapacityRequest> = yup.object().shape({
  rooms: yup
    .number()
    .required()
    .max(10, "The maximum number of rooms is 10")
    .min(1, "The minimum number of rooms is 1"),
  beds: yup
    .number()
    .required()
    .max(10, "The maximum number of beds is 10")
    .min(1, "The minimum number of beds is 1"),
  totalGuests: yup
    .number()
    .required()
    .max(10, "The maximum number of totalGuests is 10")
    .min(1, "The minimum number of totalGuests is 1"),
  bathrooms: yup
    .number()
    .required()
    .max(10, "The maximum number of bathrooms is 10")
    .min(1, "The minimum number of bathrooms is 1"),
});

export default capacityCreateSchema;
