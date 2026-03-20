import { Container } from "../layouts";
import { PostForm } from "../forms";

export default function AddPost() {
	return (
		<div className="py-8">
			<Container>
				<PostForm />
			</Container>
		</div>
	);
}