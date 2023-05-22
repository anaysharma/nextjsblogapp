import { NextResponse } from 'next/server';
import prisma from '../../lib/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(req: Request) {
	const currentUser = await getCurrentUser();
	if (!currentUser) return null;

	const body = await req.json();
	const { text, blogId } = body;
	const comment = await prisma.comment.create({
		data: {
			text,
			blogId,
			userId: currentUser.id,
			userName: currentUser.name,
		},
	});

	return NextResponse.json(comment);
}
