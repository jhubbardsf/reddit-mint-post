import snoowrap from 'snoowrap';
import type { PageServerLoad } from './$types';
import { PUBLIC_BOT_NAME, PUBLIC_BOT_USER_AGENT } from '$env/static/public';
import { BOT_PASSWORD, REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET } from '$env/static/private';

export const load: PageServerLoad = async () => {
	const r = new snoowrap({
		userAgent: PUBLIC_BOT_USER_AGENT,
		clientId: REDDIT_CLIENT_ID,
		clientSecret: REDDIT_CLIENT_SECRET,
		username: PUBLIC_BOT_NAME,
		password: BOT_PASSWORD
	});

	const messages = await r.getUnreadMessages();
	const jsonMessages: any = [];
	const posts: any = [];
	const contents: any = [];
	console.log('DO');
	messages.forEach(async (message) => {
		// console.log({ message });
		jsonMessages.push(message.toJSON());
		const postId = message.parent_id;
		// r.getSubmission('47v7tm')
		// 	.fetch()
		// 	.then((submission) => {
		// 		return submission.comments[0].upvote();
		// 	});

		console.log('DO');
		const p = r.getSubmission(postId);
		console.log('P: ', JSON.stringify(p, null, 2));

		// console.log(r.getSubmission(postId));

		// console.log('POST: ', { post });
		const content = await r.getContentByIds([p.name]); // What I want about the post is the content
		console.log({ content: content[0] });
		const author = content[0].author.name;
		const title = content[0].title;
		console.log({ author, title });
		console.log('Comment?: ', message.was_comment);
	});
	// console.log({ jsonMessages });

	return {
		messages: messages.toJSON(),
		posts: posts,
		contents
	};
};
