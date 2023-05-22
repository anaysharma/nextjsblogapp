import getCurrentUser from '@/app/actions/getCurrentUser';
import getBlogsById from '@/app/actions/getBlogsById';
import BlogId from '@/components/BlogId';
import getComments from '@/app/actions/getComments';
import getLikes from '@/app/actions/getLikes';

interface IParams {
	blogId: string;
}

export default async function page({ params }: { params: IParams }) {
	const blog = await getBlogsById(params);
	const currentUser = await getCurrentUser();
	const comments = await getComments(blog?.id);
	const likes = await getLikes(blog?.id);

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
					likes={likes}
					comments={comments}
				/>
			</div>
		</div>
	);
}
