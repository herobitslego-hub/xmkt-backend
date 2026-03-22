let admin = null;

try {
  if (process.env.FCM_SERVICE_ACCOUNT_PATH) {
    const serviceAccount = require(`../${process.env.FCM_SERVICE_ACCOUNT_PATH}`);

    admin = require("firebase-admin");

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log("✅ Firebase initialized");
  } else {
    console.log("⚠️ Firebase not configured");
  }
} catch (error) {
  console.log("⚠️ Firebase error:", error.message);
}

module.exports = admin;