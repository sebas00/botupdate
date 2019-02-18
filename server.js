'use strict';

const express = require('express');
const http = require('http');
//const SocketServer = require('ws').Server;
const path = require('path');
var configobject = { color : 'red'};
const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');
const expressWs = require('express-ws')
const app = express();
const server = http.createServer(app);
//const server = http.createServer(express);

expressWs(app, server);
//const server = express()
  
  



//const wss = new SocketServer({ server });
app.ws('/', (ws, req) => {
  ws.send('hi');
  ws.on('close', () => {return;})


  
    var id = setInterval(sendCObject(), 1000);
    
      function sendCObject(){
        try{
      ws.send(configobject.color);
        }
 catch(err) {
   clearInterval(id);
    console.log('socket closed');
  }

      }
    

  
  
  

ws.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});})

app.get('/blue', (req, res) => {configobject.color = 'blue' ;
res.json({color : 'blue'});})

app.get('/red', (req, res) => {configobject.color = 'red' ;
res.json({color : 'red'});})


app.use((req, res) => res.sendFile(INDEX) )
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));
/*
setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);
*/
