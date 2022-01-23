import React, { useEffect } from 'react';
import { createStore } from '@methodjs/store';

type Count = {
  pre: number;
  current: number;
};

const [useCount, setCount] = createStore<Count>(() => ({ pre: 0, current: 0 }));

const increment = () =>
  setCount(({ current }) => ({ pre: current, current: current + 1 }), {
    action: 'increment',
  });
const decrement = () =>
  setCount(({ current }) => ({ pre: current, current: current - 1 }), {
    action: 'decrement',
  });
const zero = () =>
  setCount(({ current }) => ({ pre: current, current: 0 }), { action: 'zero' });

const payload = () =>
  setCount(({ current }) => ({ pre: current, current: 0 }), {
    action: 'payload',
    dummy: {
      a: 'a',
      b: 0,
      c: [{ d: 7 }, 0, '1'],
    },
  });

export function Counter() {
  const { pre, current } = useCount();
  useEffect(() => {
    const [, , getDummy] = createStore<number>(() => 0, { key: 'Dummy' });
    getDummy();
  }, []);
  return (
    <div style={{ padding: 10 }}>
      <h6>{`Count: ${pre} (pre), ${current} (current)`}</h6>
      <div>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
      <div>
        <button onClick={zero}>Zero</button>
        <button onClick={payload}>Payload</button>
      </div>
    </div>
  );
}
