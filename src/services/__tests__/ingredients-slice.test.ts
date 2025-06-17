// src/services/__tests__/ingredients-slice.test.ts
import ingredientsReducer, {
  fetchIngredients
} from '../slices/ingredients/ingredients-slice';
import { TIngredient } from '@utils-types';
import { AnyAction } from 'redux';

const mockIngredient: TIngredient = {
  _id: '123',
  name: 'Test Ingredient',
  type: 'sauce',
  proteins: 10,
  fat: 5,
  carbohydrates: 5,
  calories: 100,
  price: 50,
  image: 'image.png',
  image_mobile: 'image-mobile.png',
  image_large: 'image-large.png'
};

describe('ingredients slice', () => {
  it('should return initial state', () => {
    expect(ingredientsReducer(undefined, {} as AnyAction)).toEqual({
      items: [],
      loading: false,
      error: null,
      isLoading: undefined,
      selectedIngredient: null
    });
  });

  it('should handle fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(undefined, action);
    expect(state).toEqual({
      items: [],
      loading: true,
      error: null,
      isLoading: undefined,
      selectedIngredient: null
    });
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: [mockIngredient]
    };
    const state = ingredientsReducer(undefined, action);
    expect(state).toEqual({
      items: [mockIngredient],
      loading: false,
      error: null,
      isLoading: undefined,
      selectedIngredient: null
    });
  });

  it('should handle fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      payload: 'Ошибка загрузки'
    };
    const state = ingredientsReducer(undefined, action);
    expect(state).toEqual({
      items: [],
      loading: false,
      error: 'Ошибка загрузки',
      isLoading: undefined,
      selectedIngredient: null
    });
  });
});
