import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MyButton, MyInput, MySelect } from "../atoms";
import { RealTimeEditor } from "../organisms";
import { DatabaseService, StorageService } from "../../services";
import { PostModel } from "../../models";
import defaultBanner from "../../assets/file_upload.svg";
import { slugTransform, toPostModel } from "../../utils";
import { usePosts } from "../../hooks";

export default function PostForm (existing_post) {
	// const navigate = useNavigate ();
	const user_data = useSelector (state => state.user_data);
	const [ bannerPreview, setBannerPreview ] = useState (defaultBanner);
	const [ post, setPost ] = useState (toPostModel (existing_post));

	const {
		posts
		, postIds
		, createPost
		, receivePosts
		, updatePost
		, upsertPost
		, deletePost
		, getPostById
	} = usePosts (toPostModel (existing_post));

	const {
		register
		, handleSubmit
		, watch
		, setValue
		, control
		, getValues
		, reset
	} = useForm (
		{
			defaultValues: toPostModel (existing_post)
		}
	);

	// in case existing_post delayed loading
	useEffect (() => {
		if (existing_post) {
			setPost (toPostModel (existing_post));
			reset (toPostModel (existing_post));
		}
	}, [ existing_post, reset ]);



	// pure function slugTransform removed from dependency array to keep single reference
	// static referenced watch & setValue are kept in dependency array for exhaustive deps rule
	useEffect (() => {
		const subscription = watch ((value, { name }) => {
			if (name === "title") {
				setValue ("slug", slugTransform (value.title), { shuldValidate: true });
			}
		});

		return (() => { subscription.unsubscribe(); })
	// }, [ watch, slugTransform, setValue ]);
	}, [ watch, setValue ]);

	const bannerFile = watch ("banner");

	useEffect (() => {
		if (!bannerFile || bannerFile.length === 0) {
			setBannerPreview (defaultBanner);
			return;
		}

        // Handle both FileList (from native input) and single File object
        const file = bannerFile[0] || bannerFile;
        const objectUrl = URL.createObjectURL (file);
        setBannerPreview (objectUrl);

        // Cleanup: Important to prevent memory leaks
        return () => URL.revokeObjectURL (objectUrl);
	}, [ bannerFile ]);

	async function submit (form_data) {
		setPost (toPostModel (form_data));

		if (existing_post) {
			updatePost (post);

			// form_data.banner [0] ? StorageService.uploadFile (form_data.banner [0]) : null;

			// if (file) {
			// 	StorageService.deleteFile (post.image);
			// }

			// const db_post = await DatabaseService.updatePost (
			// 	post.$id
			// 	, {
			// 		...form_data
			// 		, banner: file ? file.$id : undefined
			// 	}
			// );

			// if (db_post) {
			// 	navigate (`/post/${db_post.$id}`);
			// }
		} else {
			createPost (post);
			// TODO: improve this
			// const file = await StorageService.uploadFile (form_data.image[0]);

			// const file_id = file.$id;
			// form_data.banner = file_id;

			

			// const db_post = await DatabaseService.createPost (
			// 	{
			// 		...form_data
			// 		, user_id: user_data.$id
			// 	}
			// );

			// if (db_post) {
			// 	navigate (`/post/${db_post.$id}`);
			// }
		}
	}

	return (
		<form
			onSubmit={ handleSubmit (submit) }
			className="flex flex-wrap"
		>
			<div className="w-2/3 px-2">
				<MyInput
					label="Title: "
					placeholder="Title"
					style="mb-4"
					{
						...register ("title", {
							required: "Title is required"
						})
					}
				/>
				<MyInput
					label="Slug:"
					placeholder="slug"
					style="mb-4"
					{...register ("slug", {
						required: "Slug is required."
					})}
					onInput={(event) => {
						setValue ("slug", slugTransform (event.currentTarget.value), { shouldValidate: true });
					}}
				/>
				<RealTimeEditor
					label="Content:"
					name="content"
					control={control}
					default_value={ getValues ("content") }
				/>
			</div>
			<div className="w-1/3 px-2">
				<MyInput
					label="Banner:"
					type="file"
					style="mb-4 block w-full text-sm text-gray-500
						file:mr-4 file:py-2 file:px-4
						file:rounded-full file:border-0
						file:text-sm file:font-semibold
						file:bg-blue-50 file:text-blue-700
						hover:file:bg-blue-100"
					accept="image/png, image/jpg, image/jpeg, image.gif"
					{...register ("banner", {
						required: !post
						, validate: {
							lessThan1MB: (files) => (
								!files[0]
								|| files[0].size < 1024 * 1024
								|| "Max size is 1MiB"
							)
							, acceptedFormats: (files) => (
								!files[0]
								|| ['image/jpeg', 'image/png', 'image/jpg'].includes(files[0].type)
								|| "Only JPEG, JPG, and PNG are allowed"
							)
						}
					})}
				/>
				<div className="w-80 h-45 border-4 border-dashed border-gray-500 rounded-xl">
					<img
						src={ bannerPreview }
						alt={ post?.title || "Default Banner" }
						className="w-full h-full rounded-lg border-dashed divide-indigo-500"
					/>
				</div>
			</div>
			<MyButton
				type="submit"
				// style={ post ? "bg-green-500" : undefined }
				style="w-full mt-2 bg-orange-500"
			>
				Save
				{/* { existing_post ? "Update" : "Submit" } */}
			</MyButton>
		</form>
	);
}