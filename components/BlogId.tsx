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
	likes?: number;
	dislikes?: number;
}

interface InitalStateProps {
	name: string;
	description: string;
	imageSrc: string;
}

const initialState: InitalStateProps = {
	name: '',
	description: '',
	imageSrc: '',
};

export default function BlogId({
	name,
	description,
	imageSrc,
	blogId,
	userId,
	currentUser,
	likes,
	dislikes,
}: BlogProps) {
	const router = useRouter();

	const [onActive, setOnActive] = useState(false);
	const [state, setState] = useState(initialState);

	const handleLike = () => {
		axios
			.put(`/api/blogs/${blogId}/increment?field=likes`)
			.then(() => {
				router.refresh();
			})
			.catch((error) => {
				console.error('Error incrementing likes:', error);
			});
	};

	const handleDislike = () => {
		axios
			.put(`/api/blogs/${blogId}/increment?field=dislikes`)
			.then(() => {
				router.refresh();
			})
			.catch((error) => {
				console.error('Error incrementing dislikes:', error);
			});
	};

	function handleChange(
		event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) {
		setState({ ...state, [event.target.name]: event.target.value });
	}

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
					<button onClick={handleLike} className="px-8 py-2 border rounded">
						like ({likes})
					</button>
					<button onClick={handleDislike} className="px-8 py-2 border rounded">
						dislike ({dislikes})
					</button>
					<button className="px-8 py-2 border rounded">comment</button>
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
