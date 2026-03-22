const admin = require("firebase-admin");
const path = require("path");

let firebaseAdmin = null;

try {
  let serviceAccount = null;

  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else {
    serviceAccount = require(path.resolve(__dirname, "../firebase-service-account.json"));
  }

  if (serviceAccount) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }

    firebaseAdmin = admin;
    console.log("🔥 Firebase initialized");
  }
} catch (err) {
  console.log("⚠️ Firebase init failed:", err.message);
}

module.exports = firebaseAdmin;