import getCurrentUser from '@/app/actions/getCurrentUser';
import getBlogsById from '@/app/actions/getBlogsById';
import BlogId from '@/components/BlogId';
import getComments from '@/app/actions/getComments';

interface IParams {
	blogId: string;
}

export default async function page({ params }: { params: IParams }) {
	const blog = await getBlogsById(params);
	const currentUser = await getCurrentUser();
	const comments = await getComments(blog?.id);

	const date = blog?.createdAt;
	const date2 = new Date(date ?? 2023).toDateString();

	return (
		<div className="">
			<div>
				<BlogId
					name={blog?.name}
					description={blog?.description}
					blogId={blog?.id}
					imageSrc={blog?.imageSrc}
					currentUser={currentUser?.id}
					userId={blog?.user.id}
					// likes={blog?.likes.length}
					comments={comments}
				/>
			</div>
		</div>
	);
}
