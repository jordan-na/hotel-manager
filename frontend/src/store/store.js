import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./page/page-slice"

const store = configureStore({
   reducer: {
      page: pageReducer
   }
});

export default store;