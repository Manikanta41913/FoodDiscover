import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    synced: false,
  },
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
      state.synced = true;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items.splice(action.payload, 1);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;
