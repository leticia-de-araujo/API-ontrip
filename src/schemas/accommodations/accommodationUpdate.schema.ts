import * as yup from "yup";
import { SchemaOf } from "yup";
import { IAccommodationRequestPatch } from "../../interfaces/accommodations";

const accommodationPatchSchema: SchemaOf<IAccommodationRequestPatch> = yup
  .object()
  .shape({
    name: yup
      .string()
      .matches(/^[A-Za-z\s]*$/)
      .max(35),
    description: yup.string().max(200),
    dailyPrice: yup.number(),
    specialOffer: yup.boolean(),
    typeId: yup.string(),
    verifiedByAdm: yup.boolean(),
    capacityId: yup.string(),
  });

export default accommodationPatchSchema;
