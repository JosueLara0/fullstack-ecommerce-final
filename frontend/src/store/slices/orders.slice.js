import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: null,
  orderById: {},
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getOrderById: (state, action) => {
      state.orderById = action.payload;
    },
    getAllOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const ordersActions = ordersSlice.actions;

export default ordersSlice.reducer;
