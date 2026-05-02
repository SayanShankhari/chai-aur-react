import { ContainerLayout } from "../layouts";
import { PostForm } from "../components/forms";

export default function AddPost() {
	return (
		<div className="py-8">
			<ContainerLayout>
				<PostForm />
			</ContainerLayout>
		</div>
	);
}