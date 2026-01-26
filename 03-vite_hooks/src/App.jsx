import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [count, setCount] = useState (0);

  const increase = () => {
    if (count < 20) {
      setCount (count + 1);
    }
  }

  const decrease = () => {
    setCount (count - 1);
  }

  return (
    <>
      <h1>Test {count}</h1>
      <h2>Count: {count}</h2>
      <button onClick={increase}>Increase {count}</button>
      <button onClick={decrease}>Decrease {count}</button>
      <p>another: {count}</p>
    </>
  )
}

export default App
