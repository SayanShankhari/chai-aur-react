import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DatabaseService, StorageService } from "../services";
import { ContainerLayout } from "../layouts";
import { MyCard } from "../components/atoms";
import images from "../assets/images";
import { usePosts } from "../hooks";
import { dummy_articles, toPostModel } from "../utils";

export default function AllPosts () {
	const author = useSelector (state => state.auth.user.id);
	const [posts, setPosts] = useState (dummy_articles.map (
		(article, index) => toPostModel (
			{
				...article
				, id: index
				, banner: article.banner || images [index % 7]
				, createdAt: new Date().toISOString()
				, author: article.author || author
			}
		)
	));
	const { stored_posts, stored_postIds, createPost, ...rest } = usePosts ();

	useEffect (() => {
		for (let i = 0; i < posts.length; i++) {
			createPost (posts [i]);
		}
	}, [ posts ]);

	useEffect (() => {
	// DatabaseService.listAllPosts ([])
	// 	.then ((all_posts) => {
	// 		if (all_posts) {
	// 			setPosts (all_posts.rows);
	// 		}
	// 	});
	}, []);

	return (
		<div className="w-full">
			<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{
				stored_posts.map ((post, idx) => (
					<MyCard
						key={post.slug}
						slug={post.slug}
						title={post.title}
						content={post.content}
						banner={post.banner}
					/>
				))
			}
			</ul>
		</div>
	)
}