import * as yup from "yup";
import { SchemaOf } from "yup";
import { IBookingRequest } from "../../interfaces/bookings";

const bookingCreateSchema: SchemaOf<IBookingRequest> = yup.object().shape({
  checkIn: yup.string().required().max(10).min(10),
  checkOut: yup.string().required().max(10).min(10),
  userId: yup.string().required().min(1),
  accommodationId: yup.string().required().min(1),
});

export default bookingCreateSchema;
