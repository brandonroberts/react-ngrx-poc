import { createNgRxStore } from '../store';
import * as fromCounter from './counter';

const reducers = {
  counter: fromCounter.reducer
};

const store = createNgRxStore(reducers);

export default store;