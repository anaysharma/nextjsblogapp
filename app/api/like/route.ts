import { NextResponse } from 'next/server';
import prisma from '../../lib/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(req: Request) {
	const currentUser = await getCurrentUser();
	if (!currentUser) return null;

	const body = await req.json();
	const { blogId } = body;

	const like = await prisma.like.create({
		data: {
			blogId,
			userId: currentUser.id,
		},
	});

	return NextResponse.json(like);
}
