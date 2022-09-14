import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequestPatch } from "../../interfaces/users";

const userPatchSchema: SchemaOf<IUserRequestPatch> = yup.object().shape({
  username: yup
    .string()
    .matches(/^[A-Za-z\s]*$/, "UserName field can have only letters and spaces")
    .notRequired()
    .max(20, "UserName field should have up to 20 characters"),
  email: yup
    .string()
    .email()
    .notRequired()
    .max(30, "Email field should have up to 30 characters"),
  password: yup
    .string()
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/,
      "Password field must have at least 1 capital letter, 1 lower case letter, 1 number and 1 special character"
    )
    .notRequired()
    .min(4, "Password field should have at least 4 characters")
    .max(50, "Password field should have up to 50 characters"),
  dateOfBirth: yup
    .string()
    .notRequired()
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

export default userPatchSchema;
