import { TIngredient } from 'src/utils/types';
import { RootState } from '../../store';

export const selectIngredients = (state: RootState): TIngredient[] =>
  state.ingredients.items;

export const selectBuns = (state: RootState): TIngredient[] =>
  state.ingredients.items.filter((item) => item.type === 'bun');

export const selectSauces = (state: RootState): TIngredient[] =>
  state.ingredients.items.filter((item) => item.type === 'sauce');

export const selectMains = (state: RootState): TIngredient[] =>
  state.ingredients.items.filter((item) => item.type === 'main');

export const selectSelectedIngredient = (state: RootState) =>
  state.ingredients.selectedIngredient;
