import express from "express";
import roomServices from "../services/room-services.js";
import { formatDateForSQL } from "../utils/date-formatter.js";

const roomsRouter = express.Router();

roomsRouter.get("/", async (req, res) => {
   try {
      let rooms;
      if(Object.keys(req.query).length > 0) {
         const query = {...req.query};
         if(query["check-in"]) query["check-in"] = formatDateForSQL(query["check-in"]);
         if(query["check-out"]) query["check-out"] = formatDateForSQL(query["check-out"]);
         rooms = await roomServices.getRoomsBySearchParams(query);
      } else {
         rooms = await roomServices.getRooms();
      }
      res.json(rooms);
   } catch(err) {
      res.status(500).json({ message: err.message });
   }
});

roomsRouter.get("/:roomId", async (req, res) => {
   try {
      const room = await roomServices.getRoomById(req.params.roomId);
      room.amenities = await roomServices.getAmenitiesByRoomId(req.params.roomId);
      room.issues = await roomServices.getIssuesByRoomId(req.params.roomId);
      res.json(room);
   } catch(err) {
      res.status(500).json({ message: err.message });
   }
});

roomsRouter.get("/:roomId/availability", async (req, res) => {
   try {
      const roomId = req.params.roomId;
      const bookingId = req.query.bookingId;
      const checkInDate = formatDateForSQL(req.query["check-in"]);
      const checkOutDate = formatDateForSQL(req.query["check-out"]);
      let roomAvailability;
      if(bookingId) {
         roomAvailability = await roomServices.getRoomAvailabilityToUpdate(roomId, bookingId, checkInDate, checkOutDate);
      } else {
         roomAvailability = await roomServices.getRoomAvailability(roomId, checkInDate, checkOutDate);
      }
      res.json(roomAvailability);
   } catch(err) {
      res.status(500).json({ message: err.message });
   }
});

export default roomsRouter;