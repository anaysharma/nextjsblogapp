'use client';

import { SafeUser } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface BlogProps {
	key: string;
	data: {
		id: string;
		name: string;
		imageSrc: string;
		description: string;
	};
}

export default function BlogCard({ data, key }: BlogProps) {
	return (
		<Link className="p-4 border shadow-md rounded" href={`/blogs/${data.id}`}>
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
				</div>
			</div>
		</Link>
	);
}
