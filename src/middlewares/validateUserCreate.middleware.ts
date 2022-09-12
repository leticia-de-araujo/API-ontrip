import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequest, IValidateUser } from "../interfaces/users";

export const userCreateSchema: SchemaOf<IValidateUser> = yup.object().shape({
  username: yup.string().required().max(20),
  email: yup.string().email().required().max(30),
  password: yup.string().required().min(4).max(50),
  dateOfBirth: yup.string().required(),
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

export const validateUserCreate =
  (schema: SchemaOf<IValidateUser>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const file: any = req.file;
      const data = { ...body, ...file };
      console.log(file);

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        next();
      } catch (err: any) {
        return res.status(400).json({
          message: err.errors?.join(", "),
          status: "Error",
          code: 400,
        });
      }
    } catch (err) {
      next(err);
    }
  };
