'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
//const SocketServer = require('ws').Server;
const path = require('path');
var configobject = { status : 'notstarted', color : 'red', shape: 'circle'};
const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');
const expressWs = require('express-ws')
const app = express();
const server = http.createServer(app);
//const server = http.createServer(express);
var wslink;
expressWs(app, server);
//const server = express()
  
  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//const wss = new SocketServer({ server });
app.ws('/', (ws, req) => {
 wslink = ws;
  ws.send(JSON.stringify(configobject));
  //ws.on('close', () => {return;})


  
   // var id = setInterval(sendCObject, 10000);
    
      function sendCObject(){
        try{
          console.log('send', JSON.stringify(configobject))
      ws.send(JSON.stringify(configobject));
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

app.post('/config', (req, res) => {configobject = req.body ;
res.json({color : req.body.color});})


app.get('/blue', (req, res) => {configobject.color = 'blue' ;
wslink.send(JSON.stringify(configobject));
res.json({color : 'blue'});


})

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
