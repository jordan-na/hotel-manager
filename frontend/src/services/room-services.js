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
}

const roomServices = {
   getRooms,
   getRoomsBySearchParams,
   getRoomById
};

export default roomServices;