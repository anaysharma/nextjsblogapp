'use client';

import Input from '@/components/input/input';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface InitialStateProps {
	name: string;
	email: string;
	password: string;
}

const initialState: InitialStateProps = {
	name: '',
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
		axios
			.post('/api/register', state)
			.then(() => {
				router.refresh();
			})
			.then(() => {
				setTimeout(() => {
					router.push('/login');
				}, 2500);
			})
			.catch(console.error);
	};

	return (
		<form action="" onSubmit={handleSubmit}>
			<div>
				<Input
					name="name"
					placeholder="Name"
					id="name"
					type="text"
					onChange={handleChange}
					value={state.name}
				></Input>
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
			<button type="submit"></button>
			<div>
				<div>
					Already have an account? <Link href="/login">Login</Link>
				</div>
			</div>
		</form>
	);
}
