import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequestPatch } from "../../interfaces/users";

const userPatchSchema: SchemaOf<IUserRequestPatch> = yup.object().shape({
  username: yup
    .string()
    .matches(/^[A-Za-z\s]*$/)
    .notRequired()
    .max(20),
  email: yup.string().email().notRequired().max(30),
  password: yup.string().notRequired().min(4).max(50),
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
