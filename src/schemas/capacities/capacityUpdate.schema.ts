import { SchemaOf } from "yup";
import * as yup from "yup";
import { ICapacityRequestPatch } from "../../interfaces/capacities";

const capacityUpdateSchema: SchemaOf<ICapacityRequestPatch> = yup
  .object()
  .shape({
    rooms: yup
      .number()
      .notRequired()
      .max(10, "The maximum number of rooms is 10")
      .min(1, "The minimum number of rooms is 1"),
    beds: yup
      .number()
      .notRequired()
      .max(10, "The maximum number of beds is 10")
      .min(1, "The minimum number of beds is 1"),
    totalGuests: yup
      .number()
      .notRequired()
      .max(10, "The maximum number of totalGuests is 10")
      .min(1, "The minimum number of totalGuests is 1"),
    bathrooms: yup
      .number()
      .notRequired()
      .max(10, "The maximum number of bathrooms is 10")
      .min(1, "The minimum number of bathrooms is 1"),
  });

export default capacityUpdateSchema;
