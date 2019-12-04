import { combineReducers, createStore, Action } from 'redux';

function counter(state = 1, action: Action) {
    switch(action.type) {
        case 'increment':
            return state + 1;
        default:
            return state;
    }
}

const reducers = combineReducers({
    counter
});

const store = createStore(reducers);

export default store;