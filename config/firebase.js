const admin = require("firebase-admin");

if (!admin.apps.length) {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log("🔥 Firebase initialized from ENV");
  } else {
    console.log("⚠️ Firebase not configured");
  }
}

module.exports = admin;