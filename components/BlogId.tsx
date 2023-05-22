'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import Image from 'next/image';
import ImageUpload from './imageUpload';
import Input from './input/input';

interface BlogProps {
	name?: string;
	description?: string;
	imageSrc?: any;
	blogId?: string;
	userId?: string;
	currentUser?: string;
	comments?: any;
}

interface InitalStateProps {
	name?: string;
	description?: string;
	imageSrc: string;
}

export default function BlogId({
	name,
	description,
	imageSrc,
	blogId,
	userId,
	currentUser,
	comments,
}: BlogProps) {
	const router = useRouter();
	const [commentActive, setCommentActive] = useState<boolean>(false);
	const [comment, setComment] = useState({ text: '', blogId });
	const [onActive, setOnActive] = useState(false);
	const [state, setState] = useState<InitalStateProps>({
		name,
		description,
		imageSrc,
	});

	const handleComment = (
		event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => {
		setComment({ text: event.target.value, blogId });
	};

	const handleChange = (
		event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => {
		setState({ ...state, [event.target.name]: event.target.value });
	};

	const onSubmit = (event: FormEvent) => {
		event.preventDefault();
		axios
			.put(`/api/blogs/${blogId}`, state)
			.then(() => {
				router.refresh();
			})
			.catch((err) => {
				throw new Error(err);
			})
			.finally(() => {
				router.push('/');
			});
	};

	const onDelete = (event: FormEvent) => {
		event.preventDefault();
		axios
			.delete(`/api/blogs/${blogId}`)
			.then(() => {
				router.refresh();
			})
			.catch((err) => {
				throw new Error(err);
			})
			.finally(() => {
				router.push('/');
			});
	};

	const deleteComment = (id: string) => {
		axios
			.delete(`/api/comment/${id}`)
			.then(() => {
				router.refresh();
			})
			.catch(console.error);
	};

	const handleCommentSubmit = (event: FormEvent) => {
		event.preventDefault();

		axios
			.post('/api/comment', comment)
			.then(() => {
				router.refresh();
			})
			.catch(console.error);
	};

	const setCustomValue = (id: any, value: any) => {
		setState((prevValues) => ({
			...prevValues,
			[id]: value,
		}));
	};

	return (
		<div className="flex flex-col gap-4 mt-20 w-[800px] mx-auto">
			<div className="h-96 overflow-hidden rounded">
				<Image
					className="w-full"
					src={imageSrc}
					width={400}
					height={400}
					alt="Image"
				/>
			</div>

			<div className="">
				<h1 className="text-2xl font-bold">{name}</h1>
			</div>

			<div>
				<p>{description}</p>
			</div>

			<div className="flex justify-between">
				<div className="flex gap-4">
					<button onClick={() => {}} className="px-8 py-2 border rounded">
						like ({0})
					</button>
					<button
						className="px-8 py-2 border rounded"
						onClick={() => setCommentActive(!commentActive)}
					>
						comment
					</button>
				</div>

				{userId === currentUser && (
					<div className="flex gap-4">
						<button
							onClick={() => setOnActive(!onActive)}
							className="px-8 py-2 bg-teal-600 rounded text-white"
						>
							Edit
						</button>
						<button
							className="px-8 py-2 bg-red-500 rounded text-white"
							onClick={onDelete}
						>
							Delete
						</button>
					</div>
				)}
			</div>

			{commentActive && (
				<form
					className="flex gap-4 p-4 bg-gray-50 border shadow-md"
					action=""
					onSubmit={handleCommentSubmit}
				>
					<Input
						placeholder="type your comment"
						id="comment"
						type="text"
						value={comment.text}
						name="commnet"
						onChange={handleComment}
					/>
					<button
						className="px-9 py-2 bg-teal-600 rounded text-white"
						type="submit"
					>
						Done
					</button>
				</form>
			)}

			<div className="flex flex-col gap-4">
				{comments?.map((item: any) => (
					<div className="rounded bg-gray-50 p-4 border">
						<div className="flex justify-between border-b border-gray-500 items-center">
							<span className="text-sm text-gray-600">{item.userName}</span>
							<button
								className="text-sm text-red-500"
								type="button"
								onClick={() => deleteComment(item.id)}
							>
								delete
							</button>
						</div>
						<p className="pt-2">{item.text}</p>
					</div>
				))}
			</div>

			{onActive && (
				<div className="fixed top-0 left-0 bg-gray-200/90 grid place-items-center w-screen px-[10vw] h-screen">
					<form
						className="flex bg-gray-100 shadow-xl w-full gap-8 rounded border p-8"
						onSubmit={onSubmit}
					>
						<div className="flex-1 bg-gray-50">
							<ImageUpload
								value={state.imageSrc}
								onChange={(value) => setCustomValue('imageSrc', value)}
							/>
						</div>
						<div className="flex-1 flex gap-4 flex-col">
							<Input
								placeholder="Name"
								id="name"
								type="text"
								value={state.name}
								name="name"
								onChange={handleChange}
							/>
							<Input
								big
								placeholder="Description"
								id="description"
								type="text"
								value={state.description}
								name="description"
								onChange={handleChange}
							/>
							<div className="flex gap-4 justify-end">
								<button
									type="button"
									className="px-10 py-3 bg-red-500 text-white rounded"
									onClick={() => setOnActive(!onActive)}
								>
									Cancel
								</button>
								<button
									type="submit"
									className="px-10 py-3 bg-teal-600 rounded text-white"
								>
									Submit
								</button>
							</div>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}
