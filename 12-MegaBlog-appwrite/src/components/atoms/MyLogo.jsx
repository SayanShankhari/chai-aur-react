export default function MyLogo ({ size="50", custom_style="mr-3 h-6 sm:h-9", alternate_text="logo"}) {
	return <img
		src="/blog-svgrepo-com.svg"
		className={`h-${size} w-${size} rounded-full ${custom_style}`}
		alt={`${alternate_text}`}
	/>;
}