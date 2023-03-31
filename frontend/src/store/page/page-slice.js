import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
   name: "page",
   initialState: {
      page: "home"
   },
   reducers: {
      setPage: (state, action) => {
         state.page = action.payload;
      }
   }
});

export const setPage = pageSlice.actions.setPage;

export default pageSlice.reducer;