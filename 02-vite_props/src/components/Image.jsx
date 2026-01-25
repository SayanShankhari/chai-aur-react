function Image ({file_name = "/vite.svg", w = 10, h = 10}) {
	const image_URL = new URL (`../assets/images/${file_name}`, import.meta.url) .href;
	const alternate_text = `Unable to load ${file_name}!`;

	return (
		<img 
			src = {image_URL}
			alt = {alternate_text}
			width={w}
			height={h}
		/>
	);
}

export default Image;