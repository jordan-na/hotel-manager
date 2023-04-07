import express from "express";
import accountServices from "../services/account-services.js";
import { ulid } from "ulid";

const accountsRouter = express.Router();

const validateEmail = (email) => {
   const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
   return regex.test(email);
};

accountsRouter.post("/", async (req, res) => {
   try {
      const account = req.body.account;
      account.accountId = ulid();
      account.userId = ulid();
      account.positionId = ulid();
      const newAccount = await accountServices.createNewAccount(account);
      res.status(200).json({ userId: account.userId});
   } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: err.message });
   }
});

accountsRouter.get("/email-exists/:email", async (req, res) => {
   try {
      if (!validateEmail(req.params.email)) {
         return res.json({ emailExists: false });
      }
      const emailExists = await accountServices.emailExists(req.params.email);
      res.json(emailExists);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
});

accountsRouter.get("/customer-id/:email", async (req, res) => {
   try {
      const customerId = await accountServices.getCustomerIdByEmail(req.params.email);
      res.json({customerId});
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
});

accountsRouter.get("/verify-password", async (req, res) => {
   try {
      const email = req.query.email;
      const password = req.query.password;
      const passwordVerified = await accountServices.verifyPassword(email, password);
      res.json(passwordVerified);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
});

accountsRouter.get("/account-info/:email", async (req, res) => {
   try {
      const accountInfo = await accountServices.getAccountInfoByEmail(req.params.email);
      res.json(accountInfo);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
});

accountsRouter.get("/:userId", async (req, res) => {
   try {
      const account = await accountServices.getAccountByUserId(req.params.userId, req.query.accountType);
      res.json(account);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
});

accountsRouter.delete("/:userId", async (req, res) => {
   try {
      const userId = req.params.userId;
      await accountServices.deleteAccountByUserId(userId);
      res.status(200).json({message: "Account deleted successfully"});
   } catch (err) {
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

export default accountsRouter;