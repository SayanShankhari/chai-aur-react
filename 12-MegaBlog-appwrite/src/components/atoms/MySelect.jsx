export default function MySelect (
	{
		options = []
		, label
		, styles = ""
		, ...props
	}
	, reference
) {
	const id = useId (null);

	return (
		<div className="w-full">
			{ label && <label
				htmlFor={ id }
				className=""
			>
				{ label }
			</label> }
			<select
				name=""
				id={ id }
				ref={ reference }
				className={`px-3 py-2 rounded-lg bg-white text-black outline-none fucus:bg-gray-50 duration-200 border border-gray-200 w-full ${ styles }`}
			>
				{
					options?.map (
						(opt) => {
							<option
								key={opt}
								value={opt}
							>
								{ opt }
							</option>
						}
					)
				}
			</select>
		</div>
	);
}