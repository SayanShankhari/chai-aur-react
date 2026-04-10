import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useNavigation, useLocation } from "react-router-dom";
import { Header, Main, Footer, Container } from "../layouts";
import { DatabaseService } from "../services";
import articles from "../utils/articles";
import { Loader } from "../layouts";

export default function HomePage() {
	//const [posts, setPosts] = useState (articles);
	const auth_stat = useSelector (state => state.auth.status);
	const navigate = useNavigate();		// to redirect to other routes
	const navigation = useNavigation();	// to track page loading status
	const location = useLocation();		// to track page route path
	
	// just to test
	// const [loading, setLoading] = useState (true);

	useEffect (() => {
	// 	DatabaseService.listAllPosts()
	// 		.then ((posts) => {
	// 			if (posts) {
	// 				setPosts (posts.rows);
	// 			}
	// 		});
	//console.log(navigation);

		// just to test loading
		// setTimeout(() => {
		// 	setLoading(false);
		// }, 3000);
	

	}, []);

	if (navigation.state === "loading") return <Loader />;

	// just to test loading
	// if (loading) return <Loader />;

	return (
		<>
			<Header />
			{
				(location.pathname === "/") ? (
					(!auth_stat) ? (
						<div className="flex items-center justify-center h-150">
							<h1 className="text-center text-2xl font-bold text-red-500 hover:text-gray-500">
								Please sign in to read/write posts!
							</h1>
						</div>
					) : (
						<div className="flex items-center justify-center h-150">
							<h1 className="text-center text-2xl font-bold text-red-500 hover:text-gray-500">
								Click AllPosts to read posts!
							</h1>
						</div>
					)
				) : <></>
			}
			<Main />
			<Footer />
		</>
	)
}