import * as yup from "yup";
import { SchemaOf } from "yup";
import { IBookingRequest } from "../../interfaces/bookings";

const bookingCreateSchema: SchemaOf<IBookingRequest> = yup.object().shape({
  checkIn: yup
    .string()
    .required()
    .max(10, "CheckIn field should have up to 10 characters")
    .min(10, "CheckIn field should have at least 10 characters"),
  checkOut: yup
    .string()
    .required()
    .max(10, "CheckOut field should have up to 10 characters")
    .min(10, "CheckOut field should have at least 10 characters"),
  userId: yup
    .string()
    .required()
    .min(1, "UserId field should have at least 1 character"),
  accommodationId: yup
    .string()
    .required()
    .min(1, "AccommodationId field should have at least 1 character"),
});

export default bookingCreateSchema;
