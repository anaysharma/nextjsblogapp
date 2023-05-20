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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
	};

	return (
		<form action="" onSubmit={handleSubmit}>
			<div>
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
			<button type="submit">Login</button>
			<div>
				<div>
					Don't have an account yet? <Link href="/register">Login</Link>
				</div>
			</div>
		</form>
	);
}
