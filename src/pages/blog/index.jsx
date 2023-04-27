import Link from 'next/link';

import Seo from '@/components/Seo';
import { Footer } from '@/components/Footer';
import LayoutMotion from '@/components/LayoutMotion';

import { ALL_POSTS } from '@/services/graphql/queries';
import apolloClient from '@/services/apollo-client';

export default function Blog({ AllPostsPage }) {
	// console.log('AllPostsPage:', AllPostsPage);
	return (
		<>
			<Seo title='Blog | Aero Design' description='This is the Blog page' />
			<LayoutMotion>
				<main className='container mx-auto pt-24'>
					<div>
						<h1 className='mb-4 text-3xl'>Blog</h1>

						{console.log(AllPostsPage)}
						{AllPostsPage?.map(postItem => {
							return (
								<div key={postItem.databaseId}>
									<h4>
										<Link
											href={`/blog/${postItem.uri}`}
											scroll={false}
											className='mb-2 block text-black hover:text-blue-600'>
											{postItem.title}
										</Link>
									</h4>
								</div>
							);
						})}
					</div>
				</main>
				<Footer />
			</LayoutMotion>
		</>
	);
}

export async function getStaticProps(context) {
	const { data } = await apolloClient.query({
		query: ALL_POSTS,
	});

	return {
		props: {
			AllPostsPage: data.posts.nodes,
		},
		revalidate: 60, // In seconds
	};
}
