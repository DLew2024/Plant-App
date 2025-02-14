import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Item {
  name: string;
  image?: string;
  description?: string;
  cost: string;
  quantity?: number;
}

export interface CartState {
  items: Item[];
}

const initialState: CartState = {
  items: [],
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<Item, 'quantity'>>) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + 1;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items.filter((item) => item.name !== action.payload);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ name: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (item) => item.name === action.payload.name
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
