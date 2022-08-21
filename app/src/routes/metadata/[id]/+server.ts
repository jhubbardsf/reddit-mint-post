import snoowrap from 'snoowrap';
import { error, type RequestHandler } from '@sveltejs/kit';
import { PUBLIC_BOT_NAME, PUBLIC_BOT_USER_AGENT } from '$env/static/public';
import { BOT_PASSWORD, REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET } from '$env/static/private';

export const GET: RequestHandler = async ({ params }) => {
	const r = new snoowrap({
		userAgent: PUBLIC_BOT_USER_AGENT,
		clientId: REDDIT_CLIENT_ID,
		clientSecret: REDDIT_CLIENT_SECRET,
		username: PUBLIC_BOT_NAME,
		password: BOT_PASSWORD
	});

	// const messages = await r.getUnreadMessages();
	// const jsonMessages: any = [];
	// const posts: any = [];
	// const contents: any = [];
	// console.log('DO');
	// messages.forEach(async (message) => {
	// 	// console.log({ message });
	// 	jsonMessages.push(message.toJSON());
	// 	const postId = message.parent_id;
	// 	// r.getSubmission('47v7tm')
	// 	// 	.fetch()
	// 	// 	.then((submission) => {
	// 	// 		return submission.comments[0].upvote();
	// 	// 	});

	// 	console.log('DO');
	// 	const p = r.getSubmission(postId);
	// 	console.log('P: ', JSON.stringify(p, null, 2));

	// 	// console.log(r.getSubmission(postId));

	// 	// console.log('POST: ', { post });
	// 	const content = await r.getContentByIds([p.name]); // What I want about the post is the content
	// 	console.log({ content: content[0] });
	// 	const author = content[0].author.name;
	// 	const title = content[0].title;
	// 	console.log({ author, title });
	// });
	const submission = r.getSubmission(params.id);
	const [content] = await r.getContentByIds([submission.name]);

	if (!('url' in content) || !('title' in content)) throw error(500, 'Not a post');

	const metadata = {
		description: 'Friendly OpenSea Creature that enjoys long swims in the ocean.',
		external_url: `https://reddit.com${content.permalink}`,
		image: content.url,
		name: content.title,
		attributes: [
			{
				trait_type: 'Poster',
				value: content.author.name
			},
			{
				trait_type: 'Subreddit',
				value: content.subreddit.display_name
			}
		]
	};

	return new Response(JSON.stringify(metadata));
};
