import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  function clicked_normal() { // increase once
    setCount (count + 1);
    setCount (count + 1);
    setCount (count + 1);
  }

  function clicked_callback () {  // increase thrice
    setCount((count) => count + 1);
    setCount((count) => count + 1);
    setCount((count) => count + 1);
  }

  return (
    <>
      <button className='bg-green-500 hover:bg-blue-700 font-bold text-lg text-center text-black px-4 py-2 rounded' onClick={clicked_normal}>{count}</button>
      <button className='bg-red-500 hover:bg-blue-700 font-bold text-lg text-center text-black px-4 py-2 rounded' onClick={clicked_callback}>{count}</button>
    </>
  )
}

export default App