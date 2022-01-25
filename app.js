const express = require('express');
const bodyParser = require('body-parser');
// const socketIo = require('socket.io');

const noteRoutes = require('./routes/noteRoutes');

const HttpError = require('./middlewares/http-error');

const app = express();

//create instance of http server
const server = require('http').createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server,{cors:{origin:"*"}});

//socket emit event send note to just user who join the room
io.on('connection',(socket)=>{
    //each socket join default room witch name is socket.id
    console.log('new user connected');
    socket.on('sendNote',()=>{
        socket.broadcast.to('myRoom').emit('newNote');
    });
    socket.on('joinNoteRoom',()=>{
        socket.join('myRoom');
    });
    socket.on('joinNoteRoom',()=>{
        socket.leave('myRoom');
    });
})

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use('/api/users', noteRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (req.file){//lw 7asl ay error yamsa7 el sora 
        fs.unlink(req.file.path,err=>{console.log(err);})
    }
    if (res.headerSent) {//lw f res atba3t 
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

server.listen(5000, () => {
    console.log("server has started on port 5000");
});
