import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, selectCounter } from './state/counter';

export const CounterComponent = () => {
  const counter = useSelector(selectCounter);
  const dispatch = useDispatch();

  return (
    <div>
      <div>Counter: {counter}</div>
      <button onClick={() => dispatch(increment())}>
        Increment counter
      </button>
    </div>
  )
}