export default function MyButton (
	{
		type="button"
		, children
//		, text = "Press"
		, action = "default"
		, styles = ""
		, ...props
	}, reference
) {
	const action_styles = {
		default: "text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
		, signup: "text-white bg-dark box-border border border-transparent hover:bg-dark-strong focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
		, signin: "text-white bg-success box-border border border-transparent hover:bg-success-strong focus:ring-4 focus:ring-success-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
		, signout: "text-white bg-warning box-border border border-transparent hover:bg-warning-strong focus:ring-4 focus:ring-warning-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
	}

	return (
		<button
			type={ type }
			ref={ reference }
			className={ `${styles} ${action_styles [action]}` }
			{...props}
		>
			{ children }
		</button>
	);
}