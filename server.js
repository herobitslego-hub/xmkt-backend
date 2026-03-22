require("dotenv").config();

const app = require("./app");
const config = require("./config");
const connectDatabase = require("./config/db");

async function startServer() {
  try {
    await connectDatabase();
       app.listen(config.port, "0.0.0.0", () => {
         console.log(`[server] Listening on port ${config.port}`);
         console.log(`[server] Health check: http://localhost:${config.port}${config.apiPrefix}/health`);
       });
  } catch (error) {
    console.error("[server] Startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
