const BASE_URL = 'http://localhost:4000/employees';

const getEmployeesByRoomId = async (roomId) => {
   const response = await fetch(`${BASE_URL}/${roomId}`);
   if(!response.ok) throw new Error("Error retrieving employees");
   const data = await response.json();
   return data;
}

const employeeServices = {
   getEmployeesByRoomId
};

export default employeeServices;