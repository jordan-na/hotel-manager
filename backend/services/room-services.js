import db from "../db/db.js";
import {
   getRoomsQuery,
   getRoomsBySearchParamsQuery,
   getRoomByIdQuery,
   getAmenitiesByRoomIdQuery,
   getIssuesByRoomIdQuery,
   getRoomAvailabilityQuery,
   getRoomAvailabilityToUpdateQuery
} from "../db/queries.js";

const getRooms = async () => {
   return new Promise((resolve, reject) => {
      db.query(getRoomsQuery(), (error, results) => {
         if (error) reject(error);
         resolve(results);
      });
   });
};

const getRoomsBySearchParams = (query) => {
   return new Promise((resolve, reject) => {
      db.query(getRoomsBySearchParamsQuery(query), (error, results) => {
         if (error) reject(error);
         resolve(results);
      });
   });
};

const getRoomById = async (roomId) => {
   return new Promise((resolve, reject) => {
      db.query(getRoomByIdQuery(roomId), (error, results) => {
         if (error) reject(error);
         resolve(results[0]);
      });
   });
};

const getAmenitiesByRoomId = async (roomId) => {
   return new Promise((resolve, reject) => {
      db.query(getAmenitiesByRoomIdQuery(roomId), (error, results) => {
         if (error) reject(error);
         resolve(results);
      });
   });
};

const getIssuesByRoomId = async (roomId) => {
   return new Promise((resolve, reject) => {
      db.query(getIssuesByRoomIdQuery(roomId), (error, results) => {
         if (error) reject(error);
         resolve(results);
      });
   });
};

const getRoomAvailability = async (roomId, checkInDate, checkOutDate) => {
   return new Promise((resolve, reject) => {
      db.query(getRoomAvailabilityQuery(roomId, checkInDate, checkOutDate), (error, results) => {
         if (error) reject(error);
         resolve(results[0]);
      });
   });
};

const getRoomAvailabilityToUpdate = async (roomId, bookingId, checkInDate, checkOutDate) => {
   return new Promise((resolve, reject) => {
      db.query(getRoomAvailabilityToUpdateQuery(roomId, bookingId, checkInDate, checkOutDate), (error, results) => {
         if (error) reject(error);
         resolve(results[0]);
      });
   });
}

const roomServices = {
   getRooms,
   getRoomsBySearchParams,
   getRoomById,
   getAmenitiesByRoomId,
   getIssuesByRoomId,
   getRoomAvailability,
   getRoomAvailabilityToUpdate
};

export default roomServices;
