import { useId, forwardRef } from "react";

/*
### forwardRef is deprecated, use ref instead ###

const MyInput = forwardRef (
	(
		{...props}
		, ref
	) => {
		return <input {...props} ref={ref} />;
	}
);

is changed to ...

const MyInput = (
	{
		{...props }
		, ref
	}
) => {
	return <input {...props} ref={ref} />;
};
*/

export default function MyInput (
	{
		label
		, type = "text"
		, styles = ""
		, ...props
	}
	, reference
) {
	const id = useId();

	return (
		<div className="w-full">
			{
				label && <label
					className={"inline-block mb-1 pl-1"}
					htmlFor={ id }
				>
					{ label }
				</label>
			}
			<input
				type={ type }
				className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${ styles }`}
				ref={ reference }
				id={ id }
				{...props}
			/>
		</div>
	);
}