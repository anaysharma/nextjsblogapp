import prisma from '../lib/prismadb';

export default async function getComments(blogId: string | undefined) {
	if (!blogId) return null;
	try {
		const comments = await prisma.comment.findMany({
			where: {
				blogId,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
		return comments;
	} catch (err: any) {
		throw new Error(err);
	}
}
