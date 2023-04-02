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

const bookingServices = {
   createNewBooking
};

export default bookingServices;
