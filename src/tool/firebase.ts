var admin = require('firebase-admin');

var serviceAccount = require('./chanuka-6a05a-firebase-adminsdk-o7964-5cf96f19db.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://chanuka-6a05a.firebaseio.com'
});