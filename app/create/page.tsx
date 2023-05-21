'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Input from '@/components/input/input';
import ImageUpload from '@/components/imageUpload';

interface StateProps {
	name?: string;
	imageSrc: string;
	description: string;
}

const initialState: StateProps = {
	name: '',
	imageSrc: '',
	description: '',
};

export default function page() {
	const [state, setState] = useState<StateProps>(initialState);
	const router = useRouter();

	const onSubmit = (event: FormEvent) => {
		event.preventDefault();

		axios
			.post('/api/blogs', state)
			.then(() => {
				router.push('/');
			})
			.catch(console.error);

		router.refresh();
	};

	function handleChange(
		event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) {
		setState({ ...state, [event.target.name]: event.target.value });
	}

	const setCustomValue = (id: any, value: any) => {
		setState((prevValues) => ({
			...prevValues,
			[id]: value,
		}));
	};

	return (
		<form
			onSubmit={onSubmit}
			className="flex mx-auto w-full pt-28 px-[10vw] gap-10"
		>
			<div className="flex-1">
				<ImageUpload
					value={state.imageSrc}
					onChange={(value) => setCustomValue('imageSrc', value)}
				/>
			</div>

			<div className="flex flex-col gap-6 flex-1">
				<Input
					placeholder="Blog Heading"
					id="name"
					type="text"
					value={state.name}
					name="name"
					onChange={handleChange}
				/>
				<Input
					big
					placeholder="Blog content or description"
					id="description"
					type="text"
					value={state.description}
					name="description"
					onChange={handleChange}
				/>
				<button
					className="ml-auto px-10 py-3 bg-teal-600 text-white rounded"
					type="submit"
				>
					Submit
				</button>
			</div>
		</form>
	);
}
