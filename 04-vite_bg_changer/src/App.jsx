import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [color, setColor] = useState("olive");

  function change_color (col) {
    setColor (col);
  }

  return (
    <>
      <div className='w-full h-screen duration-200' style={{backgroundColor: color}}>
        <button onClick={() => setColor ("red")} className="bg-red-500 px-4 py-1 rounded">Red</button>
        <button onClick={() => setColor ("green")} className="bg-green-500 px-4 py-1 rounded">Green</button>
        <button onClick={() => setColor ("blue")} className="bg-blue-500 px-4 py-1 rounded">Blue</button>
        <button onClick={() => setColor ("yellow")} className="bg-yellow-500 px-4 py-1 rounded">Yellow</button>
        <button onClick={() => setColor ("magenta")} className="bg-fuchsia-500 px-4 py-1 rounded">Magenta</button>
        <button onClick={() => setColor ("cyan")} className="bg-cyan-500 px-4 py-1 rounded">Cyan</button>
        <button onClick={() => setColor ("orange")} className="bg-orange-500 px-4 py-1 rounded">orange</button>
        <button onClick={() => setColor ("#FFBF00")} className="bg-amber-500 px-4 py-1 rounded">amber</button>
        <button onClick={() => setColor ("yellow")} className="bg-yellow-500 px-4 py-1 rounded">yellow</button>
        <button onClick={() => setColor ("lime")} className="bg-lime-500 px-4 py-1 rounded">lime</button>
        <button onClick={() => setColor ("emerald")} className="bg-emerald-500 px-4 py-1 rounded">emerald</button>
        <button onClick={() => setColor ("teal")} className="bg-teal-500 px-4 py-1 rounded">teal</button>
        <button onClick={() => setColor ("sky")} className="bg-sky-500 px-4 py-1 rounded">sky</button>
        <button onClick={() => setColor ("indigo")} className="bg-indigo-500 px-4 py-1 rounded">indigo</button>
        <button onClick={() => setColor ("violet")} className="bg-violet-500 px-4 py-1 rounded">violet</button>
        <button onClick={() => setColor ("purple")} className="bg-purple-500 px-4 py-1 rounded">purple</button>
        <button onClick={() => setColor ("fuchsia")} className="bg-fuchsia-500 px-4 py-1 rounded">fuchsia</button>
        <button onClick={() => setColor ("pink")} className="bg-pink-500 px-4 py-1 rounded">pink</button>
        <button onClick={() => setColor ("rose")} className="bg-rose-500 px-4 py-1 rounded">rose</button>
        <button onClick={() => setColor ("slate")} className="bg-slate-500 px-4 py-1 rounded">slate</button>
        <button onClick={() => setColor ("gray")} className="bg-gray-500 px-4 py-1 rounded">gray</button>
        <button onClick={() => setColor ("zinc")} className="bg-zinc-500 px-4 py-1 rounded">zinc</button>
        <button onClick={() => setColor ("neutral")} className="bg-neutral-500 px-4 py-1 rounded">neutral</button>
        <button onClick={() => setColor ("stone")} className="bg-stone-500 px-4 py-1 rounded">stone</button>
      </div>
    </>
  )
}

export default App
