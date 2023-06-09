import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '../../../lib/prismadb';

interface IParams {
	commentId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();
	if (!currentUser) return NextResponse.error();

	const { commentId } = params;
	if (!commentId || typeof commentId !== 'string')
		throw new Error('invalid comment id');

	const comment = await prisma.comment.deleteMany({
		where: {
			id: commentId,
			userId: currentUser.id,
		},
	});

	return NextResponse.json(comment);
}
