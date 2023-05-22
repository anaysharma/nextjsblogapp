import prisma from '../lib/prismadb';

export default async function getLikes(blogId: string | undefined) {
	if (!blogId) return null;
	try {
		const likes = await prisma.like.findMany({
			where: {
				blogId,
			},
		});

		return likes;
	} catch (err: any) {
		throw new Error(err);
	}
}
