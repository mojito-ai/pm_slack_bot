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

  // 1️⃣ Reply in original thread confirming ticket creation
  await client.chat.update({
    channel: body.channel.id,
    ts: body.message.ts,
    text: "Creating ticket...",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `👍 I've created ticket <${ticketLink}|#12345> to track this issue.`
        }
      },
    ]
  });

  // 2️⃣ Post instructions in central thread/channel
  await client.chat.postMessage({
    channel: body.channel.id,
    thread_ts: body.message.ts,
    text: "PM team response",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Our Product Operations team will review the new ticket <${ticketLink}|#12345> I’ve created and route it to the appropriate technical team within 24 hours. To help us resolve this faster, please provide: Your Customer ID (CID), Device ID & System logs. Need help finding these? Here's how:`
        }
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "* CID: * <http://amazon.com/|Open Amazon.com> → Right-click → View Page Source → Search for 'CustomerID'\n" +
            "* Device ID: * Profile pic → Settings → Scroll to bottom\n" +
            "* Logs: * Profile pic → Help & feedback → Provide feedback → Send Feedback"
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
