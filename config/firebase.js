const admin = require("firebase-admin");

let firebaseAdmin = null;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }

    firebaseAdmin = admin;
    console.log("🔥 Firebase initialized from ENV");
  } else {
    console.log("⚠️ Firebase not configured");
  }
} catch (err) {
  console.log("⚠️ Firebase init failed:", err.message);
}

module.exports = firebaseAdmin;