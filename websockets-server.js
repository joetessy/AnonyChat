var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;

var ws = new WebSocketServer({
  port: port
});

let messages = [];

console.log('websocket server started');

ws.on('connection', (socket) => {
  messages.forEach((message) => socket.send(message));
  console.log('client connection established');
  socket.on('message', (data) => {
    console.log('message received: ' + data);
    messages.push(data);
    ws.clients.forEach((clientSocket) => clientSocket.send(data));
  });
});
