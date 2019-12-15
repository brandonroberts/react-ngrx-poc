import { createReducer, on, createAction, createSelector, createFeatureSelector } from '@ngrx/store';

export const increment = createAction('increment');

export interface State {
  val: number;
}

export const initialState = {
  val: 1
};

export const reducer = createReducer(
  initialState,
  on(increment, state => ({
    ...state,
    val: state.val + 1
  }))
);

export const selectCounterState = createFeatureSelector<State>('counter');

export const selectCounter = createSelector(
  selectCounterState,
  state => state.val
);