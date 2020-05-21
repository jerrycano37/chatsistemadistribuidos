'use strict';

var cont = 0;
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX))
  .listen(PORT, () => console.log(`Escuhando en el puerto ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Cliente Conectado');
  socket.on('disconnect', () => console.log('Cliente Desconectado'));

  socket.on('mensaje', function (mensaje) {
    console.log('mensaje: ' + mensaje);
    io.emit('mensaje', mensaje);
  });

});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);