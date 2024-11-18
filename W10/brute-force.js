const crypto = require('crypto');

const targetHash = "5531a5834816222280f20d1ef9e95f69";

// Function to brute force the PIN
function bruteForcePIN() {
    for (let pin = 0; pin <= 9999; pin++) {
        const pinString = pin.toString().padStart(4, '0');

        // Calculate MD5 hash of the PIN
        const hash = crypto.createHash('md5').update(pinString).digest('hex');

        if (hash === targetHash) {
            console.log(`Alice's PIN is: ${pinString}`);
            return pinString;
        }
    }
    console.log('PIN not found');
    return null;
}

bruteForcePIN();
