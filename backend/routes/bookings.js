import express from "express";
import bookingServices from "../services/booking-services.js";
import { ulid } from "ulid";
import { formatDateForSQL } from "../utils/date-formatter.js";

const bookingsRouter = express.Router();

bookingsRouter.post("/", async (req, res) => {
   try {
      const booking = {...req.body};
      booking.bookingId = ulid();
      booking.startDate = formatDateForSQL(booking.startDate);
      booking.endDate = formatDateForSQL(booking.endDate);
      await bookingServices.createNewBooking(booking);
      res.status(201).json({ message: "Booking created" });
   } catch(err) {
      res.status(500).json({ message: err.message });
   }
});

export default bookingsRouter;