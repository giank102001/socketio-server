const path = require('path');
const express = require('express');
const app = express();

//configuracion
app.set('port', process.env.PORT || 3000);

//empezar archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// arrancar el server
const server = app.listen(app.get('port'), () => {
    console.log('servidor en puerto', app.get('port'));
})

const SocketIO = require('socket.io');
const io = SocketIO(server);

// websockets 
io.on('connection', (socket) => {
    console.log('nueva conexion', socket.id);

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    });
})

