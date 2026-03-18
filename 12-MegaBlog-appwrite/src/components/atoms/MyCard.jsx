import { DatabaseService } from "../../services";
import { Link } from "react-router-dom";

export default function MyCard ({ $id, title, image_id }) {
	return (
		<Link to={`/post/${$id}`}>
			<div className="w-full bg-gray-100 rounded-xl p-4">
				<div className="w-full justify-center mb-4">
					<img
						src={ DatabaseService.getFilePreview (image_id) }
						alt="image preview"
						className="rounded-xl"
					/>
				</div>
				<h2 className="text-xl font-bold">
					{ title }
				</h2>
			</div>
		</Link>
	);
}