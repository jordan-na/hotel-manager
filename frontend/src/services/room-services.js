const BASE_URL = 'http://localhost:4000/rooms';

const getRooms = async () => {
   const response = await fetch(BASE_URL);
   if(!response.ok) throw new Error("Error retrieving rooms");
   const data = await response.json();
   return data;
};

const getRoomsBySearchParams = async (queries) => {
   const response = await fetch(`${BASE_URL}?${queries}`);
   if(!response.ok) throw new Error("Error retrieving rooms");
   const data = await response.json();
   return data;
}

const getRoomById = async (roomId) => {
   const response = await fetch(`${BASE_URL}/${roomId}`);
   if(!response.ok) throw new Error("Error retrieving room");
   const data = await response.json();
   return data;
};

const getRoomAvailability = async (roomId, checkIn, checkOut) => {
   const response = await fetch(`${BASE_URL}/${roomId}/availability?check-in=${checkIn}&check-out=${checkOut}`);
   if(!response.ok) throw new Error("Error retrieving room availability");
   const data = await response.json();
   return data;
};

const getRoomAvailabilityToUpdate = async (roomId, bookingId, checkIn, checkOut) => {
   const response = await fetch(`${BASE_URL}/${roomId}/availability?bookingId=${bookingId}&check-in=${checkIn}&check-out=${checkOut}`);
   if (!response.ok) throw new Error("Error retrieving room availability");
   const data = await response.json();
   return data;
}

const roomServices = {
   getRooms,
   getRoomsBySearchParams,
   getRoomById,
   getRoomAvailability,
   getRoomAvailabilityToUpdate
};

export default roomServices;