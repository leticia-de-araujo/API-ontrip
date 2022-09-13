import { IBookingRequest } from './../interfaces/bookings/index';
import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";

export const bookingCreateSchema: SchemaOf<IBookingRequest> = yup
  .object()
  .shape({
    checkIn: yup.string().required().max(10).min(10),
    checkOut: yup.string().required().max(10).min(10),
    userId: yup.string().required().min(1),
    accommodationId: yup.string().required().min(1),
  });

export const validateBookingCreate =
  (schema: SchemaOf<IBookingRequest>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.newBooking = validatedData;

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
