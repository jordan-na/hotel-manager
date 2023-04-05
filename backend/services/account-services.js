import db from "../db/db.js";
import { getAccountByUserIdQuery } from "../db/queries.js";

const getAccountByUserId = (userId) => {
   return new Promise((resolve, reject) => {
      db.query(getAccountByUserIdQuery(userId), (error, results) => {
         if (error) reject(error);
         resolve(results[0]);
      });
   });
};

const accountServices = {
   getAccountByUserId
};

export default accountServices;