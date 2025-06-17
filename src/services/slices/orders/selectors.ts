import { TOrder } from '@utils-types';
import { RootState } from '../../store';

export const selectUserOrders = (state: RootState) => state.orders.userOrders;

export const selectOrderIngredients = (state: RootState) =>
  state.orders.ingredients;

export const selectOrderLoading = (state: RootState) => state.orders.isLoading;

export const selectOrderError = (state: RootState) => state.orders.error;

export const selectCurrentOrder = (state: RootState): TOrder | null =>
  state.orders.currentOrder;
