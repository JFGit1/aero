import Seo from '@/components/Seo';
import { Footer } from '@/components/Footer';
import LayoutMotion from '@/components/LayoutMotion';
import apolloClient from '@/services/apollo-client';
import { ALL_POSTS } from '@/services/graphql/queries';
import React, { useState, useEffect } from 'react';

const LazyOverlay = React.lazy(() => import('@/components/BlogOverlay'));

export default function Home({ allPosts }) {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		setPosts(allPosts);
	}, [allPosts]);

	const handleIntersection = post => {
		const { intersectionRatio } = post.target;
		console.log('handleIntersection');

		if (intersectionRatio > 0) {
			post.target.classList.remove('lazy');
		}
	};

	const renderPosts = () => {
		return posts.map(post => {
			// console.log('post:', post.title);
			return (
				<div key={post.databaseId} className='lazy'>
					<React.Suspense fallback={<div>Loading...</div>}>
						<LazyOverlay post={post} />
					</React.Suspense>
				</div>
			);
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

export async function getStaticProps() {
	const { data } = await apolloClient.query({
		query: ALL_POSTS,
	});

	return {
		props: {
			allPosts: data.posts.nodes,
		},
		revalidate: 10, // In seconds
	};
}
