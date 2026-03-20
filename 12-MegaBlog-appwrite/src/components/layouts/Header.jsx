import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MyLogo, MyButton } from "../atoms/";
import { AuthenticationService } from "../../services";
import { store_signout } from "../../store/authSlice";

export default function Header() {
	const auth_stat = useSelector (state => (state.authReducer.status));
	const navigate = useNavigate ();
	const dispatch = useDispatch ();

	const nav_items = [
		{ name: "Home" , slug: "/" , active: true }
		, { name: "About", slug: "/about", active: true }
		, { name: "SignIn", slug: "/signin", active: !auth_stat }
		, { name: "SignUp", slug: "/signup", active: !auth_stat }
		, { name: "SignOut", slug: "/signout", active: auth_stat }
		, { name: "Services", slug: "/services", active: true }
		, { name: "Contact", slug: "/contact", active: true }
		, { name: "All Posts", slug: "/posts", active: auth_stat }
		, { name: "Add Post", slug: "/add-post", active: auth_stat }
	];

	function visitAuthPage() {
		navigate ("/auth");
	}

	function handleSignout () {
		AuthenticationService.logout()
			.then (() => {
				dispatch (store_signout());
			})
			.catch ((error) => {
				throw (error);
			})
			.finally (() => {
				localStorage.clear ("cookieFallback");
			});
	}

	return (
<header>
	<nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
		<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
			<Link to="/" className="flex items-center">
				<MyLogo
					custom_style={"mr-3 h-6 sm:h-9"}
					alternate_text={"MegaBlog Logo"}
				/>
				<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
					MegaBlog
				</span>
			</Link>
			<div className="flex items-center lg:order-2">
				{
					(!auth_stat) ? (
						<MyButton onClick={ visitAuthPage }>Sign In</MyButton>
					) : (
						<MyButton onClick={ handleSignout }>Sign Out</MyButton>
					)
				}

				{/* <Link to="/" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
					Log in
				</Link> */}
				{/*<button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
					<span className="sr-only">Open main menu</span>
					<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
					<svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
				</button>*/}
			</div>
			{/*<div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">*/}
				<ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
					{
						nav_items
						.filter ((item) => (!item.name.startsWith ("Sign")))
						.map ((item) => (
							(item.active) ? (
								<li key={ item.name }>
									{/*<button
										className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 roundex-full"
										onClick={() => (navigate (item.slug))}
									>
										{ item.name }
									</button>*/}
									<Link
										to={ item.slug }
										onClick={() => (navigate (item.slug))}
										className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
									>
										{ item.name }
									</Link>
								</li>
							) : null
						))
					}
				</ul>
			{/*</div>*/}
		</div>
	</nav>
</header>
	);
}