import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DatabaseService } from "../../services";
import { ContainerLayout } from "./";
import { MyButton } from "../atoms/MyButton";
import { useSelector } from "react-redux";
import { ArticleModel } from "../models";

function ArticleLayout ( { title, banner, author, content, ...rest }, children ) {
	const [post, setPost] = useState (null);
	const user = useSelector ((state) => (state.auth.user_data?.id));
	const is_author = author && (user == author);
/*
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
*/
	return post ? (
		<div className="py-8">
			<ContainerLayout>
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
										bgcolor="bg-green-500"
										className="mr-3"
									>
										Edit
									</MyButton>
								</Link>
								<MyButton
									bgcolor="bg-red-500"
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
			</ContainerLayout>
		</div>
	) : (null);
}

export default ArticleLayout;