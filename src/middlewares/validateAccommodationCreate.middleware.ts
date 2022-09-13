import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { IAccommodationRequest } from "../interfaces/accommodations";

export const accommodationCreateSchema: SchemaOf<IAccommodationRequest> = yup
  .object()
  .shape({
    name: yup
      .string()
      .matches(/^[A-Za-z]+$/)
      .required()
      .max(35),
    description: yup.string().required().max(200),
    dailyPrice: yup.number().required(),
    typeId: yup.string().required(),
    userId: yup.string().required(),
    capacityId: yup.string().required(),
    categoryId: yup.string().required(),
  });

export const validateAccommodationCreate =
  (schema: SchemaOf<IAccommodationRequest>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      console.log(data);

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
