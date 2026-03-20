import { DatabaseService } from "../../services";
import { Link } from "react-router-dom";

//export default function MyCard ({ $id, title, image_id }) {
export default function MyCard ({ slug, title, content, image_id }) {
	return (
		<div className="w-80 bg-gray-800 rounded-xl p-4 m-2 flex flex-col border-solid border-1">
			<header className="flex flex-row justify-between mb-4">
				<img
					src={ image_id }
					alt="image preview"
					title="Click to read more"
					className="w-10 h-10 rounded-full justify-center align-middle"
				/>
				<h2 className="w-full text-center align-middle text-4xl font-bold">
					{ title }
				</h2>
			</header>
			<main className="">
				<Link to={`/post/${slug}`}>
					<div className="bg-gray-500 rounded-xl">
						{/* <img
							src={ DatabaseService.getFilePreview (image_id) }
							alt="image preview"
							className="rounded-xl"
						/> */}
						<img
							src={ image_id }
							alt="image preview"
							className="w-80 h-45 rounded justify-center mb-4"
						/>
					</div>
				</Link>
			</main>
			<footer className="">
				<h3 className="text-center text-xl font-bold">
					{ title }
				</h3>
				<p className="text-base">
					{ content }
				</p>
			</footer>
		</div>
	);
}

/*
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
*/