const BASE_URL = "http://localhost:4000/bookings";

const createNewBooking = async (booking) => {
   const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
   });
   if(!response.ok) throw new Error("Error creating booking");
   return response;
};

const getBookingsByCustomerId = async (customerId) => {
   const response = await fetch(`${BASE_URL}?customerId=${customerId}`);
   if(!response.ok) throw new Error("Error getting bookings");
   return response.json();
};

const deleteBookingsByIds = async (bookingIds) => {
   const response = await fetch(BASE_URL, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingIds),
   });
   if(!response.ok) throw new Error("Error deleting bookings");
   return response;
};

const getBookingById = async (bookingId) => {
   const response = await fetch(`${BASE_URL}/${bookingId}`);
   if(!response.ok) throw new Error("Error getting booking");
   return response.json();
};

const updateBookingById = async (bookingId, bookingData) => {
   const response = await fetch(`${BASE_URL}/${bookingId}`, {
      method: "PATCH",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
   });
   if(!response.ok) throw new Error("Error updating booking");
   return response;
}

const bookingServices = {
   createNewBooking,
   getBookingsByCustomerId,
   deleteBookingsByIds,
   getBookingById,
   updateBookingById
};

export default bookingServices;
