import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICapacityRequest } from "../interfaces/capacities";

export const capacityCreateSchema: SchemaOf<ICapacityRequest> = yup
  .object()
  .shape({
    rooms: yup.number().required().max(10, '"rooms" length too large').min(1),
    beds: yup.number().required().max(10, '"beds" length too large').min(1),
    totalGuests: yup
      .number()
      .required()
      .max(10, '"totalGuests" length too large')
      .min(1),
    bathrooms: yup
      .number()
      .required()
      .max(10, '"bathrooms" length too large')
      .min(1),
  });

export const validateCapacityCreate =
  (schema: SchemaOf<ICapacityRequest>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.newCapacity = validatedData;

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
