import { useEffect, useState } from "react";
import { Header, Main, Footer, Container } from "../layouts";
import { DatabaseService } from "../../services";
import articles from "../../lib/articles.js";
import { MyCard } from "../atoms";
import images from "../../assets/images";

export default function HomePage() {
	const [posts, setPosts] = useState (articles);

	// useEffect (() => {
	// 	DatabaseService.listAllPosts()
	// 		.then ((posts) => {
	// 			if (posts) {
	// 				setPosts (posts.rows);
	// 			}
	// 		});
	// }, []);


	if (posts.length === 0) {
		return (
			<div className="w-full py-8 mt-4 text-center">
				<Container>
					<div className="flex flex-wrap">
						<div className="p-2 w-full">
							<h1 className="text-2xl font-bold hover:text-gray-500">
								Login to read posts
							</h1>
						</div>
					</div>
				</Container>
			</div>
		);
	}

	return (
		<>
			<Header />
			<Main />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<ul className="">
				{
					posts.map ((post, idx) => (
						<MyCard
							key={post.slug}
							slug={post.slug}
							title={post.title}
							content={post.content}
							//image_id={`../../assets/images/n${idx+1}.jpeg`}
							image_id={images[idx]}
						/>
					))
				}
				</ul>
			</div>
			<Footer />
		</>
	);
}

/*
	return (
		<div className="w-full py-8">
			<Container>
				<div className="flex flex-wrap">
					{
						posts.map ((post) => (
							<div
								key={ post.$id }
								className="p-2 w-1/4"
							>
								<PostCard {...post} />
							</div>
						))
					}
				</div>
			</Container>
		</div>
	);
*/