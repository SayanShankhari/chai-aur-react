import { useState, useEffect } from "react";
import { DatabaseService } from "../../services"
import { Container } from "../layouts";
import { MyCard } from "../atoms";

export default function AllPosts() {
	const [posts, setPosts] = useState ([]);

	useEffect (() => {}, []);

	DatabaseService.listAllPosts ([])
		.then ((all_posts) => {
			if (all_posts) {
				setPosts (all_posts.rows);
			}
		});

	return (
		<div className="w-full py-8">
			<Container style="">
				{
					posts.map ((post) => {
						<MyCard
							key={ post.$id }
							post={ post }
						/>
					})
				}
			</Container>
		</div>
	);
}