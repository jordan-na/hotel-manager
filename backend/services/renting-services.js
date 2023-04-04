import db from "../db/db.js";
import { formatArrayForSql } from "../utils/array-formatter.js";
import { getRentingsQuery, getRentingsByCustomerIdQuery, deleteRentingsByIdsQuery, getRentingByIdQuery } from "../db/queries.js";

const getRentings = async () => {
   return new Promise((resolve, reject) => {
      db.query(getRentingsQuery(), (error, results) => {
         if (error) reject(error);
         resolve(results);
      });
   });
}

const getRentingById = async (rentingId) => {
   return new Promise((resolve, reject) => {
      db.query(getRentingByIdQuery(rentingId), (error, results) => {
         if (error) reject(error);
         resolve(results[0]);
      });
   });
}

const getRentingsByCustomerId = async (customerId) => {
   return new Promise((resolve, reject) => {
      db.query(getRentingsByCustomerIdQuery(customerId), (error, results) => {
         if (error) reject(error);
         resolve(results);
      });
   });
}

const deleteRentingsByIds = async (rentingIds) => {
   return new Promise((resolve, reject) => {
      db.query(deleteRentingsByIdsQuery(formatArrayForSql(rentingIds)), (error, results) => {
         if (error) reject(error);
         resolve(results);
      });
   });
}

const rentingServices = {
   getRentings,
   getRentingById,
   getRentingsByCustomerId,
   deleteRentingsByIds
};


export default rentingServices;