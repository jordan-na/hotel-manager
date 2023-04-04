import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
   name: "page",
   initialState: {
      customerPage: "home",
      employeePage: "home"
   },
   reducers: {
      setCustomerPage: (state, action) => {
         state.customerPage = action.payload;
      },
      setEmployeePage: (state, action) => {
         state.employeePage = action.payload;
      }
   }
});

export const setCustomerPage = pageSlice.actions.setCustomerPage;
export const setEmployeePage = pageSlice.actions.setEmployeePage;

export default pageSlice.reducer;