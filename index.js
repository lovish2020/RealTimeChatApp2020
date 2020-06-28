const io = require('socket.io')(8000)

const users = {}

io.on("connection", socket => {
    socket.on('new-user-joined', name => {
        users[socket.id] = name
        socket.broadcast.emit("user-joined", name)
    })

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    })

    socket.on('disconnect', message => {
        socket.broadcast.emit('user-left', users[socket.io])
        delete users[socket.id]
    })
})

io.clients((error, clients) => {
    if (error) throw error;
    console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
});