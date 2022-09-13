import { Request, Response, NextFunction } from "express";
import { SchemaOf } from "yup";
import { IAccommodationRequestPatch } from "../../interfaces/accommodations";

const validateAccommodationPatch =
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

export default validateAccommodationPatch;
