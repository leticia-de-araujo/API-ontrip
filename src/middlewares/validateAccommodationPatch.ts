import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { IAccommodationRequestPatch } from "../interfaces/accommodations";

export const accommodationPatchSchema: SchemaOf<IAccommodationRequestPatch> =
  yup.object().shape({
    name: yup
      .string()
      .matches(/^[A-Za-z]+$/)
      .max(35),
    description: yup.string().max(200),
    dailyPrice: yup.number(),
    specialOffer: yup.boolean(),
    typeId: yup.string(),
    verifiedByAdm: yup.boolean(),
    capacityId: yup.string(),
  });

export const validateAccommodationPatch =
  (schema: SchemaOf<IAccommodationRequestPatch>) =>
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
