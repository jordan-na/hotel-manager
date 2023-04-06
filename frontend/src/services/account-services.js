const BASE_URL = "http://localhost:4000/accounts";

const getAccountByUserId = async (userId) => {
   const response = await fetch(`${BASE_URL}/${userId}`);
   if(!response.ok) throw new Error("Error getting account");
   return response.json();
};

const updateAccountByUserId = async (userId, account) => {
   const response = await fetch(`${BASE_URL}/${userId}`, {
      method: "PATCH",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(account)
   });
   return response;
}

const accountServices = {
   getAccountByUserId,
   updateAccountByUserId
};

export default accountServices;
