import { useCallback } from "react";
import Cookies from "js-cookie";

export default function useCookie (name) {
	const [value, setValue] = useState(() => Cookies.get (name));

	const updateCookie = useCallback (
		(
			newValue
			, options = {}
		) => {
			const secureOptions = {
				secure: true
				, sameSite: "None"
				, path: "/"
				, ...options
			}
		}	// callback ends here
		, [name]	// dependancy list
	);

	const deleteCookie = useCallback (() => {
		Cookies.remove (name);
		setValue (undefined);
	}, [name]);

	return [ value, updateCookie, deleteCookie ];
}