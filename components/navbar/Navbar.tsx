'use client';

import { SafeUser } from '@/types';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

interface UserMenuProps {
	currentUser: SafeUser | null;
}

export default function Navbar({ currentUser }: UserMenuProps) {
	return (
		<header className="fixed top-0 h-14 shadow-md w-screen bg-white">
			<nav className="flex justify-between w-full h-full items-center px-10">
				<div className="flex flex-col justify-center">
					<div className="capitalize font-medium">{currentUser?.name}</div>
					<span className="text-xs text-gray-500">{currentUser?.email}</span>
				</div>
				<div className="flex gap-10">
					<Link href="/">Home</Link>
					<Link href="/create">Create</Link>
					{currentUser ? (
						<button onClick={() => signOut()}>sign out</button>
					) : (
						<>
							<Link href="/register">register</Link>
							<Link href="/login">login</Link>
						</>
					)}
				</div>
			</nav>
		</header>
	);
}
