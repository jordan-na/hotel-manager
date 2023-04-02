import db from "../db/db.js";
import { insertBookingQuery } from "../db/queries.js";


const createNewBooking = async (booking) => {
   return new Promise((resolve, reject) => {
      db.query(insertBookingQuery(booking), (error, results) => {
         if (error) reject(error);
         resolve();
      });
   });
};

const bookingServices = {
   createNewBooking
};

export default bookingServices;