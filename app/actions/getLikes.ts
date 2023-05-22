import prisma from '../lib/prismadb';

export default async function getBlogs(blogId: string) {
	try {
		const likes = await prisma.like.findMany({
			where: {
				blogId,
			},
		});

		return likes.length;
	} catch (err: any) {
		throw new Error(err);
	}
}
