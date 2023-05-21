import prisma from '../../../lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handleIncrement(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { blogId } = req.query;
	const { field } = req.query;

	try {
		const blog = await prisma.blog.update({
			where: { id: blogId as string },
			data: { [field]: { increment: 1 } },
		});

		res.status(200).json(blog);
	} catch (error) {
		console.error('Error incrementing field:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
}
