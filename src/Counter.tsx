import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, selectCounter } from './state/counter';
import { useCounterEffects } from './state/counter-effects';

export const CounterComponent = () => {
  const counter = useSelector(selectCounter);
  const dispatch = useDispatch();
  useCounterEffects();

  return (
    <div>
      <div>Counter: {counter}</div>
      <button onClick={() => dispatch(increment())}>
        Increment counter
      </button>
    </div>
  )
}