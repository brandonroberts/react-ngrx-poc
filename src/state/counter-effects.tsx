import { useEffect } from 'react';
import { mergeMap, map } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';
import { useActions } from '../store';
import { increment, set } from './counter';
import store from '.';
import { merge } from 'rxjs';

export function useCounterEffects() {
  const actions$ = useActions();

  useEffect(() => {
    const increment$ = actions$.pipe(
      ofType(increment),
      mergeMap(() => fetch('/data.json').then(response => response.json())),
      map(({ products }) => set({ val: products.length })),
    );
    
    const sub = merge(increment$).subscribe(action => store.dispatch(action));

    return () => {
      sub.unsubscribe();
    };
  }, []);
}