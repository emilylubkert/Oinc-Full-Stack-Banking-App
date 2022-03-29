var admin = require("firebase-admin");

var serviceAccount = require("/Users/lubkert/MITxPro/Week-Folders/Week27/my-bad-bank/backend/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;