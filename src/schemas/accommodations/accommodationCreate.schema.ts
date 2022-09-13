import { SchemaOf } from "yup";
import * as yup from "yup";
import { IAccommodationRequest } from "../../interfaces/accommodations";

const accommodationCreateSchema: SchemaOf<IAccommodationRequest> = yup
  .object()
  .shape({
    name: yup
      .string()
      .matches(/^[A-Za-z\s]*$/)
      .required()
      .max(35),
    description: yup.string().required().max(200),
    dailyPrice: yup.number().required(),
    typeId: yup.string().required(),
    userId: yup.string().required(),
    capacityId: yup.string().required(),
    categoryId: yup.string().required(),
  });

export default accommodationCreateSchema;
