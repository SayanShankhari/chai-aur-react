import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Bruh from './components/Bruh'
import Image from './components/Image'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hello</h1>
      <Bruh
        type="kutta"
        name="Dogesh"
        image_file="dogesh.jpeg"
        behaviour="Famous for playfully snatching food, fighting with others."
        propObj={{name: "any", age: 10}}
        likedFoods={["milk", "meat", "bone"]}
      />
      <Bruh
        type="bandar"
        name="Monkesh"
        image_file="monkesh.jpeg"
        behaviour="Famous for playfully snatching human foods, slapping people."
        propObj={{name: "any", age: 10}}
        likedFoods={["roti", "milk", "fruits"]}
      />
    </>
  )
}

export default App
