"use strict";
const snoowrap = require("snoowrap");
const axios = require("axios");

module.exports.run = async (event, context) => {
  const time = new Date();
  console.log(`Your cron function "${context.functionName}" ran at ${time}`);
  const snoowrapOptions = {
    userAgent: process.env.BOT_USER_AGENT,
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    username: process.env.BOT_NAME,
    password: process.env.BOT_PASSWORD,
  };

  const mintAddress = "";
  const r = new snoowrap(snoowrapOptions);

  const messages = await r.getUnreadMessages();

  messages.forEach(async (message) => {
    console.log(message.body);
    console.log("Was comment?: ", message.was_comment);
    // await message.reply("Hello, I am a bot.");
    // await message.markAsRead();
  });

  const res = await axios({
    method: "get",
    url: "http://google.com",
  });
  console.log({ res });
};
