const io = require("socket.io-client");
const readline = require("readline");
const crypto = require("crypto");

const socket = io("http://localhost:3000");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

let targetUsername = "";
let username = "";
const users = new Map();

// Generate Public Key and Private Key for the user
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
});

// Connection event
socket.on("connect", () => {
  console.log("Connected to the server");

  rl.question("Enter your username: ", (input) => {
    username = input.trim();
    if (!username) {
      console.log("Username cannot be empty. Exiting...");
      process.exit(0);
    }
    console.log(`Welcome, ${username} to the chat`);

    // Register public key with the server
    socket.emit("registerPublicKey", { username, publicKey });
    rl.prompt();

    // Input event
    rl.on("line", (message) => {
      if (message.trim()) {
        if (message.startsWith("!secret ")) {
          const match = message.match(/^!secret (\w+)$/);
          if (match) {
            targetUsername = match[1];
            if (users.has(targetUsername)) {
              console.log(`Now secretly chatting with ${targetUsername}`);
            } else {
              console.log(`User "${targetUsername}" not found.`);
              targetUsername = "";
            }
          }
        } else if (message === "!exit") {
          console.log(`No more secretly chatting with ${targetUsername}`);
          targetUsername = "";
        } else {
          if (targetUsername && users.has(targetUsername)) {
            // Encrypt message for private chat
            const targetPublicKey = users.get(targetUsername);
            try {
            const encryptedMessage = crypto
              .publicEncrypt(targetPublicKey, Buffer.from(message))
              .toString("base64");

            socket.emit("privateMessage", {
              username,
              message: encryptedMessage,
              encrypted: true,
              targetUsername,
            });
          } catch (err){
            console.error("Encryption failed:", err.message);
          }
          } else {
            // Send public message
            socket.emit("message", { username, message });
          }
        }
      }
      rl.prompt();
    });
  });
});

// Initialize users and keys
socket.on("init", (keys) => {
  keys.forEach(([user, key]) => users.set(user, key));
  console.log(`\nThere are currently ${users.size} users in the chat.`);
  rl.prompt();
});

// Handle new user joining
socket.on("newUser", (data) => {
  const { username, publicKey } = data;
  users.set(username, publicKey);
  console.log(`${username} joined the chat`);
  rl.prompt();
});

// Handle public and private messages
socket.on("message", (data) => {
  const { username: senderUsername, message: senderMessage, encrypted } = data;

  if (!encrypted) {
    // Public message
    console.log(`${senderUsername}: ${senderMessage}`);
  } else {
    if (users.get(senderUsername)) {
      console.log(`${senderUsername} (encrypted): ${senderMessage}`);
    }
  }
  rl.prompt();
});

// Handle private messages
socket.on("privateMessage", (data) => {
  const { username: senderUsername, targetUsername, message, encrypted } = data;

  if (encrypted && targetUsername === username) {
    try {
      const decryptedMessage = crypto
        .privateDecrypt(privateKey, Buffer.from(message, "base64"))
        .toString("utf8");
      console.log(`${senderUsername} (private): ${decryptedMessage}`);
    } catch {
      console.error("Decryption failed:", err.message);
    }
  }
  rl.prompt();
});

// Handle server disconnection
socket.on("disconnect", () => {
  console.log("Server disconnected. Exiting...");
  rl.close();
  process.exit(0);
});

// Handle EXIT
rl.on("SIGINT", () => {
  console.log("\nExiting...");
  socket.disconnect();
  rl.close();
  process.exit(0);
});
