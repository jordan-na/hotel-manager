import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./page/page-slice"
import userReducer from "./page/user-slice";

const store = configureStore({
   reducer: {
      page: pageReducer,
      user: userReducer
   }
});

export default store;