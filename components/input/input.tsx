'use client';

import React from 'react';

interface InputProps {
	type: any;
	value: any;
	onChange?: (
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => void;
	name: string;
	id: string;
	placeholder?: string;
	big?: boolean;
}

export default function Input({
	type,
	value,
	onChange,
	name,
	id,
	placeholder,
	big,
}: InputProps) {
	return big ? (
		<textarea
			className="w-full px-4 py-3 rounded border"
			rows={14}
			value={value}
			onChange={onChange}
			name={name}
			id={id}
			placeholder={placeholder}
		></textarea>
	) : (
		<input
			className="w-full px-4 py-3 rounded border"
			type={type}
			value={value}
			onChange={onChange}
			name={name}
			id={id}
			placeholder={placeholder}
		/>
	);
}
