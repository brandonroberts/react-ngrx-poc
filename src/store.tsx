// import 'core-js/es6/reflect';
import { combineReducers, createStore, Action } from 'redux';
import { Store, ActionsSubject, ReducerObservable, ReducerManager, State, StateObservable, ScannedActionsSubject } from '@ngrx/store';
import { ReflectiveInjector } from '@angular/core';
import { take } from 'rxjs/operators';

function counter(state = 1, action: Action) {
    switch(action.type) {
        case 'increment':
            return state + 1;
        default:
            return state;
    }
}

const reducerMap = {
    counter
}

const reducers = combineReducers(reducerMap);

function createNgRxStore(reducers: any) {
    const providers = [
        ActionsSubject,
        ScannedActionsSubject,
        { provide: ReducerObservable, useExisting: ReducerManager },
        {
            provide: State,
            useFactory(actions: ActionsSubject, rm: ReducerManager, sas: ScannedActionsSubject) {
                return new State(actions, rm, sas, undefined);
            },
            deps: [ActionsSubject, ReducerManager, ScannedActionsSubject]
        },
        { provide: StateObservable, useExisting: State },
        {
            provide: Store, useFactory(state: StateObservable, actions: ActionsSubject, rm: ReducerManager) {
                return new Store(state, actions, rm);
            },
            deps: [State, ActionsSubject, ReducerManager]
        },
        {
            provide: ReducerManager,
            useFactory(actions: ActionsSubject) {
                return new ReducerManager(actions, undefined, reducerMap, combineReducers);
            },
            deps: [ActionsSubject]
        }
    ];

    const injector = ReflectiveInjector.resolveAndCreate(providers)
    const ngrxStore: Store<any> = injector.get(Store);

    return {
        subscribe: () => {
            return ngrxStore.subscribe();
        },
        dispatch: (action: Action) => {
            return ngrxStore.dispatch(action);
        },
        getState: () => {
            let val;

            ngrxStore.pipe(take(1)).subscribe((state: any) => { val = state; });

            return val;
        }
    }
}

// const store = createStore(reducers);
const store: any = createNgRxStore(reducerMap);

export default store;