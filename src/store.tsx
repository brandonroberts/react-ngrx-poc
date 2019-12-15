import { Store, ActionsSubject, ReducerObservable, ReducerManager, State, StateObservable, ScannedActionsSubject, combineReducers } from '@ngrx/store';
import { Injector } from '@angular/core';
import { take } from 'rxjs/operators';

export function createNgRxStore(reducers: any, initialState?: any) {
  const providers = [
    { provide: ActionsSubject, deps: [] },
    { provide: ScannedActionsSubject, deps: [] },
    { provide: ReducerObservable, useExisting: ReducerManager },
    { provide: StateObservable, useExisting: State },
    {
      provide: State,
      useFactory(actions: ActionsSubject, rm: ReducerManager, sas: ScannedActionsSubject) {
        return new State(actions, rm, sas, initialState);
      },
      deps: [ActionsSubject, ReducerManager, ScannedActionsSubject]
    },
    {
      provide: Store, useFactory(state: StateObservable, actions: ActionsSubject, rm: ReducerManager) {
        return new Store(state, actions, rm);
      },
      deps: [State, ActionsSubject, ReducerManager]
    },
    {
      provide: ReducerManager,
      useFactory(actions: ActionsSubject) {
        return new ReducerManager(actions, initialState, reducers, combineReducers as any);
      },
      deps: [ActionsSubject]
    }
  ];

  const injector = Injector.create({ providers });
  const ngrxStore: Store<any> = injector.get(Store);

  return {
    select: ngrxStore.select.bind(ngrxStore),
    subscribe: ngrxStore.subscribe.bind(ngrxStore),
    dispatch: ngrxStore.dispatch.bind(ngrxStore),
    getState: () => {
      let val;

      ngrxStore.pipe(take(1)).subscribe((state: any) => { val = state; });

      return val;
    }
  }
}
