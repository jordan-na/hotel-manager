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

accountsRouter.patch("/:userId", async (req, res) => {
   try {
      for (const key in req.body) {
         if (req.body[key].trim().length === 0) {
            throw new Error("No Empty Strings Allowed");
         }
      }
      await accountServices.updateAccountByUserId(req.params.userId, req.body);
      res.status(200).json({ message: "Account updated successfully" });
   } catch(err) {
      res.status(500).json({ message: err.message });
   }
});

accountsRouter.get("/email-exists/:email", async (req, res) => {
   try {
      const emailExists = await accountServices.emailExists(req.params.email);
      res.json(emailExists);
   } catch(err) {
      res.status(500).json({ message: err.message });
   }
});

accountsRouter.get("/verify-password", async (req, res) => {
   try {
      const email = req.query.email;
      const password = req.query.password;
      const passwordExists = await accountServices.verifyPassword(email, password);
      res.json(passwordExists);
   } catch(err) {
      res.status(500).json({ message: err.message });
   }
});

export default accountsRouter;