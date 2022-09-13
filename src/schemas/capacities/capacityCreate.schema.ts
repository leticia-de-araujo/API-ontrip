import { SchemaOf } from "yup";
import * as yup from "yup";
import { ICapacityRequest } from "../../interfaces/capacities";

const capacityCreateSchema: SchemaOf<ICapacityRequest> = yup.object().shape({
  rooms: yup.number().required().max(10).min(1),
  beds: yup.number().required().max(10).min(1),
  totalGuests: yup.number().required().max(10).min(1),
  bathrooms: yup.number().required().max(10).min(1),
});

export default capacityCreateSchema;
