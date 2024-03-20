import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [spCharacterAllowed, setSpCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789";
    if (spCharacterAllowed) str += "!\#$%&()*+,-./:;<=>?@[\\]^_`{|}~";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, spCharacterAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, spCharacterAllowed, passwordGenerator]
  )

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
            ref={passwordRef}
          />
          <button
            className='outline-none bg-red-500 text-white px-4 py-2 hover:bg-red-700'
            onClick={copyPasswordToClipboard}
            >Copy</button>
        </div>
        <div className='flex test-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={8}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {
                setLength(e.target.value)
              }}
            />
            <label >Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={spCharacterAllowed}
              id="characterInput"
              onChange={() => {
                setSpCharacterAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="characterInput">Special Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
