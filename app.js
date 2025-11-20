import dotenv from "dotenv";
dotenv.config();

import bolt from "@slack/bolt";
const { App } = bolt;

export const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.APP_TOKEN
});
