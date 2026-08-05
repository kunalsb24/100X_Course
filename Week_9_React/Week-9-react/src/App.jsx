import { useEffect, useState } from "react"

function App() {

  // Conditionally rendering counter component
  let [counterVisible, setCounterVisible] = useState(true);

    useEffect(function(){
      setInterval(function(){
        setCounterVisible(c => !c);
      }, 5000)
    }, [])

  return <div>

    {counterVisible && <Counter></Counter>}
    
  </div>
}

// mounting, re-rendering, unmounting
function Counter(){

  const [count, setCount] = useState(0);
  
  // guard our setInterval from re-renders
  useEffect(function(){
    let clock = setInterval(function(){
      setCount(count => count + 1);
    }, 1000);

    return function(){
      clearInterval(clock)
    }
  }, []);

  function increaseCount(){
    setCount(count + 1);
  }

  // function decreaseCount(){
  //   setCount(count - 1);
  // }

  // function resetCount(){
  //   setCount(0);
  // }

  return <div>
    <h1>{count}</h1>
    <button onClick={increaseCount}>Increase count </button>
    {/* <button onClick={decreaseCount}>Decrease count </button>
    <button onClick={resetCount}>Reset count </button> */}
  </div>
}
export default App
