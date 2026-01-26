import { marginals } from './components';
import { Outlet } from 'react-router-dom';

export default function Layout () {
	return (
		<>
			<marginals.Header/>
			<Outlet/>
			<marginals.Footer/>
		</>
	);
}