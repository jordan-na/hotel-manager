const BASE_URL = "http://localhost:4000/hotels";

const getHotelIdByName = async (hotelName) => {
   const response = await fetch(`${BASE_URL}/hotel-id/${hotelName}`);
   if(!response.ok) throw new Error("Error getting hotel id");
   return response.json();
};


const getHotelNameByEmployeeId = async (employeeId) => {
   const response = await fetch(`${BASE_URL}/hotel-name/${employeeId}`);
   if(!response.ok) throw new Error("Error getting hotel name");
   return response.json();
};

const hotelServices = {
   getHotelIdByName,
   getHotelNameByEmployeeId
};

export default hotelServices;
