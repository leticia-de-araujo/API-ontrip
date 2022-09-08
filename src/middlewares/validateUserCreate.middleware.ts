import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequest } from "../interfaces/users";

export const userCreateSchema: SchemaOf<IUserRequest> = yup.object().shape({
  username: yup.string().required().max(20),
  email: yup.string().email().required().max(30),
  password: yup.string().required().min(4).max(50),
  dateOfBirth: yup
    .string()
    .required()
    .matches(
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
      "Format should be yyyy-mm-dd"
    ),
  isAdm: yup.boolean(),
  photo: yup.string().required(),
});

export const validateUserCreate =
  (schema: SchemaOf<IUserRequest>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

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
