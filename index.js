import { app } from "./app.js";
import "./handlers/messageHandler.js";
import "./handlers/actionHandlers.js";

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡ B&F Ticket Triage Bot is running!");
})();
