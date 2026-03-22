let firebaseAdmin = null;

try {
  const admin = require("firebase-admin");

  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }

    firebaseAdmin = admin;
    console.log("Firebase initialized");
  } else {
    console.log("Firebase not configured");
  }
} catch (err) {
  console.log("Firebase disabled:", err.message);
}

module.exports = firebaseAdmin;