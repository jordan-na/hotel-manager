import db from "../db/db.js";
import {
   getAccountByUserIdQuery,
   updateAccountByUserIdQuery,
   emailExistsQuery,
   verifyPasswordQuery,
   getAccountInfoByEmailQuery,
   createNewAccountQuery,
   deleteAccountByUserIdQuery,
   getCustomerIdByEmailQuery,
} from "../db/queries.js";

const getAccountByUserId = (userId, accountType) => {
   return new Promise((resolve, reject) => {
      db.query(getAccountByUserIdQuery(userId, accountType), (error, results) => {
         if (error) reject(error);
         resolve(results[0]);
      });
   });
};

const updateAccountByUserId = (userId, account) => {
   return new Promise((resolve, reject) => {
      db.query(updateAccountByUserIdQuery(userId, account), (error, results) => {
         if (error) {
            reject(error);
         }
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
};

const getAccountInfoByEmail = (email) => {
   return new Promise((resolve, reject) => {
      db.query(getAccountInfoByEmailQuery(email), (error, results) => {
         if (error) {
            reject(error);
         }
         resolve(results[0]);
      });
   });
};

const createNewAccount = async (account) => {
   return new Promise((resolve, reject) => {
      db.query(createNewAccountQuery(account), (error, results) => {
         if (error) {
            reject(error);
         }
         resolve(results);
      });
   });
};

const deleteAccountByUserId = (userId) => {
   return new Promise((resolve, reject) => {
      db.query(deleteAccountByUserIdQuery(userId), (error, results) => {
         if (error) {
            reject(error);
         }
         resolve(results);
      });
   });
};

const getCustomerIdByEmail = (email) => {
   return new Promise((resolve, reject) => {
      db.query(getCustomerIdByEmailQuery(email), (error, results) => {
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
   verifyPassword,
   getAccountInfoByEmail,
   createNewAccount,
   deleteAccountByUserId,
   getCustomerIdByEmail
};

export default accountServices;
