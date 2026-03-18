import { Container } from "../layouts/Container";
import { PostForm } from "../tools/PostForm";

export default function AddPost() {
	return (
		<div className="py-8">
			<Container>
				<PostForm />
			</Container>
		</div>
	);
}