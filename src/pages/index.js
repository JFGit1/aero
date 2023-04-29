import Seo from '@/components/Seo';
import { Footer } from '@/components/Footer';
import LayoutMotion from '@/components/LayoutMotion';
import Overlay from '@/components/BlogOverlay';
import apolloClient from '@/services/apollo-client';
import { ALL_POSTS } from '@/services/graphql/queries';

export default function Home({ allPosts }) {
	const renderPosts = () => {
		return allPosts.map(post => {
			console.log('post:', post.title);
			return <Overlay key={post.databaseId} post={post} />;
		});
	};

	return (
		<>
			<Seo title='Aero Design' desc='Content of the homepage.' />
			<LayoutMotion>
				<main className='container mx-auto pt-24'>
					<h1 className='mb-4 flex items-center text-3xl'>Welcome</h1>

					<div className='grid grid-cols-3 gap-8'>{renderPosts()}</div>
				</main>
				<Footer />
			</LayoutMotion>
		</>
	);
}

export async function getServerSideProps(context) {
	const { data } = await apolloClient.query({
		query: ALL_POSTS,
	});

	return {
		props: {
			allPosts: data.posts.nodes,
		},
	};
}
