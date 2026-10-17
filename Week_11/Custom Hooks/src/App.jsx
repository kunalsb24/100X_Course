// import { useState } from "react"
// import './App.css'
// // Custom Hook
// function useCounter(){
//   const [count, setCount] = useState(0);

import { useEffect } from "react";
import { useState } from "react"



//   function increaseCount(){
//     setCount(count + 1);
//   }

//   return {
//     count: count,
//     increaseCount: increaseCount
//   }
// }

// function App() {
//   const {count, increaseCount} = useCounter();

//   return <div>
//     <button onClick={increaseCount}>Increase {count}</button>
//   </div>
// }

// export default App

//--------------------------------------------------------------------

// Another usecase where Counter component uses useCounter hook 

// import { useState } from "react"
// import './App.css'
// // Custom Hook
// function useCounter(){
//   const [count, setCount] = useState(0);

//   function increaseCount(){
//     setCount(count + 1);
//   }

//   return {
//     count: count,
//     increaseCount: increaseCount
//   }
// }

// function App() {
//   return <div>
//     <Counter/>
//     <Counter/>
//     <Counter/>
//     <Counter/>
//     <Counter/>
//   </div>
// }

// function Counter(){
//   const {count, increaseCount} = useCounter();

//   return <div>
//     <button onClick={increaseCount}>Increase {count}</button>
//   </div>
// }

// export default App


// -----------------------------------------------------------------------------
//---------------------------------------------------------------------------------
// useFetch hook

// import { useState } from "react"
// import './App.css'
// import { useEffect } from "react";
// import {usePost, useFetch }from "./hooks/useFetch";

// function App(){

//   const {post} = usePost();
//   const [currentpost, setCurrentPost] = useState(1)
//   const {finalData, loading} = useFetch("https://jsonplaceholder.typicode.com/posts/" + currentpost);

//   if(loading){
//     return <div>
//       <h1>Loading...</h1>
//     </div>
//   }

//   return (
//     <div>
//       <h2>------------------usePost hook-----------------------</h2>
//       {post.title}
//       <br /> <br />
//       {post.body}

//       <h2>------------------useFetch hook-----------------------</h2>

//       {finalData.body}
//       <br /><br />

//       <button onClick={()=> setCurrentPost(1)}>Post 1</button>
//       <button onClick={()=> setCurrentPost(2)}>Post 2</button>
//       <button onClick={()=> setCurrentPost(3)}>Post 3</button>
//       <br /> <br />
//       {JSON.stringify(finalData)}
//     </div>
//   )
// }

// export default App


//------------------------------------------------------------------------------
//----------------usePref() hook ------------------------------------//


// import { useState } from "react"
// import { usePrev } from "./hooks/usePrev";

// function App(){

//   const [count, setCount] = useState(0);
//   const prev = usePrev(count);

//   return <>
//   <button onClick={()=>setCount(count+1)}>Current Counter = {count}</button>
//   <p>Prev value of counter = {prev}</p>
//   </>
// }

// export default App

//------------------------------------------------------------------------------
//----------------useDebounce() hook ------------------------------------//

function useDebounce(value, delay){
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(()=> {
    const handler = setTimeout(()=> {
      setDebouncedValue(value);
    }, delay);

    return ()=> {
      clearTimeout(handler);
    }
  }, [value, delay]);

  return debouncedValue;
}

function App(){
 const [inputVal, setInputVal] = useState("");
 const debouncedValue = useDebounce(inputVal, 200)

 function change(e){
  setInputVal(e.target.value)
 }

 useEffect(()=> {
  console.log("Expensive operation");
 }, [debouncedValue])

 return <>
 <input type="text" onChange={change}/>
 </>
}

export default App