import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
  selectedProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCart: (state, action) => {
      state.total = action.payload.totalPrice;
      state.selectedProducts = action.payload.products;
    },
    updateProductInCart: (state, action) => {
      const productInCartIndex = state.selectedProducts.findIndex(
        (product) => product.productId === action.payload.productId
      );

      state.selectedProducts[productInCartIndex].quantity =
        +action.payload.updateQty;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
