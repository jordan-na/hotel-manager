import db from "../db/db.js";
import { getHotelIdByNameQuery, getHotelNameByEmployeeIdQuery, getAllHotelNamesQuery } from "../db/queries.js";

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

const getAllHotelNames = () => {
   return new Promise((resolve, reject) => {
      db.query(getAllHotelNamesQuery(), (error, results) => {
         if (error) reject(error);
         resolve(results);
      });
   });
};

const hotelServices = {
   getHotelIdByName,
   getHotelNameByEmployeeId,
   getAllHotelNames
};

export default hotelServices;