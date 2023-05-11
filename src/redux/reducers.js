import { createSlice } from "@reduxjs/toolkit";

const quantitySlice = createSlice({
  name: "quantity",
  initialState: {
    quantities: [],
  },
  reducers: {
    getQuantity: (state, action) => {
      state.quantities.push(action.payload);
    },
  },
});

export const { getQuantity } = quantitySlice.actions;
export default quantitySlice
