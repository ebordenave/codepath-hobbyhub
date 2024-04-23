import {useState} from "react";

export const UserPostThread = () => {
  const [count , setCount] = useState(0)
  const increment = () => setCount((prevValue) => prevValue + 1)
  const decrement = () => setCount((prevValue) => prevValue - 1)
  return <>
    <button onClick={increment}>Increment</button>
    <button onClick={decrement}>Decrement</button>
    <div>{count}</div>
  </>;
};