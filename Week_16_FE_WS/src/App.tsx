import { useEffect, useRef, useState } from "react"


function App() {

  const [socket, setSocket] = useState();
  const inputRef = useRef();

  function sendMessage(){
    if(!socket){
      return;
    }
    const message = inputRef.current.value;
    //@ts-ignore
    socket.send(message)
  }

  // whenever the app mounts run useEffect 
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws)

    ws.onmessage = (event) => {
      alert(event.data);
    }
  }, [])

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Message..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default App
