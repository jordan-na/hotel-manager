const BASE_URL = "http://localhost:4000/rentings";

const getRentingsByCustomerId = async (customerId) => {
   const response = await fetch(`${BASE_URL}?customerId=${customerId}`);
   if (!response.ok) throw new Error("Error getting rentings");
   return response.json();
}

const deleteRentingsByIds = async (rentingIds) => {
   const response = await fetch(BASE_URL, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(rentingIds),
   });
   if (!response.ok) throw new Error("Error deleting rentings");
   return response;
};


const getRentingById = async (rentingId) => {
   const response = await fetch(`${BASE_URL}/${rentingId}`);
   if (!response.ok) throw new Error("Error getting renting");
   return response.json();
}

const rentingServices = {
   getRentingsByCustomerId,
   deleteRentingsByIds,
   getRentingById
};

export default rentingServices;
