// useCallback is slower than pure function (same as ES6 lamda)
// const slugTransform = useCallback ((value) => {
// 	if (value && typeof (value) === "string") {
// 		const slug = value
// 						.trim()
// 						.toLowerCase()
// 						.replace(/ /g, "-");
// 						//.replace(/^[a-zA-Z\d\s]+/g, "-");
// 		// setValue ("slug", slug);
// 		return slug;
// 	}
// 	return ""; // else part, for all other cases
// }, []);

function slugTransform (value) {
	if (value && typeof (value) !== "string") {
		return "";
	}

	return value
		.trim()
		.toLowerCase()
		.replace(/[^a-zA-Z\d\s]+/g, "-")
		.replace(/\s+/g, "-");
}

export default slugTransform;