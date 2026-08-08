import { useState } from "react"

function App() {
  return <div>
    <LightBulb />
  </div>
}

function LightBulb(){
  const[bulbState, setBulbState] = useState(true);;
  return <div>
    <BulbState bulbState={bulbState}/>
    <ToggleBulbState bulbState={bulbState} setBulbState={setBulbState} />
  </div>
}

function BulbState({bulbState}){
  return <div>
    {bulbState ? "Bulb On": "Bulb Off"}
  </div>
}

function ToggleBulbState({bulbState, setBulbState}){
  function toggle(){
    setBulbState(!bulbState)
  }
  return <div>
    <button onClick={toggle}>Toggle Bulb</button>
  </div>
}

export default App
