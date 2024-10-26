const io = require("socket.io-client");
const readline = require("readline");
const crypto = require("crypto");

const socket = io("http://localhost:3000");

function generateHash(message) {
    return crypto.createHash('sha256').update(message).digest('hex');
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> "
});

let username = "";

socket.on("connect", () => {
    console.log("Connected to the server");

    rl.question("Enter your username: ", (input) => {
        username = input;
        console.log(`Welcome, ${username} to the chat`);
        rl.prompt();

        rl.on("line", (message) => {
            if (message.trim()) {
                let hashedMessage = generateHash(message);

                socket.emit("message", { username, message, hashedMessage });
            }
            rl.prompt();
        });
    });
});

socket.on("message", (data) => {
    const { username: senderUsername, message: senderMessage, hashedMessage } = data;

    let correctHash = generateHash(senderMessage);

    if (senderUsername !== username) {
        if (hashedMessage === correctHash) {
            console.log(`${senderUsername}: ${senderMessage}`);
        } else {
            console.log(`${senderUsername}: ${senderMessage} (Warning: Message has been modified!)`);
        }
        rl.prompt();
    }
});

socket.on("disconnect", () => {
    console.log("Server disconnected, Exiting...");
    rl.close();
    process.exit(0);
});

rl.on("SIGINT", () => {
    console.log("\nExiting...");
    socket.disconnect();
    rl.close();
    process.exit(0);
});
