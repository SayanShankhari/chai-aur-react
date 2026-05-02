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
						apiKey='rd2x5swhl8d720lk98um0mbsb05t3zonu4c8j9su35bvi03a'
						onInit={(event, editor) => editor_reference.current = editor}
						init={{
							height: 500
							, menubar: false
							, plugins: [
								// Core plugins
								'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount'
								// trial of TinyMCE premium features
								//, 'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'ai', 'uploadcare', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'

// 'advlist autolink lists link image charmap print preview anchor'
// , 'searchreplace visualblocks code fullscreen'
// , 'insertdatetime media table paste code help wordcount'
							]
							, toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat'
							, tinycomments_mode: 'embedded'
							, tinycomments_author: 'Author name'
							, mergetags_list: [
								{ value: 'First.Name', title: 'First Name' }
								, { value: 'Email', title: 'Email' }
							]
							, ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant'))
							, uploadcare_public_key: 'eccf98583d35c8387c84'
							, content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
						}}
						initialValue="<p>Welcome to TinyMCE!</p>"
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