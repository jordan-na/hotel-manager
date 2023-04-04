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

bookingsRouter.get("/", async (req, res) => {
   let bookings;
   try {
      if (req.query.customerId) {
         bookings = await bookingServices.getBookingsByCustomerId(req.query.customerId);
      } else {
         bookings = await bookingServices.getBookings();
      }
   } catch(err) {
      res.status(500).json({ message: err.message });
   }
   res.json(bookings);
});

bookingsRouter.get("/:bookingId", async (req, res) => {
   let booking;
   try {
      booking = await bookingServices.getBookingById(req.params.bookingId);
   } catch(err) {
      res.status(500).json({ message: err.message });
   }
   res.json(booking);
});

bookingsRouter.delete("/", async (req, res) => {
   try {
      await bookingServices.deleteBookingsByIds(req.body);
      res.status(200).json({ message: "Bookings deleted" });
   } catch(err) {
      res.status(500).json({ message: err.message });
   }
});

bookingsRouter.patch("/:bookingId", async (req, res) => {
   const bookingId = req.params.bookingId;
   const startDate = formatDateForSQL(req.body.startDate);
   const endDate = formatDateForSQL(req.body.endDate);
   try {
      await bookingServices.updateBookingById(bookingId, startDate, endDate);
      res.status(200).json({ message: "Booking updated" });
   } catch(err) {
      res.status(500).json({ message: err.message });
   }
});

export default bookingsRouter;