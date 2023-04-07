import db from "../db/db.js";
import { getHotelIdByNameQuery } from "../db/queries.js";

const getHotelIdByName = (hotelName) => {
   return new Promise((resolve, reject) => {
      db.query(getHotelIdByNameQuery(hotelName), (error, results) => {
         if (error) reject(error);
         resolve(results[0]);
      });
   });
}

const hotelServices = {
   getHotelIdByName
};

export default hotelServices;