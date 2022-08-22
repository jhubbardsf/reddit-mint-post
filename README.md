# Reddit Mint Bot

## Use on reddit
Bot that uses HTML -> Image generation to create an image of a reddit post and mint it with Poster/Subreddit attributes if a user comments and mentions the bot in the following format:

`/u/CommentNFTMinter 0xTHEIR_POLY_ADDRESS`

Example usage can be seen on the [CommentNFTTest](https://www.reddit.com/r/CommentNFTTest/) subreddit.

## Logic
All the logic handling the reddit bot and crossmint minting live in handler.js. The bot is deployed to AWS lambda with a 1 minute cron job using [serverless](serverless.com).

## Notes
I've been testing it around in /r/CommentNFTTest. Idk how well my bot will work elsewhere since it's brand new (and has low karma so might get caught in a lot of spam filters), but he's an approved submitted to that test subreddit.

Also, there was originally a SvelteKit frontend part that was later removed which is why the vercel link is still there. Please ignore.

## Shoutouts
Bot made possibly by [CrossMint](https://crossmint.io), [Serverless](https://serverless.com), and [Snoowrap](https://www.npmjs.com/package/snoowrap).
