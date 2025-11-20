import { app } from "../app.js";

/* ---------- FEEDBACK CLICK ---------- */
app.action("feedback_choice", async ({ ack, body, client }) => {
  await ack();

  await client.chat.update({
    channel: body.channel.id,
    ts: body.message.ts,
    text: "Thanks for letting us know!",
    blocks: [
      {
        type: "section",
        text: { type: "mrkdwn", text: "Thanks for letting us know!" }
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { type: "plain_text", text: "Feedback" },
            style: "primary",
            disabled: true
          },
          {
            type: "button",
            text: { type: "plain_text", text: "Bug" },
            disabled: true
          }
        ]
      }
    ]
  });
});

/* ---------- BUG CLICK ---------- */
app.action("bug_choice", async ({ ack, body, client }) => {
  await ack();

  await client.chat.update({
    channel: body.channel.id,
    ts: body.message.ts,
    text: "Thanks for letting us know! Would you like me to create a support ticket?",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Thanks for letting us know! Would you like me to create a support ticket to help resolve this bug?"
        }
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { type: "plain_text", text: "Feedback" },
            disabled: true
          },
          {
            type: "button",
            text: { type: "plain_text", text: "Bug" },
            style: "primary",
            disabled: true
          }
        ]
      }
    ]
  });
});
