import dotenv from "dotenv";
dotenv.config();

import { App } from "@slack/bolt";

// Initialize Slack app in HTTP mode (no socketMode)
export const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});
