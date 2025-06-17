import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients/ingredients-slice';
import authReducer from './slices/auth/auth-slice';
import feedReducer from './slices/feed/feed-slice';
import ordersReducer from './slices/orders/orders-slice';
import constructorReducer from './slices/constructor/constructor-slice';

export const rootReducer = combineReducers({
  feed: feedReducer,
  ingredients: ingredientsReducer,
  auth: authReducer,
  orders: ordersReducer,
  constructor: constructorReducer
});

export default rootReducer;
