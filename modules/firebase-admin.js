const admin = require('firebase-admin');

const serviceAccount = require('../config/firebaseAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://pc-build-b6c8e.firebaseio.com'
});

module.exports = admin;