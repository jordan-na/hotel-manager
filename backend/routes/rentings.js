import express from "express";
import rentingServices from "../services/renting-services.js";
import { ulid } from "ulid";

const rentingsRouter = express.Router();

rentingsRouter.get("/", async (req, res) => {
   try {
      let rentings;
      if (req.query.customerId) {
         rentings = await rentingServices.getRentingsByCustomerId(req.query.customerId);
      } else if (req.query.employeeId) {
         rentings = await rentingServices.getRentingsByEmployeeId(req.query.employeeId);
      }
      res.json(rentings);
   } catch(err) {
      res.status(500).json({ message: err.message });
   }
});

rentingsRouter.post("/", async (req, res) => {
   try {
      const renting = {...req.body};
      renting.rentingId = ulid();
      await rentingServices.createRenting(renting);
      res.status(201).json({ message: "Renting created" });
   } catch(err) {
      res.status(500).json({ message: err.message });
   }
});

rentingsRouter.patch("/checkout", async (req, res) => {
   try {
      await rentingServices.checkOutRentingsByIds(req.body);
      res.status(200).json({ message: "Rentings checked out" });
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