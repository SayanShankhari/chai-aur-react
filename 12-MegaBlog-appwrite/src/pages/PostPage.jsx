import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DatabaseService } from "../../services";
import { Container } from "../layouts";
import { MyButton } from "../atoms/MyButton";
import { useSelector } from "react-redux";

export default function PostPage() {
	const [post, setPost] = useState (null);
	const { slug } = useParams();
	const navigate = useNavigate();

	const user_data = useSelector ((state) => (state.auth.user_data));

	const is_author = post && (user_data ? (post.useId == user_data.$id) : false);

	useEffect (() => {
		if (slug) {
			DatabaseService.getPost (slug)
				.then (
					(post) => {
						if (post) {
							setPost (post);
						} else {
							navigate ("/");
						}
					}
				);
		} else {
			navigate ("/");
		}
	}, [slug, navigate]);

	function delete_post () {
		DatabaseService.deletePost (post.$id)
			.then ((status) => {
				if (status) {
					DatabaseService.deleteFile (post.image);
					navigate ("/");
				}
			});
	}

	return post ? (
		<div className="py-8">
			<Container>
				<div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
					<img
						src={ DatabaseService.getFilePreview (post.image) }
						alt={ post.title }
						className="rounded-xl"
					/>
					{
						is_author && (
							<div className="absolute right-6 top-6">
								<Link
									to={`/edit-post/${post.$id}`}
								>
									<MyButton
										bgColor="bg-green-500"
										className="mr-3"
									>
										Edit
									</MyButton>
								</Link>
								<MyButton
									bgColor="bg-red-500"
									onClick={delete_post}
								>
									Delete									
								</MyButton>
							</div>
						)
					}
				</div>
				<div className="w-full mb-6">
					<h1 className="text-2xl font-bold">
						{ post.title }
					</h1>
				</div>
				<div className="browser-css">
					{ parse (post.content) }
				</div>
			</Container>
		</div>
	) : (null);
}