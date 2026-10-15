import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8081 })

let userCount = 0;
let allSockets: WebSocket[] = [];

wss.on("connection", (socket) => {
    allSockets.push(socket);

    userCount += 1;
    console.log("User connected #"+ userCount);

    socket.on("message", (message) => {
        console.log("Message received: "+ message.toString())
 
        for(let i=0; i < allSockets.length; i++){
            const s = allSockets[i];
            if (s) {
                s.send(message.toString() + ": sent from the server");
            }
        }
                
    })


})