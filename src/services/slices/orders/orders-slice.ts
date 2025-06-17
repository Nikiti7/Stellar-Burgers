import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';

type OrdersState = {
  userOrders: TOrder[] | null;
  currentOrder: TOrder | null;
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

const initialState: OrdersState = {
  userOrders: [],
  ingredients: [],
  isLoading: false,
  error: null,
  currentOrder: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setUserOrders: (state, action: PayloadAction<TOrder[]>) => {
      state.userOrders = action.payload;
    },
    setOrderIngredients: (state, action: PayloadAction<TIngredient[]>) => {
      state.ingredients = action.payload;
    },
    setOrderLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setOrderError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCurrentOrder(state, action: PayloadAction<TOrder>) {
      state.currentOrder = action.payload;
    },
    clearCurrentOrder(state) {
      state.currentOrder = null;
    },
    clearOrder: (state) => {
      state.userOrders = null;
      state.ingredients = [];
      state.isLoading = false;
      state.error = null;
    }
  }
});

export const {
  setUserOrders,
  setOrderIngredients,
  setOrderLoading,
  setOrderError,
  setCurrentOrder,
  clearCurrentOrder,
  clearOrder
} = ordersSlice.actions;

export default ordersSlice.reducer;
