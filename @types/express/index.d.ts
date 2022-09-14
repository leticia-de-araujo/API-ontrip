import * as express from "express";
import { ICapacityRequest } from "../../src/interfaces/capacities";
import { IBookingRequest } from "./../../src/interfaces/bookings/index";

declare global {
  namespace Express {
    interface Request {
      userEmail?: string;
      userId?: string;
      isAdm: boolean = false;
      isOwner: boolean = false;
      newCapacity?: ICapacityRequest;
    }
    interface Request {
      checkIn: string;
      checkOut: string;
      userId: string;
      accommodationId: string;
      newBooking?: IBookingRequest;
    }
  }
}