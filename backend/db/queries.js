export const getRoomsQuery= () => {
   return (
      `SELECT * FROM
      Room, Hotel
      WHERE Room.hotelId = Hotel.hotelId`
   );
};

export const getRoomsBySearchParamsQuery = (query) => {
      const sizes = {
         single: 1,
         double: 2,
         triple: 3,
         quad: 4,
         quin: 5
      };
      const cityQuery = query.city ? `AND UPPER(h.city) LIKE '%${query.city.toUpperCase()}%'` : "";
      let dateQuery = "";
      if(query["check-in"] && query["check-out"]) {
         dateQuery = `AND r.roomId NOT IN (
            SELECT Booking.roomId
            FROM Booking
            WHERE Booking.endDate >= '${query["check-in"]}' AND Booking.startDate <= '${query["check-out"]}' AND Booking.isActive = TRUE
            UNION
            SELECT Renting.roomId
            FROM Renting
            WHERE Renting.endDate >= '${query["check-in"]}' AND Renting.startDate <= '${query["check-out"]}' AND Renting.isActive = TRUE
         )`;
      } else if (query["check-in"]) {
         dateQuery = `AND r.roomId NOT IN (
               SELECT Booking.roomId
               FROM Booking
               WHERE Booking.endDate >= '${query["check-in"]}' AND Booking.startDate <= '${query["check-in"]}' AND Booking.isActive = TRUE
               UNION
               SELECT Renting.roomId
               FROM Renting
               WHERE Renting.endDate >= '${query["check-in"]}' AND Renting.startDate <= '${query["check-in"]}' AND Renting.isActive = TRUE
            )`;
      } else if (query["check-out"]) {
         dateQuery = `AND r.roomId NOT IN (
            SELECT Booking.roomId
            FROM Booking
            WHERE Booking.endDate >= '${query["check-out"]}' AND Booking.startDate <= '${query["check-out"]}' AND Booking.isActive = TRUE
            UNION
            SELECT Renting.roomId
            FROM Renting
            WHERE Renting.endDate >= '${query["check-out"]}' AND Renting.startDate <= '${query["check-out"]}' AND Renting.isActive = TRUE
         )`;
      }
      const capacityQuery = query.capacity ? `AND r.capacity = ${sizes[query.capacity.toLowerCase()]}` : "";
      const hotelChainQuery = query["hotel-chain"] ? `AND UPPER(hc.name) LIKE '%${query["hotel-chain"].toUpperCase()}%'` : "";
      const categoryQuery = query.category ? `AND h.category = '${query.category.charAt(0)}'` : "";
      const numberOfRoomsQuery = query["number-of-rooms"] ? `AND h.numberOfRooms = ${query["number-of-rooms"]}` : "";
      const price = query.price ? `AND r.price <= ${query.price}` : "";

      return (
         `SELECT r.*, h.* FROM
         Room r, Hotel h, HotelChain hc
         WHERE r.hotelId = h.hotelId
         AND h.hotelChainId = hc.hotelChainId
         ${cityQuery}
         ${dateQuery}
         ${capacityQuery}
         ${hotelChainQuery}
         ${categoryQuery}
         ${numberOfRoomsQuery}
         ${price}
         `
   );
};

export const getRoomByIdQuery = (roomId) => {
   return (
      `SELECT r.roomId, r.capacity as roomCapacity, r.price as roomPrice, r.view as roomView, r.extendable as roomIsExtendable,
      h.name AS hotelName, h.city as hotelCity, h.postalCode as hotelPostalCode, h.street as hotelStreet,
      h.email as hotelEmail, h.phoneNumber as hotelPhone, h.category as hotelCategory,
      h.numberOfRooms as hotelNumberOfRooms, h.image as hotelImage, hc.name as hotelChainName,
      hc.city as hotelChainCity, hc.postalCode as hotelChainPostalCode, hc.street as hotelChainStreet,
      hc.email as hotelChainEmail, hc.phoneNumber as hotelChainPhone, hc.numberOfHotels as hotelChainNumberOfHotels,
      e.fullName as hotelManagerName
      FROM
      Room r, Hotel h, HotelChain hc, Employee e
      WHERE r.roomId = '${roomId}'
      AND r.hotelId = h.hotelId
      AND h.hotelChainId = hc.hotelChainId
      AND e.employeeId = h.managerId`
   );
};

export const getEmployeesByRoomIdQuery = (roomId) => {
   return (
      `SELECT e.*, p.* FROM
      Employee e, Position p, Room r
      WHERE r.roomId = '${roomId}'
      AND r.hotelId = e.hotelId
      AND e.employeeId = p.employeeId`
   );
}

export const getAmenitiesByRoomIdQuery = (roomId) => {
   return (
      `SELECT * FROM
      Amenity
      WHERE roomId = '${roomId}'`
   );
};

export const getIssuesByRoomIdQuery = (roomId) => {
   return (
      `SELECT * FROM
      Issue
      WHERE roomId = '${roomId}'`
   );
};

export const getRoomAvailabilityQuery = (roomId, checkInDate, checkOutDate) => {
   return `SELECT
      COUNT(*) = 0 AS roomAvailable,
      DATEDIFF('${checkOutDate}', '${checkInDate}') AS numNights
      FROM Room
      LEFT JOIN Booking ON Room.roomId = Booking.roomId
      LEFT JOIN Renting ON Room.roomId = Renting.roomId
      WHERE Room.roomId = '${roomId}'
      AND (Booking.isActive = TRUE OR Renting.isActive = TRUE)
      AND (
         (Booking.startDate <= '${checkInDate}' AND Booking.endDate >= '${checkInDate}')
         OR (Booking.startDate <= '${checkOutDate}' AND Booking.endDate >= '${checkOutDate}')
         OR (Booking.startDate >= '${checkInDate}' AND Booking.endDate <= '${checkOutDate}')
         OR (Renting.startDate <= '${checkInDate}' AND Renting.endDate >= '${checkInDate}')
         OR (Renting.startDate <= '${checkOutDate}' AND Renting.endDate >= '${checkOutDate}')
         OR (Renting.startDate >= '${checkInDate}' AND Renting.endDate <= '${checkOutDate}')
      )`;
};

export const insertBookingQuery = (booking) => {
   return `INSERT INTO Booking (bookingId, startDate, endDate, isActive, roomId, customerId)
      VALUES ('${booking.bookingId}', '${booking.startDate}', '${booking.endDate}', TRUE, '${booking.roomId}', '${booking.customerId}')`;
};