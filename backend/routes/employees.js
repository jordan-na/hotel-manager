import express from "express";
import employeeServices from "../services/employee-services.js";

const employeesRouter = express.Router();

employeesRouter.get("/:roomId", async (req, res) => {
   try {
      const employees = await employeeServices.getEmployeesByRoomId(req.params.roomId);
      res.json(employees);
   } catch(err) {
      res.status(500).json({ message: err.message });
   }
});

export default employeesRouter;