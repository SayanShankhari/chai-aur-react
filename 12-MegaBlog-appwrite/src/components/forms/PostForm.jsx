import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MyButton, MyInput, MySelect } from "../atoms";
import { RealTimeEditor } from "../organisms";
import { DatabaseService } from "../../services";

export default function PostForm ({ post }) {
	const { register, handleSubmit, watch, setValue, control, getValues } = useForm (
		{
			defaultValues: {
				title: post?.title || ""
				, slug: post?.slug || ""
				, content: post?.content || ""
				, status: post?.status || "active"
			}
		}
	);

	const navigate = useNavigate ();
	const user_data = useSelector (state => state.user_data);

	async function submit (data) {
		if (post) {
			data.image[0] ? DatabaseService.uploadFile (data.image[0]) : null;

			if (file) {
				DatabaseService.deleteFile (post.image);
			}

			const db_post = await DatabaseService.updatePost (
				post.$id
				, {
					...data
					, image_id: file ? file.$id : undefined
				}
			);

			if (db_post) {
				navigate (`/post/${db_post.$id}`);
			}
		} else {
			// TODO: improve this
			const file = await DatabaseService.uploadFile (data.image[0]);

			const file_id = file.$id;
			data.image_id = file_id;

			const db_post = await DatabaseService.createPost (
				{
					...data
					, user_id: user_data.$id
				}
			);

			if (db_post) {
				navigate (`/post/${db_post.$id}`);
			}
		}
	}

	const slugTransform = useCallback ((value) => {
		if (value && typeof (value) === "string") {
			const slug = value.toLowerCase().replace(/ /g, "-");
			setValue ("slug", slug);
			//return slug;

			return value
				.trim()
				.toLowerCase()
				.replace(/^[a-zA-Z\d\s]+/g, "-")
				.replace(/\s/g, "-");
		}

		return ""; // else part, for all other cases
	}, []);

	useEffect (() => {
		const subscription = watch ((value, { name }) => {
			if (name === "title") {
				setValue ("slug", slugTransform (value.title, { shuldValidate: true }));
			}
		});

		return (() => { subscription.unsubscribe(); })
	}, [watch, slugTransform, setValue]);

	function submit () {

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
					className="mb-4"
					{
						...register ("title", {
							required: "Title is required"
						})
					}
				/>
				<MyInput
					label="Slug:"
					placeholder="slug"
					className="mb-4"
					{...register ("slug", {
						required: "Slug is required."
					})}
					onInput={(event) => {
						setValue ("slug", slugTransform (event.currentTarget.value), { shouldValidate: true });
					}}
				/>
				{/* <RealTimeEditor
					label="Content:"
					name="content"
					control={control}
					default_value={ getValues ("content") }
				/> */}
			</div>
			<div className="w-1/3 px-2">
				<MyInput
					label="Image:"
					type="file"
					className="mb-4"
					accept="image/png, image/jpg, image/jpeg, image.gif"
					{...register ("image", {
						required: !post
					})}
				/>
				{ post && (
					<div className="w-full mb-4">
						<img
							src={
								DatabaseService.getFilePreview (post.image_id)
							}
							alt={ post.title }
							className="rounded-lg"
						/>
						<MySelect
							options={["active", "inactive"]}
							label="Status:"
							className="mb-4"
							{...register ("status", {
								required: "Status is required."
							})}
						/>
						<MyButton
							type="submit"
							bgColor={ post ? "bg-green-500" : undefined }
							className="w-full"
						>
							{ post ? "Update" : "Submit" }
						</MyButton>
					</div>
				)}
			</div>
		</form>
	);
}