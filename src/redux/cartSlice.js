import { createSlice } from '@reduxjs/toolkit';

// Défi 1 : valeur initiale lue dans localStorage, puis totaux recalculés
const savedItems = JSON.parse(localStorage.getItem('techstore_cart')) || [];

const initialState = {
  items: savedItems,
  totalCount: savedItems.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: savedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
  discountPercent: 0, // Défi 2
};

const recalculateTotals = (state) => {
  state.totalCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // Défi 1 : sauvegarde dans localStorage
  localStorage.setItem('techstore_cart', JSON.stringify(state.items));
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        // Grâce à Immer, la mutation directe produit un snapshot immuable
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      recalculateTotals(state);
    },
    removeItem: (state, action) => {
      const existing = state.items.find((item) => item.id === action.payload);
      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== action.payload);
        }
      }
      recalculateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
      // Défi 1 : le vidage est aussi sauvegardé
      localStorage.setItem('techstore_cart', JSON.stringify(state.items));
    },
    // Défi 2 : remise de 20 % si le code est POLY2027
    applyPromoCode: (state, action) => {
      if (action.payload === 'POLY2027') {
        state.discountPercent = 20;
      }
    },
  },
});

export const { addItem, removeItem, clearCart, applyPromoCode } = cartSlice.actions;
export default cartSlice.reducer;
