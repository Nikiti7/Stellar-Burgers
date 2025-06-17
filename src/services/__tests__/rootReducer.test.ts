import { combineReducers } from '@reduxjs/toolkit';
import constructorReducer from '../slices/constructor/constructor-slice';
import rootReducer from '../root-reducer';

describe('rootReducer', () => {
  it('should combine reducers correctly', () => {
    const expectedReducer = combineReducers({
      constructor: constructorReducer
    });

    expect(rootReducer(undefined, { type: '@@INIT' })).toEqual(
      expectedReducer(undefined, { type: '@@INIT' })
    );
  });
});
