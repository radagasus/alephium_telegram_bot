import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN, {
  telegram: { webhookReply: false }
})
bot.on("text", async (ctx) => ctx.reply("ok"))

export const handler = async (event) => {
  try {
    const message = extract_message(event)
    const message_text = message['message']['text']
    console.log(message_text)
    return bot.handleUpdate(message)
  } catch (error) {
    return {
      statusCode: 400,
      body: error.message,
    }
  }
};

function extract_message(request) {
  let body = request.body ? request.body : request;
  if (request.isBase64Encoded)
    body = base64Decode(body)
  return JSON.parse(body)
}

function base64Decode(str) {
  return Buffer.from(str, "base64").toString("utf8")
}
