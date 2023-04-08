import { ulid } from "ulid";
import { formatArrayForSql } from "../utils/array-formatter.js";
import { getCurrentDateSqlFormat } from "../utils/date-formatter.js";

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
      const price = query.price ? `AND ${parseFloat(query.price) - 100} <= r.price AND r.price <= ${parseFloat(query.price) + 100}` : "";

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

export const getRoomAvailabilityToUpdateQuery = (roomId, bookingId, checkInDate, checkOutDate) => {
   return `SELECT
   COUNT(*) = 0 AS roomAvailable,
   DATEDIFF('${checkOutDate}', '${checkInDate}') AS numNights
   FROM Room
   LEFT JOIN Booking ON Room.roomId = Booking.roomId
   LEFT JOIN Renting ON Room.roomId = Renting.roomId
   WHERE Room.roomId = '${roomId}'
   AND (Booking.isActive = TRUE OR Renting.isActive = TRUE)
   AND NOT (Booking.bookingId = '${bookingId}')
   AND (
      (Booking.startDate <= '${checkInDate}' AND Booking.endDate >= '${checkInDate}')
      OR (Booking.startDate <= '${checkOutDate}' AND Booking.endDate >= '${checkOutDate}')
      OR (Booking.startDate >= '${checkInDate}' AND Booking.endDate <= '${checkOutDate}')
      OR (Renting.startDate <= '${checkInDate}' AND Renting.endDate >= '${checkInDate}')
      OR (Renting.startDate <= '${checkOutDate}' AND Renting.endDate >= '${checkOutDate}')
      OR (Renting.startDate >= '${checkInDate}' AND Renting.endDate <= '${checkOutDate}')
   )`;
};

export const getRoomsByEmployeeIdQuery = (employeeId) => {
   return (
      `SELECT r.*, h.* FROM
      Room r, Hotel h, Employee e
      WHERE e.employeeId = '${employeeId}'
      AND e.hotelId = r.hotelId
      AND r.hotelId = h.hotelId`
   );
}

export const insertBookingQuery = (booking) => {
   return `INSERT INTO Booking (bookingId, startDate, endDate, isActive, roomId, customerId)
      VALUES ('${booking.bookingId}', '${booking.startDate}', '${booking.endDate}', TRUE, '${booking.roomId}', '${booking.customerId}')`;
};

export const getBookingsQuery = () => {
   return (
      `SELECT h.name as hotelName, b.*, r.price as roomPrice, DATEDIFF(b.endDate, b.startDate) as numNights
      FROM Hotel h, Booking b, Room r
      WHERE b.roomId = r.roomId
      AND r.hotelId = h.hotelId`
   );
};

export const getBookingByIdQuery = (bookingId) => {
   return (
      `SELECT h.name as hotelName, h.city, h.street, h.postalCode, b.*, r.*,
      DATEDIFF(b.endDate, b.startDate) as numNights,  c.fullName as customerName, hc.name as hotelChainName
      FROM Hotel h, Booking b, Room r, Customer c, HotelChain hc
      WHERE b.bookingId = '${bookingId}'
      AND b.roomId = r.roomId
      AND r.hotelId = h.hotelId
      AND b.customerId = c.customerId
      AND h.hotelChainId = hc.hotelChainId`
   );
};

export const getBookingsByCustomerIdQuery = (customerId) => {
   return (
      `SELECT h.name as hotelName, b.*, r.price as roomPrice, DATEDIFF(b.endDate, b.startDate) as numNights
      FROM Hotel h, Booking b, Room r
      WHERE b.customerId = '${customerId}'
      AND b.roomId = r.roomId
      AND r.hotelId = h.hotelId`
   );
};

export const getBookingsByEmployeeIdQuery = (employeeId) => {
   return `SELECT h.name as hotelName, b.*, r.price as roomPrice, DATEDIFF(b.endDate, b.startDate) as numNights
      FROM Hotel h, Booking b, Room r, Employee e
      WHERE e.employeeId = '${employeeId}'
      AND e.hotelId = h.hotelId
      AND b.roomId = r.roomId
      AND r.hotelId = h.hotelId`;
}

export const deleteBookingsByIdsQuery = (bookingIds) => {
   return (
      `DELETE FROM Booking
      WHERE bookingId IN ${bookingIds}`
   );
};

export const updateBookingByIdQuery = (bookingId, startDate, endDate) => {
   return (
      `UPDATE Booking
      SET startDate = '${startDate}', endDate = '${endDate}'
      WHERE bookingId = '${bookingId}'`
   );
};

