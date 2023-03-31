import db from "../db/db.js";
import { getEmployeesByRoomIdQuery } from "../db/queries.js";

const getEmployeesByRoomId = (roomId) => {
   return new Promise((resolve, reject) => {
      db.query(getEmployeesByRoomIdQuery(roomId), (error, results) => {
         if (error) reject(error);
         resolve(results);
      });
   });
};

const employeeServices = {
   getEmployeesByRoomId
};

export default employeeServices;