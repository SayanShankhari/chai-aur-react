import { Outlet } from "react-router-dom";

export default function Main() {
	return (
		<div className="w-full flex-1">
			<Outlet />
		</div>
	);
}