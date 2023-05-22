import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '../../../lib/prismadb';

interface IParams {
	likeId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();
	if (!currentUser) return NextResponse.error();

	const { likeId } = params;
	if (!likeId || typeof likeId !== 'string') throw new Error('invalid like id');

	const like = await prisma.like.deleteMany({
		where: {
			id: likeId,
			userId: currentUser.id,
		},
	});

	return NextResponse.json(like);
}
