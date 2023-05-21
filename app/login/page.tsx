'use client';

import Input from '@/components/input/input';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

interface InitialStateProps {
	email: string;
	password: string;
}

const initialState: InitialStateProps = {
	email: '',
	password: '',
};

export default function page() {
	const [state, setState] = useState<InitialStateProps>(initialState);
	const router = useRouter();

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		signIn('credentials', {
			...state,
			redirect: false,
		}).then((callback) => {
			if (callback?.ok) router.refresh();
			if (callback?.error) throw new Error('wrong credentials');
		});
		router.push('/');
	};

	return (
		<div className="h-screen w-screen grid place-items-center">
			<form
				className="rounded border shadow-lg p-6 w-96 flex flex-col items-center gap-6"
				action=""
				onSubmit={handleSubmit}
			>
				fill in details to login
				<div className="flex flex-col gap-4 w-full">
					<Input
						name="email"
						placeholder="Email"
						id="email"
						type="email"
						onChange={handleChange}
						value={state.email}
					></Input>
					<Input
						name="password"
						placeholder="Password"
						id="password"
						type="password"
						onChange={handleChange}
						value={state.password}
					></Input>
				</div>
				<button
					className="px-10 py-3 bg-teal-600 rounded text-white"
					type="submit"
				>
					Login
				</button>
				<div>
					<div>
						Don't have an account yet?{' '}
						<Link className="text-teal-600" href="/register">
							register
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
}
