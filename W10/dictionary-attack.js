const crypto = require('crypto');
const fs = require('fs');
const readline = require('readline');

const targetHash = "578ed5a4eecf5a15803abdc49f6152d6";

const dictionaryFile = "500-worst-passwords.txt";

async function dictionaryAttack() {
    const fileStream = fs.createReadStream(dictionaryFile);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const password of rl) {
        const hash = crypto.createHash('md5').update(password).digest('hex');
        if (hash === targetHash) {
            console.log(`Bob's password is: ${password}`);
            return;
        }
    }
    console.log("Password not found in the dictionary.");
}
dictionaryAttack();
