const crypto = require("crypto");

const recipientPrivateKeyPem = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDrDo/IFM8ldjsg
nZ8Vjy7MdByqHrC9NzENrm30/6DOQyKxL1QhrVfDTbnEVehzZKHsuKRdwaOE+WYP
HcWQsHbkhjniQKjj2xp6tE7LDi07aXColyaZxdb/My4guhjZ4P9n9dwRpu+sIpI+
6Q0do85OZblGedNR7e9Im35ngvpNfCUVc2ntTUf2GcIV9/MTNfvxbRtMFf5zNNwy
0bNzXh4SPL71nH1fFlVMAS0Z3BUqZZpCKs8rHTvvt/n7sU9s1K2jMTd5fdubmTek
tagSDeQYvng0wy2c0dBIMTftj4ifzKnX39Lq2TBuZ+RsOiTvNTsLkmcl0x0WriU0
CfqIqJ4HAgMBAAECgf96ho5sS4kEU2QNDhyl527S63qwT08m4NcGZx8i6+RYg8LK
mYvPkG+g0FUFO8K2nL48/DtcMiIKoGgElZy7ss64iXgUlIN07U9ubeP59KK7xzqd
GJ7p+v3B0F2s6nEmPgYA8gs2tpUb7HekjEifRxkKb1Fdh7GfyoO3qqtyLSlox7+O
su87WWIyid6sFjUhikStIY4LbYsW6F/83RSiUg1urBT4c1Vr/S8gB2IXmzMGXFpA
BoaiyodCk++5q7wZuJMJ5TxVpuIh4hk6e5vOJDEuqTBd5qhLU7Ud7IJYB5dVy/lT
nZWbuBpE9J90Ipbq6Lvchjh79tdXno1S5rTb4bkCgYEA/aOyKcRORqpguJ662K1U
Hn2M0uL6BviuaD1/Yvn8p79U0A2ec0tCOXDiItDRkM6nW/oAZ7vPFFe/pbAndzyo
lyg19SHqa79WTNc3HTWCq6A8VdX98qIVLDC7Qki8Nuos2LveQafEvv3AUuGK/N+1
z6ZBEYBCofTgpCm1LBQch90CgYEA7T6XmBzxCPyUCDV096mCq8xsGIoucvgPr9ep
XSlROWi/8HG8Ouv9JribnSFqF0p4B9I0bPyopNS6kD/tyNp2QBSeOSlS2+r9n/vp
pWEuE50G24yjt/C/nzCuT4Ic+4jBwU/zdOjCSxgVVlofaB6HH1Aleu6/moR2hrEA
jUN1cTMCgYEA06Tqn8t8fZ7iAmwBAZjwXljpT3eypmqQLc9TIqXy247eGJWkqBQe
eIvnRqH0nN6z7B3ahLTEgPcPphQtemOVUjxtedUJJUuNmaTkCm2CUe/tKLrdor74
59zqBM9ornINZfSt6x8xHyXie8ZUEdoifdj+5rmd4ELTyGg9E0Dc5ckCgYEAyRdq
61ZswE9HMoYNNPeLeQ92+H33zR+SPFwyhHLHFEBDoQzmnZL2KuIDlPaDtGY8w3Rb
V535XG2sDSUC6mKyJLLVQmJSh3HxtK+UZcevhJRvAZ1+ECWSZt6egWoqItLSWIbq
N0grl/c77svJHznxEouemUrRQanRxW02qIZrf50CgYBFMAtdoMS9SnRUttRtuIw3
O1ZldImtj9EhL4NyBp05EQxAhfT4QN26PNX3lxXlS+SnISjIJCPD4QSJ+UP+s6Mk
wTkJOnIAz3pxv+zS3ZeFdXVCD5fMlGyr927eyuWM6bFM9Iju1Wxkdl9VYdVIdsOp
j3pjU2yqdczvyWqA2NWkwQ==
-----END PRIVATE KEY-----`;
const recipientPrivateKey = crypto.createPrivateKey(recipientPrivateKeyPem);

/**
 * First of all, the RECIPIENT obtains SENDER PUBLIC KEY
 */
const senderPublicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtmkQ3lxZ50a3QxdUaxzr
14ArzBYu1L1dU+Ty7fV4QoK3fqCcpRx2zZcOUwrMGDG1EcrWbxNtTgxZfS5MTiDS
vbdCtD79S9kvF0jh0zs3Zg6fmA6Q6LmDHjeD1U5iLvAi6fQBOCUFCsfa75c8kL0Q
nJ+c4cQNSS6+RMX1LEzpsaeSbzTzy9vw26vfH8OMd+6EcXdB35UHvBTT0JUy+TC1
ljLh51DtNcQRPDA/A18bugg02Ws2yqwvs0Z4PNMnGwhqLY1o9Iog1S9QCv+o+8J7
98FDfdvd+ATmNImdqf9Ub8+5mcZrqfsRYq5cUfZQJIhVpBltSJOr3lMwDB7Kee6T
rwIDAQAB
-----END PUBLIC KEY-----`;
const senderPublicKey = crypto.createPublicKey(senderPublicKeyPem);

/**
 * Then, the RECIPIENT obtains MESSAGE and SIGNATURE
 * from the communication with the SENDER
 */
const signatureHex = "745e38d4ea24210c431a1be510d3d497fb85774b0e8a09ea98c22826d99b6e64bbf09aaecabcac21fb16403ffafe98255d99500a38c4e5ae348da80e0afe53c57eff6af3c1039189851964bdb6771bc04246478f4230424012beac5776dae5724abcbdefc748d36f6bc0fa9b19c4ef8ccec69cd8077dfba13e4db6435cef73d557e5c1d14c3eba7c2a49e62e538fb5b8f450adc16cadc9be85cdb64ba102ca76a412fb06aefb24123442f7f87e557eaab34952f1da89013dbb5490465463f17921e9713c2d39fc20ba54147be8b73806550b188dd60f58b2ee6c59da980c4ff622569b8a7e3e16f0f0649338fd3a99ef1701ec13786f47b21b19b2f881c1c390";
const signature = Buffer.from(signatureHex, "hex");

const ciphertextHex = "086bae06b46e8ed31e298540a40d8d0c937563f2563fdf154ab7457d1d22a9eebdaafe81a5b908afb05875e1526b2f2c44cdfdb1ded700de862f8aef10d513526a241fc2d9470a002ce623ce35679eff945c04b0be99aa0eb254c1dee7f82468792654cc20731c840807960ebf448c8643aeeb9e96149eb2e909aaf18ccd3fbd9545abd8be84ba624abba3608a3f7fe669bebd8804664fd6016ed7fc24da29a0ba3aa2e8e93b4e92f012a0e016b7fe9595d220bebd900620652e2ca565df05088001397abc11d93639fdf1984fcc2a35db6d5adbfd1a09cdce32705a7eb929d608ddfa5ac6d5b61488fa076a3560eba2e032e86976b85c0175cb1dd00a98f01c";
const ciphertext = Buffer.from(ciphertextHex, "hex");

// RECIPIENT recovers PLAINTEXT
const recoveredPlaintext = crypto.privateDecrypt(recipientPrivateKey, ciphertext);
const message = recoveredPlaintext.toString("utf8");
const data = Buffer.from(message);

// RECIPIENT verifies SIGNATURE
const isValid = crypto.verify("sha256", data, senderPublicKey, signature);
console.log("Signature verification:", isValid);
console.log("Message:", message);