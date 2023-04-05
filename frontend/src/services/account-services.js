const BASE_URL = "http://localhost:4000/accounts";

const getAccountById = async (accountId) => {
   const response = await fetch(`${BASE_URL}/${accountId}`);
   if(!response.ok) throw new Error("Error getting account");
   return response.json();
};

const accountServices = {
   getAccountById
};

export default accountServices;
