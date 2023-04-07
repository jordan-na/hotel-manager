import db from "../db/db.js";
import { getHotelIdByNameQuery, getHotelNameByEmployeeIdQuery } from "../db/queries.js";

const getHotelIdByName = (hotelName) => {
   return new Promise((resolve, reject) => {
      db.query(getHotelIdByNameQuery(hotelName), (error, results) => {
         if (error) reject(error);
         resolve(results[0]);
      });
   });
};

const getHotelNameByEmployeeId = (employeeId) => {
   return new Promise((resolve, reject) => {
      db.query(getHotelNameByEmployeeIdQuery(employeeId), (error, results) => {
         if (error) reject(error);
         resolve(results[0]);
      });
   });
};

const hotelServices = {
   getHotelIdByName,
   getHotelNameByEmployeeId,
};

export default hotelServices;