export const convertBookingsToRentingsByIdsQuery = (bookingIds) => {
   let insertBookingQuery = '';

   bookingIds.forEach((bookingId) => {
      const rentingId = ulid();
      insertBookingQuery += `INSERT INTO Renting (rentingId, startDate, endDate, isActive, roomId, customerId)
      SELECT '${rentingId}', startDate, endDate, 1, roomId, customerId
      FROM Booking
      WHERE bookingId = '${bookingId}';`;
   });

   return `
      UPDATE Booking
      SET isActive = FALSE
      WHERE bookingId IN ${formatArrayForSql(bookingIds)};
      ${insertBookingQuery}
      `;
};

export const getRentingsQuery = () => {
   return (
      `SELECT h.name as hotelName, re.*, r.price as roomPrice, DATEDIFF(re.endDate, re.startDate) as numNights
      FROM Hotel h, Renting re, Room r
      WHERE re.roomId = r.roomId
      AND r.hotelId = h.hotelId`
   );
};

export const getRentingByIdQuery = (rentingId) => {
   return (
      `SELECT h.name as hotelName, h.city, h.street, h.postalCode, re.*, r.*,
      DATEDIFF(re.endDate, re.startDate) as numNights, c.fullName as customerName, hc.name as hotelChainName
      FROM Hotel h, Renting re, Room r, Customer c, HotelChain hc
      WHERE re.rentingId = '${rentingId}'
      AND re.roomId = r.roomId
      AND r.hotelId = h.hotelId
      AND re.customerId = c.customerId
      AND h.hotelChainId = hc.hotelChainId`
   );
}

export const getRentingsByCustomerIdQuery = (customerId) => {
   return (
      `SELECT h.name as hotelName, re.*, r.price as roomPrice, DATEDIFF(re.endDate, re.startDate) as numNights
      FROM Hotel h, Renting re, Room r
      WHERE re.customerId = '${customerId}'
      AND re.roomId = r.roomId
      AND r.hotelId = h.hotelId`
   );
}

export const getRentingsbyEmployeeIdQuery = (employeeId) => {
   return (
      `SELECT h.name as hotelName, re.*, r.price as roomPrice, DATEDIFF(re.endDate, re.startDate) as numNights
      FROM Hotel h, Renting re, Room r, Employee e
      WHERE e.employeeId = '${employeeId}'
      AND e.hotelId = h.hotelId
      AND re.roomId = r.roomId
      AND r.hotelId = h.hotelId`
   );
}

export const deleteRentingsByIdsQuery = (rentingIds) => {
   return (
      `DELETE FROM Renting
      WHERE rentingId IN ${rentingIds}`
   );
};

export const checkOutRentingsByIdsQuery = (rentingIds) => {
   return (
      `UPDATE Renting
      SET isActive = FALSE
      WHERE rentingId IN ${rentingIds}`
   );
};

export const createRentingQuery = (renting) => {
   return (
      `INSERT INTO Renting (rentingId, startDate, endDate, isActive, roomId, customerId)
      VALUES ('${renting.rentingId}', '${renting.startDate}', '${renting.endDate}', 1, '${renting.roomId}', '${renting.customerId}')`
   );
}

export const getAccountByUserIdQuery = (userId, accountType) => {

   return `(SELECT
         COALESCE(Customer.fullName, Employee.fullName) AS fullName,
         COALESCE(Customer.SSN, Employee.SSN) AS SSN,
         COALESCE(Customer.age, Employee.age) AS age,
         COALESCE(Customer.street, Employee.street) AS street,
         COALESCE(Customer.city, Employee.city) AS city,
         COALESCE(Customer.postalCode, Employee.postalCode) AS postalCode,
         Customer.registrationDate,
         Account.email,
         Account.password,
         Account.accountType,
         Position.positionTitle
      FROM Account
      LEFT JOIN Customer ON Account.userId = Customer.customerId
      LEFT JOIN Employee ON Account.userId = Employee.employeeId
      LEFT JOIN Position ON Employee.employeeId = Position.employeeId
      WHERE Account.userId = '${userId}')`;
};

