import { app } from "./app.js";
import "./handlers/messageHandler.js";
import "./handlers/actionHandlers.js";

const PORT = process.env.PORT || 8080;

// Start Slack app (HTTP mode)
(async () => {
  await app.start(PORT);
  console.log("⚡ B&F Ticket Triage Bot is running in HTTP mode!");
})();
