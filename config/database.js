// Provides cryptographic functionality (OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions)
const crypto = require('crypto').randomBytes(256).toString('hex');

// Export config object
module.exports = {
    uri: 'mongodb://localhost:27017/mean-angular-2', // Database URI and database name
    secret: crypto, // Crypto-created secret
    db: 'mean-angular-2' //Database name
}

