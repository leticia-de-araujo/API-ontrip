import * as yup from "yup";
import { SchemaOf } from "yup";
import { IBookingRequest } from "../../interfaces/bookings";

const bookingCreateSchema: SchemaOf<IBookingRequest> = yup.object().shape({
  checkIn: yup
    .string()
    .required()
    .max(10, "checkIn field should have up to 10 characters")
    .min(10, "checkIn field should have at least 10 characters"),
  checkOut: yup
    .string()
    .required()
    .max(10, "checkOut field should have up to 10 characters")
    .min(10, "checkOut field should have at least 10 characters"),
  userId: yup
    .string()
    .required()
    .min(1, "userId field should have at least 1 character"),
  accommodationId: yup
    .string()
    .required()
    .min(1, "accommodationId field should have at least 1 character"),
});

export default bookingCreateSchema;
