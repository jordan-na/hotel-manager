import express from 'express';
import hotelServices from '../services/hotel-services.js';

const hotelsRouter = express.Router();

hotelsRouter.get("/hotel-id/:hotelName", async (req, res) => {
   try {
      const hotelName = req.params.hotelName;
      const hotelId = await hotelServices.getHotelIdByName(hotelName);
      res.status(200).json({hotelId});
   } catch (error) {
      res.status(500).json({error: error.message});
   }
});

hotelsRouter.get("/hotel-name/:employeeId", async (req, res) => {
   try {
      const employeeId = req.params.employeeId;
      const hotelName = await hotelServices.getHotelNameByEmployeeId(employeeId);
      res.status(200).json({hotelName});
   } catch (error) {
      res.status(500).json({error: error.message});
   }
});

hotelsRouter.get("/all-hotel-names", async (req, res) => {
   try {
      const hotelNames = await hotelServices.getAllHotelNames();
      res.status(200).json(hotelNames);
   } catch (error) {
      res.status(500).json({error: error.message});
   }
});

export default hotelsRouter;