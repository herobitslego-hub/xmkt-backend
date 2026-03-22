const admin = require("firebase-admin");
const path = require("path");

let firebaseAdmin = null;

try {
  let serviceAccount = null;

  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else if (process.env.FCM_SERVICE_ACCOUNT_PATH) {
    serviceAccount = require(path.resolve(process.cwd(), process.env.FCM_SERVICE_ACCOUNT_PATH));
  }

  if (serviceAccount) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }

    firebaseAdmin = admin;
    console.log("🔥 Firebase initialized");
  } else {
    console.log("⚠️ Firebase not configured");
  }
} catch (err) {
  console.log("⚠️ Firebase init failed:", err.message);
}

module.exports = firebaseAdmin;