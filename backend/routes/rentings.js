import express from "express";
import rentingServices from "../services/renting-services.js";

const rentingsRouter = express.Router();

rentingsRouter.get("/", async (req, res) => {
   try {
      let rentings;
      if (req.query.customerId) {
         rentings = await rentingServices.getRentingsByCustomerId(req.query.customerId);
      } else {
         rentings = await rentingServices.getRentings();
      }
      res.json(rentings);
   } catch(err) {
      res.status(500).json({ message: err.message });
   }
});

rentingsRouter.get("/:rentingId", async (req, res) => {
   try {
      const renting = await rentingServices.getRentingById(req.params.rentingId);
      res.json(renting);
   } catch(err) {
      res.status(500).json({ message: err.message });
   }
});

rentingsRouter.delete("/", async (req, res) => {
   try {
      await rentingServices.deleteRentingsByIds(req.body);
      res.status(200).json({ message: "Rentings deleted" });
   } catch(err) {
      res.status(500).json({ message: err.message });
   }
});

export default rentingsRouter;