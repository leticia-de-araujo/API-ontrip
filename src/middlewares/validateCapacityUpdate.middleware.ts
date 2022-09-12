import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICapacityRequestPatch } from "../interfaces/capacities";

export const capacityUpdateSchema: SchemaOf<ICapacityRequestPatch> = yup
  .object()
  .shape({
    rooms: yup.number().notRequired().max(10).min(1),
    beds: yup.number().notRequired().max(10).min(1),
    totalGuests: yup.number().notRequired().max(10).min(1),
    bathrooms: yup.number().notRequired().max(10).min(1),
  });

export const validateCapacityUpdate =
  (schema: SchemaOf<ICapacityRequestPatch>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        /* req.newCapacity = validatedData; */

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
