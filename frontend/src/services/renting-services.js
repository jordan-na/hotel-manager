const BASE_URL = "http://localhost:4000/rentings";

const getRentingsByCustomerId = async (customerId) => {
   const response = await fetch(`${BASE_URL}?customerId=${customerId}`);
   if (!response.ok) throw new Error("Error getting rentings");
   return response.json();
};

const getRentingsByEmployeeId = async (employeeId) => {
   const response = await fetch(`${BASE_URL}?employeeId=${employeeId}`);
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
};

const checkOutRentingsByIds = async (rentingIds) => {
   const response = await fetch(`${BASE_URL}/checkout`, {
      method: "PATCH",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(rentingIds),
   });
   if (!response.ok) throw new Error("Error checking out rentings");
   return response;
};

const createRenting = async (renting) => {
   const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(renting),
   });
   if (!response.ok) throw new Error("Error creating renting");
   return response.json();
}

const rentingServices = {
   getRentingsByCustomerId,
   getRentingsByEmployeeId,
   deleteRentingsByIds,
   getRentingById,
   checkOutRentingsByIds,
   createRenting,
};

export default rentingServices;
