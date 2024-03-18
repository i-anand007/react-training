import { useState, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [lenght, setLenght] = useState(8);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [spCharacterAllowed, setSpCharacterAllowed] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789";
    if (spCharacterAllowed) str += "!\#$%&()*+,-./:;<=>?@[\\]^_`{|}~";

    for (let i = 1; i < lenght.length; i++) {
      let char = Math.floor(Math.random() * str.length +1)      
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [setLenght, setPassword, setNumberAllowed, setSpCharacterAllowed])

  return (
    <>
       <div className="w-full max-w-4xl mx-auto shadow-md rounded-lg px-4 py-5 my-8 bg-gray-800 text-orange-500">
       <h1 className='text-white text-center my-6 text-6xl'>Password generator</h1>
       <div className='flex shadow rounded-lg overflow-hidden mb-4 text-2xl'>
        <input 
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly 
        />
        <button
        className='outline-none bg-red-700 text-white px-4 py-2'>Copy</button>
       </div>
       <div className='flex test-sm gap-x-2'>
        <div className='flex items-center gap-x-1'></div>
       </div>
       </div>
    </>
  )
}

export default App
