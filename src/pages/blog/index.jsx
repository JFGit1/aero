import Link from 'next/link';
import Image from 'next/image';

import Seo from '@/components/Seo';
import { Footer } from '@/components/Footer';
import LayoutMotion from '@/components/LayoutMotion';

import { ALL_POSTS } from '@/services/graphql/queries';
import apolloClient from '@/services/apollo-client';
import SetHTML from '@/components/SetHTML';

export default function Blog({ AllPostsPage }) {
	console.log('AllPostsPage:', AllPostsPage);
	return (
		<>
			<Seo title='Blog | Aero Design' description='This is the Blog page' />
			<LayoutMotion>
				<main className='container mx-auto pt-24'>
					<h1 className='mb-4 text-3xl'>Blog</h1>

					<div className='grid grid-cols-3 gap-8'>
						{AllPostsPage?.map(postItem => {
							return (
								<div
									className='relative flex flex-col justify-between'
									key={postItem.databaseId}>
									<div>
										<Link
											href={`/blog${postItem.uri}`}
											scroll={false}
											className='mb-2 block text-black transition-all hover:text-blue-600'>
											<Image
												src={postItem.featuredImage.node.sourceUrl}
												height={
													postItem.featuredImage.node.mediaDetails
														.height
												}
												width={
													postItem.featuredImage.node.mediaDetails
														.width
												}
												alt={postItem.featuredImage.node.title}
												className='mb-3 h-auto w-full'
											/>
											<h4 className='mb-2 text-lg font-medium leading-6'>
												{postItem.title}
											</h4>
										</Link>
										<SetHTML
											content={postItem.excerpt}
											className={`inner-line-clamp-3`}
										/>
									</div>
									<Link
										href={`/blog${postItem.uri}`}
										scroll={false}
										className='inline-flex max-w-max rounded-md border border-black px-2 py-1 font-medium text-black transition-all hover:border-blue-600 hover:text-blue-600'>
										Read more
									</Link>
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
