import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState (8);
  const [numberAllowed, setNumberAllowed] = useState (false);
  const [symbolAllowed, setSymbolAllowed] = useState (false);
  const [passward, setPassword] = useState ("fsdrfDFSARFAS");

  const password_reference = useRef (null);

  const generate_password = useCallback (() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (symbolAllowed) {
      str += "`!@#$%^&*()-_=+[]\\{}|;':\",./<>?";
    };

    if (numberAllowed) {
      str += "0123456789";
    }

    for (let i = 0; i < length; i++) {
      let index = Math.floor (Math.random() * str.length + 1);
      pass += str.charAt (index);
    }

    setPassword (pass);
  }, [setPassword, length, numberAllowed, symbolAllowed]);

  // memoization
  const copy_to_clipboard = useCallback (() => {
    console.log(password_reference);
    password_reference.current?.select();
    window.navigator.clipboard.writeText (passward);
  }, [passward]);

  // before component loading
  useEffect (() => {
    generate_password ();
  }, [length, numberAllowed, symbolAllowed, setPassword]);

  return (
    <>
      <h1 className='text-4xl text-center text-white mb-4'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" placeholder='Pa$$word' value={passward} readOnly ref={password_reference} className='text-orange-500 border-2 border-gray-700 focus:border-pink-500 w-full py-1 px-3' />
        <button onClick={copy_to_clipboard} className='cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-1 rounded'>Copy</button>
      </div>
      <div>
        <input type="range" id='range' min={8} max={80} value={length} className='cursor-pointer' onChange={(event) => {
          setLength (event.target.value);
        }}/>
        <label htmlFor="range" className='text-white'>Length:{length}</label>

        <input type="checkbox" id="number" name="number" value="false" className='ml-4' onChange={() => {
          setNumberAllowed ((numberAllowed) => !numberAllowed);
        }} />
        <label htmlFor="number" className='text-white'>Number Allowed</label>

        <input type="checkbox" id="symbol" name="symbol" value="false" className='ml-4' onChange={() => {
          setSymbolAllowed ((symbolAllowed) => !symbolAllowed);
        }} />
        <label htmlFor="symbol" className='text-white'>Symbol Allowed</label>
      </div>
    </>
  )
}

export default App
