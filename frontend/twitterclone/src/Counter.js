import { React, useEffect, useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const [secondCount, setSecondCount] = useState(1);
  useEffect(() => {
    console.log("Component Mounted");
    return function () {
      console.log("Exit ...........");
    };
  }, []);

  useEffect(() => {
    console.log("Update Phase");
  }, [count]);

  return (
    <div>
      <h1>Counter1: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <h1>------------------------------------------------------</h1>
      <h1>Counter2: {secondCount}</h1>
      <button onClick={() => setSecondCount(secondCount + 1)}>+</button>
      <button onClick={() => setSecondCount(secondCount - 1)}>-</button>
    </div>
  );
}
