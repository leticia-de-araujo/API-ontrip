import * as yup from "yup";
import { SchemaOf } from "yup";
import { IAccommodationRequestPatch } from "../../interfaces/accommodations";

const accommodationPatchSchema: SchemaOf<IAccommodationRequestPatch> = yup
  .object()
  .shape({
    name: yup
      .string()
      .matches(/^[A-Za-z\s]*$/, "name field can have only letters and spaces")
      .max(35, "name field should have up to 35 characters"),
    description: yup
      .string()
      .max(200, "description field should have up to 200 characters"),
    dailyPrice: yup.number(),
    specialOffer: yup.boolean(),
    typeId: yup.string(),
    verifiedByAdm: yup.boolean(),
    capacityId: yup.string(),
  });

export default accommodationPatchSchema;
