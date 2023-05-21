import getCurrentUser from './actions/getCurrentUser';
import getBlogs from './actions/getBlogs';
import BlogCard from '@/components/blogCard/BlogCard';
export default async function Home() {
	const currentUser = await getCurrentUser();
	const blogs = await getBlogs();

	return (
		<main className="w-screen flex flex-col items-center mt-20">
			<div className="grid grid-cols-2 max-w-[1000px] gap-4">
				{blogs.map((item) => (
					<BlogCard data={item} key={item.id} currentUser={currentUser} />
				))}
			</div>
		</main>
	);
}
