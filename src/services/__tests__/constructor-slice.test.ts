import { TConstructorIngredient } from 'utils/types';
import constructorReducer, {
  addIngredient,
  removeIngredient,
  clearConstructor,
  setOrderRequest,
  setOrderModalData
} from '../slices/constructor/constructor-slice';

const mockIngredient = (overrides = {}): TConstructorIngredient => ({
  _id: '123',
  id: 'unique-id-1',
  name: 'Test Ingredient',
  type: 'sauce',
  proteins: 10,
  fat: 5,
  carbohydrates: 5,
  calories: 100,
  price: 50,
  image: 'image.png',
  image_mobile: 'image-mobile.png',
  image_large: 'image-large.png',
  ...overrides
});

describe('constructor slice', () => {
  it('should return the initial state', () => {
    expect(constructorReducer(undefined, { type: '' })).toEqual({
      constructorItems: { bun: null, ingredients: [] },
      orderRequest: false,
      orderModalData: null
    });
  });

  it('should handle addIngredient for bun', () => {
    const bun = mockIngredient({ type: 'bun', id: 'bun-id' });
    const state = constructorReducer(undefined, addIngredient(bun));
    expect(state.constructorItems.bun).toEqual(bun);
  });

  it('should handle addIngredient for filling', () => {
    const ingredient = mockIngredient({ id: 'filling-id' });
    const state = constructorReducer(undefined, addIngredient(ingredient));
    expect(state.constructorItems.ingredients).toEqual([ingredient]);
  });

  it('should handle removeIngredient', () => {
    const ingredient1 = mockIngredient({ id: 'id1' });
    const ingredient2 = mockIngredient({ id: 'id2' });

    const initialState = {
      constructorItems: { bun: null, ingredients: [ingredient1, ingredient2] },
      orderRequest: false,
      orderModalData: null
    };

    const state = constructorReducer(initialState, removeIngredient('id1'));
    expect(state.constructorItems.ingredients).toEqual([ingredient2]);
  });

  it('should handle clearConstructor', () => {
    const bun = mockIngredient({ type: 'bun', id: 'bun-id' });
    const ingredient = mockIngredient({ id: 'ing-id' });

    const initialState = {
      constructorItems: { bun, ingredients: [ingredient] },
      orderRequest: true,
      orderModalData: { some: 'data' }
    };

    const state = constructorReducer(initialState, clearConstructor());
    expect(state.constructorItems).toEqual({ bun: null, ingredients: [] });
  });

  it('should handle setOrderRequest', () => {
    const state = constructorReducer(undefined, setOrderRequest(true));
    expect(state.orderRequest).toBe(true);
  });

  it('should handle setOrderModalData', () => {
    const modalData = { order: 1234 };
    const state = constructorReducer(undefined, setOrderModalData(modalData));
    expect(state.orderModalData).toEqual(modalData);
  });
});
