import db from "../db/db.js";
import {
   insertBookingQuery,
   getBookingsQuery,
   getBookingsByCustomerIdQuery,
   deleteBookingsByIdsQuery,
   getBookingByIdQuery,
   updateBookingByIdQuery,
   getBookingsByEmployeeIdQuery,
   convertBookingsToRentingsByIdsQuery,
} from "../db/queries.js";
import { formatArrayForSql } from "../utils/array-formatter.js";

const createNewBooking = async (booking) => {
   return new Promise((resolve, reject) => {
      db.query(insertBookingQuery(booking), (error, results) => {
         if (error) reject(error);
         resolve();
      });
   });
};

const getBookings = async () => {
   return new Promise((resolve, reject) => {
      db.query(getBookingsQuery(), (error, results) => {
         if (error) reject(error);
         resolve(results);
      });
   });
};

const getBookingById = async (bookingId) => {
   return new Promise((resolve, reject) => {
      db.query(getBookingByIdQuery(bookingId), (error, results) => {
         if (error) reject(error);
         resolve(results[0]);
      });
   });
};

const getBookingsByCustomerId = async (customerId) => {
   return new Promise((resolve, reject) => {
      db.query(getBookingsByCustomerIdQuery(customerId), (error, results) => {
         if (error) reject(error);
         resolve(results);
      });
   });
};

export const getBookingsByEmployeeId = async (employeeId) => {
   return new Promise((resolve, reject) => {
      db.query(getBookingsByEmployeeIdQuery(employeeId), (error, results) => {
         if (error) reject(error);
         resolve(results);
      });
   });
};

const deleteBookingsByIds = async (bookingIds) => {
   return new Promise((resolve, reject) => {
      db.query(deleteBookingsByIdsQuery(formatArrayForSql(bookingIds)), (error, results) => {
         if (error) reject(error);
         resolve(results);
      });
   });
};

const updateBookingById = async (bookingId, startDate, endDate) => {
   return new Promise((resolve, reject) => {
      db.query(updateBookingByIdQuery(bookingId, startDate, endDate), (error, results) => {
         if (error) reject(error);
         resolve(results);
      });
   });
};

const convertBookingsToRentingsByIds = async (bookingIds) => {
   return new Promise((resolve, reject) => {
      db.query(convertBookingsToRentingsByIdsQuery(bookingIds), (error, results) => {
         if (error) reject(error);
         resolve(results);
      });
   });
};

const bookingServices = {
   createNewBooking,
   getBookings,
   getBookingById,
   getBookingsByCustomerId,
   getBookingsByEmployeeId,
   deleteBookingsByIds,
   updateBookingById,
   convertBookingsToRentingsByIds
};

export default bookingServices;
