import express from "express";
import roomServices from "../services/room-services.js";

const roomsRouter = express.Router();

roomsRouter.get("/", async (req, res) => {
   try {
      console.log(req.query);
      let rooms;
      if(Object.keys(req.query).length > 0) {
         rooms = await roomServices.getRoomsBySearchParams(req.query);
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

export default roomsRouter;