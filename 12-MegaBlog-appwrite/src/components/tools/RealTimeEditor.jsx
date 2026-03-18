import { useRef } from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

export default function RealTimeEditor (
	{
		name
		, control
		, label
		, default_value = ""
	}
) {
	const editor_reference = useRef (null);

	const log = () => {
		if (editor_reference.current) {
			console.log (editor_reference.current.getContent());
		}
	};

	return (
		<div className="w-full">
			{ label && <label className="inline-block mb-1 pl-1">{ label }</label> }
			<Controller
				name={ name && "content" }
				control={control}
				render={({field: {onChange}}) => (
					<Editor
						onInit={(event, editor) => editor_reference.current = editor}
						initialValue="<p>This is the initial content of the editor.</p>"
						init={{
							height: 500
							, menubar: false
							, plugins: [
'advlist autolink lists link image charmap print preview anchor'
, 'searchreplace visualblocks code fullscreen'
, 'insertdatetime media table paste code help wordcount'
							]
							, toolbar: 'undo redo | formatselect | '
+ 'bold italic backcolor | alignleft aligncenter '
+ 'alignright alignjustify | bullist numlist outdent indent | '
+ 'removeformat | help'
							, content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
						}}
						onEditorChange={onChange}
					/>
				)}
			/>
		</div>
	);
}


/*

	return (
		<>
			<Editor
				onInit={(event, editor) => editor_reference.current = editor}
				initialValue="<p>This is the initial content of the editor.</p>"
				init={{
					height: 500
					, menubar: false
					, plugins: [
'advlist autolink lists link image charmap print preview anchor'
, 'searchreplace visualblocks code fullscreen'
, 'insertdatetime media table paste code help wordcount'
					]
					, toolbar: 'undo redo | formatselect | '
+ 'bold italic backcolor | alignleft aligncenter '
+ 'alignright alignjustify | bullist numlist outdent indent | '
+ 'removeformat | help'
					, content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
				}}
			/>
			<button onClick={log}>Log editor content</button>
		</>
	);

*/