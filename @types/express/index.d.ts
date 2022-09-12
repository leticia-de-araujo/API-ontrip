import * as express from "express";
import { ICapacityRequest } from "../../src/interfaces/capacities";

declare global {
  namespace Express {
    interface Request {
      userEmail?: string;
      userId?: string;
      isAdm: boolean = false;
      isOwner: boolean = false;
      newCapacity?: ICapacityRequest;
    }
  }
}
