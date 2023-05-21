'use client';

import { SafeUser, safeBlogs } from '@/types';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface BlogProps {
	key: string;
	data: safeBlogs;
	currentUser?: SafeUser | null;
}

export default function BlogCard({ data, key, currentUser }: BlogProps) {
	const router = useRouter();

	const onDelete = () => {
		axios
			.delete(`/api/blogs/${data.id}`)
			.then(() => {
				router.refresh();
			})
			.catch((error) => {
				throw new Error(error);
			})
			.finally(() => {
				router.push('/');
			});
	};

	return (
		<div className="p-4 border shadow-md rounded">
			<div className="flex gap-4">
				<div className="aspect-square rounded w-400 overflow-hidden">
					<Image
						className="h-full object-cover"
						width={200}
						height={100}
						alt="blog header image"
						src={data.imageSrc}
					/>
				</div>
				<div>
					<h1 className="font-medium text-xl pb-2">{data.name}</h1>
					<p className="text-sm text-gray-600">
						{data.description.slice(0, 100)}
					</p>
					{data.userId === currentUser?.id && (
						<div className="flex gap-4 justify-end">
							<button
								onClick={() => router.push(`/blogs/${data.id}`)}
								className="px-3 py-1 rounded text-white bg-teal-600"
							>
								edit
							</button>
							<button
								className="px-3 py-1 rounded text-white bg-red-500"
								onClick={onDelete}
							>
								delete
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
