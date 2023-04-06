import db from "../db/db.js";
import { getAccountByUserIdQuery, updateAccountByUserIdQuery, emailExistsQuery, verifyPasswordQuery } from "../db/queries.js";

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
            reject(error)
         };
         resolve(results);
      });
   });
};

const emailExists = (email) => {
   return new Promise((resolve, reject) => {
      db.query(emailExistsQuery(email), (error, results) => {
         if (error) {
            reject(error);
         }
         resolve(results[0]);
      });
   });
};

const verifyPassword = (email, password) => {
   return new Promise((resolve, reject) => {
      db.query(verifyPasswordQuery(email, password), (error, results) => {
         if (error) {
            reject(error);
         }
         resolve(results[0]);
      });
   });
}

const accountServices = {
   getAccountByUserId,
   updateAccountByUserId,
   emailExists,
   verifyPassword
};

export default accountServices;