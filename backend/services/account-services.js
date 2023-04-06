import db from "../db/db.js";
import { getAccountByUserIdQuery, updateAccountByUserIdQuery } from "../db/queries.js";

const getAccountByUserId = (userId) => {
   return new Promise((resolve, reject) => {
      db.query(getAccountByUserIdQuery(userId), (error, results) => {
         if (error) reject(error);
         resolve(results[0]);
      });
   });
};

const updateAccountByUserId = (userId, account) => {
   return new Promise((resolve, reject) => {
      db.query(updateAccountByUserIdQuery(userId, account), (error, results) => {
         if (error) {
            console.log(error);
            reject(error)
         };
         resolve(results);
      });
   });
};

const accountServices = {
   getAccountByUserId,
   updateAccountByUserId
};

export default accountServices;