const http = require("http");
const socketIo = require("socket.io")

const server = http.createServer();
const io = socketIo(server);

io.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected`);

    socket.on("disconnect", () => {
        console.log(`Client ${socket.id} disconnected`)
    });

    socket.on("message", (data) => {
        let { username, message, hash } = data;
        console.log(`Receiving message from ${username}: ${message}`);

        message = message + " hai (edited)";

        io.emit("message", { username, message, hash });
    });
});

const port = 3000;
server.listen(port, ()=> {
    console.log(`Malicious Server running on port ${port}`);
});

