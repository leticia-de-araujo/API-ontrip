import { SchemaOf } from "yup";
import * as yup from "yup";
import { IAccommodationRequest } from "../../interfaces/accommodations";

const accommodationCreateSchema: SchemaOf<IAccommodationRequest> = yup
  .object()
  .shape({
    name: yup
      .string()
      .matches(/^[A-Za-z\s]*$/, "Name field can have only letters and spaces")
      .required()
      .max(35, "Name field should have up to 35 characters"),
    description: yup
      .string()
      .required()
      .max(200, "Description field should have up to 200 characters"),
    dailyPrice: yup.number().required(),
    typeId: yup.string().required(),
    userId: yup.string().required(),
    capacityId: yup.string().required(),
    categoryId: yup.string().required(),
  });

export default accommodationCreateSchema;
