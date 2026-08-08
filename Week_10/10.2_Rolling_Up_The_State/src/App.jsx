import { createContext, useContext, useState } from "react"

/* LightBulb Component */
// function App() {
//   return <div>
//     <LightBulb />
//   </div>
// }

// function LightBulb(){
//   const[bulbState, setBulbState] = useState(true);;
//   return <div>
//     <BulbState bulbState={bulbState}/>
//     <ToggleBulbState bulbState={bulbState} setBulbState={setBulbState} />
//   </div>
// }

// function BulbState({bulbState}){
//   return <div>
//     {bulbState ? "Bulb On": "Bulb Off"}
//   </div>
// }

// function ToggleBulbState({bulbState, setBulbState}){
//   function toggle(){
//     setBulbState(!bulbState)
//   }
//   return <div>
//     <button onClick={toggle}>Toggle Bulb</button>
//   </div>
// }

/* Prop Drilling & Context API*/

const BulbContext = createContext()

function App() {
  const[bulbState, setBulbState] = useState(true);
  return <div>

    <BulbContext.Provider vlaue = {{
      bulbState: bulbState,
      setBulbState: setBulbState
    }}>
      <LightBulb />
    </BulbContext.Provider>  

  </div>
}

function LightBulb(){
  
  return <div>
    <BulbState />
    <ToggleBulbState />
  </div>
}

function BulbState(){
  const {bulbState} = useContext(BulbContext);
  return <div>
    {bulbState ? "Bulb On": "Bulb Off"}
  </div>
}

function ToggleBulbState(){
  const {bulbState, setBulbState} = useContext(BulbContext);
  function toggle(){
    setBulbState(!bulbState)
  }
  return <div>
    <button onClick={toggle}>Toggle Bulb</button>
  </div>
}

export default App
