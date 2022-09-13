import { SchemaOf } from "yup";
import * as yup from "yup";
import { ICapacityRequestPatch } from "../../interfaces/capacities";

const capacityUpdateSchema: SchemaOf<ICapacityRequestPatch> = yup
  .object()
  .shape({
    rooms: yup.number().notRequired().max(10).min(1),
    beds: yup.number().notRequired().max(10).min(1),
    totalGuests: yup.number().notRequired().max(10).min(1),
    bathrooms: yup.number().notRequired().max(10).min(1),
  });

export default capacityUpdateSchema;
