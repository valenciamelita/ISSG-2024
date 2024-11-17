const http = require("http");
const socketIo = require("socket.io")

const server = http.createServer();
const io = socketIo(server);

const users = new Map();


io.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected`);

    socket.emit("init", Array.from(users.entries())); // kirim spesifik ke yg br join

    socket.on("registerPublicKey", (data) => {
        const { username, publicKey } = data;
        users.set(username, publicKey);
        console.log(`${username} registered with public key`);
        io.emit("newUser", { username, publicKey }); //broadcast
    })

    socket.on("disconnect", () => {
        console.log(`Client ${socket.id} disconnected`)
    });

    socket.on("message", (data) => {
        let { username, message, signature } = data;
        console.log(`Receiving message from ${username}: ${message}`);

        io.emit("message", { username, message, signature });
    });
});

const port = 3000;
server.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
});

