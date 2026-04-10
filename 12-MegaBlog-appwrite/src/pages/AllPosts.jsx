import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { DatabaseService } from "../../services"
import { Container } from "../layouts";
import { MyCard } from "../components/atoms";
import articles from "../utils/articles";
import images from "../assets/images";

export default function AllPosts () {
	const [posts, setPosts] = useState (articles);
	const auth_stat = useSelector (state => state.auth.status);

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
	)
}


/*


<>{
			(auth_stat) ? (
				<div className="w-full">
					<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
			) : (
				<div className="w-full py-8 mt-4 text-center">
					<Container>
						<div className="flex flex-wrap">
							<div className="p-2 w-full">
								<h1 className="text-2xl font-bold text-red-500 hover:text-gray-500">
									Please sign in to read/write posts!
								</h1>
							</div>
						</div>
					</Container>
				</div>
			)
		}
		</>



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
			<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{
					posts.map ((post, idx) => (
						<MyCard
							key={ post.slug }
							slug={ post.slug }
							title={ post.title }
							content={ post.content }
							//image_id={`../../assets/images/n${idx+1}.jpeg`}
							image_id={ images[idx] }
						/>
					))
				}
			</div>
		</div>

*/