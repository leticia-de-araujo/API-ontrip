import { Booking } from "../entities/booking.entity";

export const bookingAvailability = (
  checkIn: string,
  checkOut: string,
  array: Booking[]
) => {
  const nCheckIn = Number(checkIn.split("/").join(""));
  const nCheckOut = Number(checkOut.split("/").join(""));

  let result = false;
  array.forEach((booking) => {
    if (booking.status != "cancelled") {
      const oCheckIn = Number(booking.checkIn.split("/").join(""));
      const oCheckOut = Number(booking.checkOut.split("/").join(""));

      const case1 = nCheckIn > oCheckIn && nCheckIn < oCheckOut;
      const case2 = nCheckOut > oCheckIn && nCheckOut < oCheckOut;
      const case3 = nCheckIn < oCheckIn && nCheckOut > oCheckOut;

      if (case1 || case2 || case3) {
        result = true;
      }
    }
  });
  return result;
};
