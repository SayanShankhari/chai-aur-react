import { useCallback, useState } from "react";
import { PostModel } from "../models";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { postAdded, postDeleted, postUpserted, postUpdated, selectAllPosts, selectPostIds } from "../store/postsSlice";
import { toPostModel } from "../utils";

function usePosts () {
	const [ error, setError ] = useState ("");
	const dispatch = useDispatch ();

	// Get all posts using the memoized selector
	const stored_posts = useSelector (selectAllPosts);
	const stored_postIds = useSelector (selectPostIds);

	// Action creators wrapped for convenience (optional)
	const createPost = (post) => dispatch (postAdded (post));
	const receivePosts = (posts) => dispatch (postsReceived (posts));
	const updatePost = (post) => dispatch (postUpdated (post));
	const upsertPost = (post) => dispatch (postUpserted (post));
	const deletePost = (id) => dispatch (postDeleted (id));
	// optional
	const getPostById = (id) => useSelector ((state) => selectPostById (state, id));

	return {
		stored_posts
		, stored_postIds
		, createPost
		, receivePosts
		, updatePost
		, upsertPost
		, deletePost
		, getPostById
	};
}

export default usePosts;