import { createEntityAdapter, createSlice, nanoid } from '@reduxjs/toolkit';
import { PostsStateModel } from "../models";

const postsAdapter = createEntityAdapter (
	{
		// Keep posts sorted by date
		// updated to guard empty values
		sortComparer: (post_A, post_B) => {
			if (!post_A.createdAt) return -1;
			if (!post_A.createdAt) return -1;
			return post_B.createdAt.localeCompare (post_A.createdAt)
		}
	}
);

const postsSlice = createSlice (
	{
		name: 'posts'	// placeholder namespace
		, initialState: postsAdapter.getInitialState (
			{
				status: 'idle', // You can still add extra fields like loading status
			}
		)	// automates state: { ids: [ id-1, id-2, ... ], entities: { "id-1": {...DataModel}, "id-2": {...DataModel}, ... } }
		, reducers: {
			// Adapter provides built-in CRUD functions/reducers'-actions
			// renamed action names are like "event happened"
			postAdded: postsAdapter.addOne
			, postsReceived: postsAdapter.setAll
			, postUpdated: postsAdapter.updateOne
			, postUpserted (state, action) {	// equivalent/alternate syntax
				postsAdapter.upsertOne (state, action.payload);
			}
			, postDeleted: postsAdapter.removeOne
		}
	}
);

export const {
	postAdded
	, postsReceived
	, postUpdated
	, postUpserted
	, postDeleted
} = postsSlice.actions;

// memoized selectors - use in usePosts hook
export const {
	selectAll: selectAllPosts
	, selectById: selectPostById
	, selectIds: selectPostIds
} = postsAdapter.getSelectors ((state) => (state.posts));

export default postsSlice.reducer;