export const updateAccountByUserIdQuery = (userId, account) => {
   return `
      UPDATE Customer, Account
      SET
         Customer.fullName = '${account.fullName}',
         Customer.SSN = ${account.SSN},
         Customer.age = ${account.age},
         Customer.street = '${account.street}',
         Customer.city = '${account.city}',
         Customer.postalCode = '${account.postalCode}'
      WHERE
         Customer.customerId = Account.userId
         AND Account.userId = '${userId}'
         AND Account.accountType = 'Customer';

      UPDATE Employee, Account
      SET
         Employee.fullName = '${account.fullName}',
         Employee.SSN = ${account.SSN},
         Employee.age = ${account.age},
         Employee.street = '${account.street}',
         Employee.city = '${account.city}',
         Employee.postalCode = '${account.postalCode}'
      WHERE
         Employee.employeeId = Account.userId
         AND Account.userId = '${userId}'
         AND Account.accountType = 'Employee';

      UPDATE Account
      SET
         email = '${account.email}',
         password = '${account.password}'
      WHERE
         userId = '${userId}';
      `;
}

export const emailExistsQuery = (email) => {
   return `
      SELECT COUNT(email) > 0 AS emailExists, accountType
      FROM Account
      WHERE email = '${email}'
   `;
}

export const verifyPasswordQuery = (email, password) => {
   return `
      SELECT COUNT(email) > 0 AS passwordVerified
      FROM Account
      WHERE email = '${email}'
      AND BINARY password = '${password}'
   `;
};

export const getAccountInfoByEmailQuery = (email) => {
   return `
      SELECT userId, accountType
      FROM Account
      WHERE email = '${email}'
   `;
};

export const createNewAccountQuery = (account) => {

   console.log(account);

   let userInsertQuery;

   if(account.accountType === 'Customer') {
      userInsertQuery = `
         INSERT INTO Customer (customerId, ssn, fullName, age, city, postalCode, street, registrationDate)
         VALUES ('${account.userId}', ${account.ssn}, '${account.fullName}', ${account.age}, '${account.city}', '${account.postalCode}', '${account.street}', '${getCurrentDateSqlFormat()}');
      `;
   } else if(account.accountType === 'Employee') {
      userInsertQuery = `
         INSERT INTO Employee (employeeId, ssn, fullName, age, city, postalCode, street, hotelId)
         VALUES ('${account.userId}', ${account.ssn}, '${account.fullName}', ${account.age}, '${account.city}', '${account.postalCode}', '${account.street}', '${account.hotelId}');

         INSERT INTO hotelmanagerdb.Position (positionId, positionTitle, employeeId)
         VALUES ('${account.positionId}', '${account.position}', '${account.userId}');
      `;
   }

   return `
      SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS;
      SET FOREIGN_KEY_CHECKS=0;

      ${userInsertQuery}

      INSERT INTO Account (accountId, email, password, accountType, userId)
      VALUES ('${account.accountId}', '${account.email}', '${account.password}', '${account.accountType}', '${account.userId}');

      SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
   `;
};

export const deleteAccountByUserIdQuery = (userId) => {
   return `
      SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS;
      SET FOREIGN_KEY_CHECKS=0;

      DELETE FROM Account
      WHERE userId = '${userId}';

      DELETE FROM Customer
      WHERE customerId = '${userId}';

      DELETE FROM Employee
      WHERE employeeId = '${userId}';

      DELETE FROM hotelmanagerdb.Position
      WHERE employeeId = '${userId}';

      SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
   `;
}

export const getCustomerIdByEmailQuery = (email) => {
   return `
      SELECT userId as customerId
      FROM Account
      WHERE email = '${email}'
      AND accountType = 'Customer'
   `;
}

export const getHotelIdByNameQuery = (hotelName) => {
   return `
      SELECT hotelId
      FROM Hotel
      WHERE name = '${hotelName}'
   `;
}

export const getHotelNameByEmployeeIdQuery = (employeeId) => {
   return `
      SELECT Hotel.name as hotelName
      FROM Hotel, Employee
      WHERE Employee.employeeId = '${employeeId}'
      AND Employee.hotelId = Hotel.hotelId
   `;
}

export const getNumberOfRoomsPerAreaQuery = () => {
   return `
      SELECT h.city as area, COUNT(r.roomId) as availableRooms
      FROM Hotel h
      LEFT JOIN Room r ON h.hotelId = r.hotelId
      AND r.roomId NOT IN (
         SELECT Booking.roomId
         FROM Booking
         WHERE Booking.isActive = TRUE
         UNION
         SELECT Renting.roomId
         FROM Renting
         WHERE Renting.isActive = TRUE
      )
      GROUP BY h.city;
   `;
}

export const getAllHotelNamesQuery = () => {
   return `
      SELECT hotelId, name
      FROM Hotel
   `;
};

export const getCapacityOfRoomsByHotelIdQuery = (hotelId) => {
   return `
      SELECT r.roomId, r.capacity
      FROM Room r
      WHERE r.hotelId = '${hotelId}'
   `;
}