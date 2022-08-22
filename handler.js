"use strict";
const snoowrap = require("snoowrap");
const axios = require("axios");

module.exports.run = async (event, context) => {
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
    const parent_id = message.parent_id;
    // const parentId = JSON.parse(JSON.stringify(message)).parent_id;
    const submission = r.getSubmission(parent_id);
    const [content] = await r.getContentByIds([submission.name]); // What I want about the post is the content

    // Try to parse out an address at the start
    const address = message.body
      .replace("/u/CommentNFTMinter", "")
      .replaceAll(" ", "")
      .substring(0, 42);
    console.log({ address });

    const ethRegex = new RegExp("^0x[a-fA-F0-9]{40}$");

    if (ethRegex.test(address)) {
      try {
        const metadata = {
          description: "Reddit Post NFT",
          external_url: `https://reddit.com${content.permalink}`,
          image: content.url,
          name: content.title,
          attributes: [
            {
              trait_type: "Poster",
              value: content.author.name,
            },
            {
              trait_type: "Subreddit",
              value: content.subreddit.display_name,
            },
          ],
        };

        const res = await axios({
          url: "https://staging.crossmint.io/api/2022-06-09/collections/default/nfts",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-client-secret": process.env.CROSSMINT_CLIENT_SECRET,
            "x-project-id": process.env.CROSSMINT_PROJECT_ID,
          },
          data: {
            metadata,
            recipient: `poly:${address}`,
          },
        });

        const statusUrl = `https://staging.crossmint.io/api/2022-06-09/collections/default/nfts/${res.data.id}`;
        const statusRes = await axios({
          url: statusUrl,
          method: "GET",
          headers: {
            "x-client-secret": process.env.CROSSMINT_CLIENT_SECRET,
            "x-project-id": process.env.CROSSMINT_PROJECT_ID,
          },
        });
        console.log({ statusRes });

        const replyMessage = `NFT is minting! You will see it in your NFT [here](https://mumbai.polygonscan.com/address/${address}#tokentxnsErc721) soon!`;

        await message.reply(replyMessage);
      } catch (err) {
        await message.reply("Unknown error while minting NFT. Sorry :(");
      }
    } else {
      await message.reply(
        `Please comment with a valid ethereum address after my name. Example below.
        \`/u/${process.env.BOT_NAME} 0x1234567890123456789012345678901234567890\``
      );
    }

    // Mark as read
    // await r.markMessagesAsRead([message]);
  });
};
