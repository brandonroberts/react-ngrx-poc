import { createReducer, on, createAction, createSelector, createFeatureSelector, props } from '@ngrx/store';

export const increment = createAction('increment');
export const set = createAction('set', props<{ val: number }>());

export interface State {
  val: number;
}

export const initialState = {
  val: 0
};

export const reducer = createReducer(
  initialState,
  on(increment, state => ({
    ...state,
    val: state.val + 1
  })),
  on(set, (state, action) => ({
    ...state,
    val: action.val
  }))
);

export const selectCounterState = createFeatureSelector<State>('counter');

export const selectCounter = createSelector(
  selectCounterState,
  state => state.val
);