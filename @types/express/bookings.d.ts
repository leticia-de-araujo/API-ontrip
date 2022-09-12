import { IBookingRequest } from "./../../src/interfaces/bookings/index";
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      checkIn: string;
      checkOut: string;
      userId: string;
      accommodationId: string;
      newBooking?: IBookingRequest;
    }
  }
}
