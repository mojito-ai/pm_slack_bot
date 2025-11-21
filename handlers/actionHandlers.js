import { app } from "../app.js";

/* ----------------------------------------------------
   FEEDBACK BUTTON CLICKED
---------------------------------------------------- */
app.action("feedback_choice", async ({ ack, body, client }) => {
  await ack();

  await client.chat.update({
    channel: body.channel.id,
    ts: body.message.ts,
    text: "Thanks for letting us know!",
    blocks: [
      {
        type: "section",
        text: { type: "mrkdwn", text: "Thanks for letting us know! 🙌" }
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "_Feedback selected — actions completed._"
          }
        ]
      }
    ]
  });
});

/* -----------------------------
   BUG BUTTON CLICKED
----------------------------- */
app.action("bug_choice", async ({ ack, body, client }) => {
  await ack();

  await client.chat.update({
    channel: body.channel.id,
    ts: body.message.ts,
    text: "Thanks for letting us know!",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Thanks for letting us know! 🐞\nWould you like me to create a support ticket to help resolve this bug?"
        }
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { type: "plain_text", text: "Yes" },
            style: "primary",
            action_id: "bug_yes"
          },
          {
            type: "button",
            text: { type: "plain_text", text: "No" },
            style: "danger",
            action_id: "bug_no"
          }
        ]
      }
    ]
  });
});

/* -----------------------------
   YES → Create Ticket
----------------------------- */
app.action("bug_yes", async ({ ack, body, client }) => {
  await ack();

  await client.chat.update({
    channel: body.channel.id,
    ts: body.message.ts,
    text: "Creating ticket...",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "👍 Great! I will create a support ticket for this bug."
        }
      }
    ]
  });
});

/* -----------------------------
   NO → End Flow
----------------------------- */
app.action("bug_no", async ({ ack, body, client }) => {
  await ack();

  await client.chat.update({
    channel: body.channel.id,
    ts: body.message.ts,
    text: "No ticket created.",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "👌 No worries — I won't create a ticket."
        }
      }
    ]
  });
});
