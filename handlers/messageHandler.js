import { app } from "../app.js";

app.message(async ({ message, say }) => {
  if (message.subtype === "bot_message") return;   // Ignore bot messages
  if (message.thread_ts) return;                  // Ignore thread replies
  if (!message.text || message.text.length < 10) return; // Ignore short msgs

  await say({
    thread_ts: message.ts,
    text: "Hi! Just to help us process this correctly…",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Hi! Just to help us process this correctly — is this feedback about the app, or are you reporting a bug that needs technical support? 🤔"
        }
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { type: "plain_text", text: "Feedback" },
            action_id: "feedback_choice"
          },
          {
            type: "button",
            text: { type: "plain_text", text: "Bug" },
            action_id: "bug_choice"
          }
        ]
      }
    ]
  });
});
