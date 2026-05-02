import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContainerLayout } from "../layouts";
import { PostForm } from "../tools/PostForm";
import { DatabaseService } from "../../services";


export default function EditPost() {
	const [post, setPost] = useState ([]);
	const { slug } = useParams ();
	const navigate = useNavigate ();

	useEffect (() => {
		if (slug) {
			DatabaseService.getPost (slug)
				.then ((post) => {
					if (post) {
						setPost (post);
					} else {
						navigate ("/");
					}
				});
		}
	}, [slug, navigate]);

	return post ? (
		<div className="py-8">
			<ContainerLayout>
				<PostForm post={ post } />
			</ContainerLayout>
		</div>
	) : null;
}