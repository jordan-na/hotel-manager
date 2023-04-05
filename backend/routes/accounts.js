import express from "express";
import accountServices from "../services/account-services.js";

const accountsRouter = express.Router();

accountsRouter.get("/:userId", async (req, res) => {
   try {
      const account = await accountServices.getAccountByUserId(req.params.userId);
      res.json(account);
   } catch(err) {
      res.status(500).json({ message: err.message });
   }
});

export default accountsRouter;