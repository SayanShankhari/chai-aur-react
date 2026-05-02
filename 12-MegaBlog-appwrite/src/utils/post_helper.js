import { PostModel } from "../models";

export function toPostModel (existing_post) {
	const post = { ...PostModel };

	// 4x times faster, using barebone function
	for (const key of Object.keys (PostModel)) {
		if (key in existing_post) {
			post [key] = existing_post [key];
		}
	}

	// 4x times slower, using callback
	// Object.keys(PostModel).forEach (key => {
	// 	if (key in existing_post) {
	// 		post[key] = existing_post[key];
	// 	}
	// });

	return post;
}