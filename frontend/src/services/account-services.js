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
};

export const getAccountNameInitialsByUserId = async (userId) => {
   const account = await getAccountByUserId(userId);
   const name = account.fullName.split(" ");
   const firstNameInitial = name[0].charAt(0);
   const lastNameInitial = name[1].charAt(0);
   return `${firstNameInitial}${lastNameInitial}`;
};

export const emailExists = async (email) => {
   const response = await fetch(`${BASE_URL}/email-exists/${email}`);
   if(!response.ok) throw new Error("Error checking email");
   return response.json();
}

export const verifyPassword = async (email, password) => {
   const response = await fetch(`${BASE_URL}/verify-password?email=${email}&password=${password}`);
   if(!response.ok) throw new Error("Error verifying password");
   return response.json();
}

export const getAccountInfoByEmail = async (email) => {
   const response = await fetch(`${BASE_URL}/account-info/${email}`);
   if(!response.ok) throw new Error("Error getting account info");
   return response.json();
}

export const createNewAccount = async(account) => {
   const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({account})
   });
   return response;
};

export const deleteAccountByUserId = async (userId) => {
   const response = await fetch(`${BASE_URL}/${userId}`, {
      method: "DELETE"
   });
   if (!response.ok) throw new Error("Error deleting account");
   return response.json();
};

const accountServices = {
   getAccountByUserId,
   updateAccountByUserId,
   getAccountNameInitialsByUserId,
   emailExists,
   verifyPassword,
   getAccountInfoByEmail,
   createNewAccount,
   deleteAccountByUserId
};

export default accountServices;
