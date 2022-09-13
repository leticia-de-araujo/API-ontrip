import * as yup from "yup";
import { SchemaOf } from "yup";
import { IValidateUser } from "../../interfaces/users";

const userCreateSchema: SchemaOf<IValidateUser> = yup.object().shape({
  username: yup
    .string()
    .matches(/^[A-Za-z\s]*$/, '"username" has an invalid type')
    .required()
    .max(20, '"username" length too large'),
  email: yup.string().email().required().max(30, '"email" length too large'),
  password: yup
    .string()
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/,
      "Password field must have at least 1 capital letter, 1 lower case letter, 1 number and 1 special character"
    )
    .required()
    .min(4)
    .max(50, '"password" length too large'),
  dateOfBirth: yup
    .string()
    .required()
    .matches(
      /^\d{4}[\/](0[1-9]|1[0-2])[\/](0[1-9]|[12][0-9]|3[01])$/,
      "Format should be yyyy/mm/dd"
    ),
  isAdm: yup.boolean(),
  file: yup.object().shape({
    fieldname: yup.mixed(),
    originalname: yup.mixed(),
    encoding: yup.mixed(),
    mimetype: yup.mixed(),
    destination: yup.mixed(),
    filename: yup.mixed(),
    path: yup.mixed(),
    size: yup.number(),
  }),
});

export default userCreateSchema;
