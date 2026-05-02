export default function MyButton (
	{
		type="button"
		, children
//		, text = "Press"
		, action = "default"
		, style = ""
		, ...props
	}, reference
) {
	return (
		<button
			type={ type }
			ref={ reference }
			className={ `${style}` }
			{...props}
		>
			{ children }
		</button>
	);
}