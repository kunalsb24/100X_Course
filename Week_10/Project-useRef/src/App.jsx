import { useState } from 'react'
import {useRef} from 'react'

// useRef
// reference to a value, such that when u change the value, the component does not re-renders

// a clock with start and stop button
function App() {

  const [currCount, setCurrCount] = useState(0);
  const timer = useRef();

  function startClock(){
    let value = setInterval(function (){
      setCurrCount(c=> c+1);
    }, 1000);
    timer.current = value;
  }
 
  function stopClock(){
    clearInterval(timer.current);
  }

  return <div>
    {currCount}
    <br />
    <button onClick={startClock}>Start</button>
    <button onClick={stopClock}>Stop</button>
  </div>
}

export default App
