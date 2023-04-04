import { createSlice } from "@reduxjs/toolkit";

const getCurrentDatePlus2Hours = () => {
   const now = new Date();
   const twoHoursLater = now.setHours(now.getHours() + 2);
   return new Date(twoHoursLater);
}

const getDateOneYearFromNow = () => {
   const now = new Date();
   const oneYearLater = now.setFullYear(now.getFullYear() + 1);
   return new Date(oneYearLater);
}

const seedLocalStorage = () => {
   localStorage.setItem("userId", "01GW8XRBRKQG48KDE3NV66AFZN");
   localStorage.setItem("accountType", "customer");
   localStorage.setItem("expirationDate", getDateOneYearFromNow().toISOString());
}

const userSlice = createSlice({
   name: "user",
   initialState: {
      userId: localStorage.getItem("userId"),
      accountType: localStorage.getItem("accountType"),
      expirationDate: localStorage.getItem("expirationDate"),
   },
   reducers: {
      setUserId: (state, action) => {
         state.userId = action.payload;
         localStorage.setItem("userId", action.payload);
      },
      setAccountType: (state, action) => {
         state.accountType = action.payload;
         localStorage.setItem("accountType", action.payload);
      },
      setExpirationDate: (state, action) => {
         state.expirationDate = action.payload;
         localStorage.setItem("expirationDate", action.payload);
      },
      logout: (state) => {
         state.userId = null;
         state.accountType = null;
         state.expirationDate = null;
         localStorage.removeItem("userId");
         localStorage.removeItem("accountType");
         localStorage.removeItem("expirationDate");
      }
   },
});

export const setUserId = userSlice.actions.setUserId;
export const setAccountType = userSlice.actions.setAccountType;
export const setExpirationDate = userSlice.actions.setExpirationDate;
export const logout = userSlice.actions.logout;

export default userSlice.reducer;
