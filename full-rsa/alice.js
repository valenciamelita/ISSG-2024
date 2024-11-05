const crypto = require("crypto");

/**
 * First of all, the SENDER obtains the RECIPIENT PUBLIC KEY.
 */
const senderPrivateKeyPem = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC2aRDeXFnnRrdD
F1RrHOvXgCvMFi7UvV1T5PLt9XhCgrd+oJylHHbNlw5TCswYMbURytZvE21ODFl9
LkxOINK9t0K0Pv1L2S8XSOHTOzdmDp+YDpDouYMeN4PVTmIu8CLp9AE4JQUKx9rv
lzyQvRCcn5zhxA1JLr5ExfUsTOmxp5JvNPPL2/Dbq98fw4x37oRxd0HflQe8FNPQ
lTL5MLWWMuHnUO01xBE8MD8DXxu6CDTZazbKrC+zRng80ycbCGotjWj0iiDVL1AK
/6j7wnv3wUN92934BOY0iZ2p/1Rvz7mZxmup+xFirlxR9lAkiFWkGW1Ik6veUzAM
Hsp57pOvAgMBAAECggEAGPGxLtcuLCRNd00/bA5eae/LDXOTH+BtXMWYOtYwhdfe
Q+Cuyx1jWaXofY6ibkSN4Er+m93qOpwRuL6WDLEMYIkpBAEBHlgqymJbD0mvv7MM
O/zx8AE+Xul0i7zWTFjmTVvitszJLbo6xDzIOXrBRMnG6FCpCHLt7fWsG0zBQFvQ
Dfn/jMhhO/w8Nw9VvquEARjnInKl6RmS31znm6DIWrqRr9qiSvipcGTwi1nQuDMK
4esZD+wC5YNK5oe6XGgCupTMDCT9vep5b68IVc3meH3nmxsf6zC7RpDxFEdA7sau
/WYZcS/Jvks33JOUrju38QicNDIBvmJQTbo9KZ0iIQKBgQD/EwxonpAOMEpzHu0v
x5DV2FZiXiZLf9ubPdLL7BkC4GnJR+Zus3s19BOzGlvl/uKOvnWjfky1f69ZhUzg
1FRLwp14B6+D48PQ3Rm5YBt3y6lKEM6wpFEXdgrOLypzAEmVabtZFaK0vTRhgO82
LNCs6jkEJpuf+n6x/pbhm2lL2QKBgQC3EoQjAaaqKEg4xxd3p3mK0TRKaiEzErRk
78YH+K+bh3vYKvnFtE2kznh/ylLKRNZg5K+tYK48g70K5dbNcTKhK++x06FB90xS
f8CShOhsI0jumXpSy5mSUg5jeBRui9B5bGYOiytRGpDTzXHI2SQzh987k7V92nWF
w6VrpOzOxwKBgQCaualLRPPJR43Bqz7hPsMilKpB3S6JmbNSxfu6ayr4zbwdtpmX
CRRyM+5HNHQOXcB8Khgd5p0Nc7igKvXpY6MGmbT/fFoBPQYpChVyl1PSJR45qVxX
VjVCb/459+5d+Ayqr4pPjYo27JZ7lsSELkcevK19URYRwtdbjT1k+Oq0cQKBgHG8
ozNMd0sHs7bymfXQqoY/6wjAXtfoKwL6pEGXkyJBTgPCz2Kw3fwh+mMKQ90+XyHb
cfl5M0aNYgk/OfBw/096iHQmUu00wsoObIma4PsuAMWbvI9rxoFNUXsiwy7a1i5Z
1h37AHJm2st7u9FYdlE9fMb6warq6lCseD0kPatJAoGBAL/awZGtHfPBkTyzdrJD
4QOByNzuJHMlRVa7PewSNhGjMz7Z9i6NCE81Bi6SYvCbDqSwkonI3l6RNonp4Z7N
PaaozB/9ZqBi9LNzTeehj76E9/gXFDk4SWuHRucUaISbtohmKTq0sYTjJmqozgV6
IVkJn90SnUkOu9NS2gDRTwq7
-----END PRIVATE KEY-----`;
const senderPrivateKey = crypto.createPrivateKey(senderPrivateKeyPem);

const recipientPublicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6w6PyBTPJXY7IJ2fFY8u
zHQcqh6wvTcxDa5t9P+gzkMisS9UIa1Xw025xFXoc2Sh7LikXcGjhPlmDx3FkLB2
5IY54kCo49saerROyw4tO2lwqJcmmcXW/zMuILoY2eD/Z/XcEabvrCKSPukNHaPO
TmW5RnnTUe3vSJt+Z4L6TXwlFXNp7U1H9hnCFffzEzX78W0bTBX+czTcMtGzc14e
Ejy+9Zx9XxZVTAEtGdwVKmWaQirPKx0777f5+7FPbNStozE3eX3bm5k3pLWoEg3k
GL54NMMtnNHQSDE37Y+In8yp19/S6tkwbmfkbDok7zU7C5JnJdMdFq4lNAn6iKie
BwIDAQAB
-----END PUBLIC KEY-----`;
const recipientPublicKey = crypto.createPublicKey(recipientPublicKeyPem);

const message = "I want some apples";

const data = Buffer.from(message);
const signature = crypto.sign("sha256", data, senderPrivateKey);
console.log("Signature:", signature.toString("hex"));


const ciphertext = crypto.publicEncrypt(recipientPublicKey, data);
console.log("Message Encrypted:", ciphertext.toString("hex"));