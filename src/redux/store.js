import { configureStore } from "@reduxjs/toolkit";
import quantitySlice from "./reducers";

export const store = configureStore({
  reducer: {
    productQnty: quantitySlice.reducer,
  },
});
