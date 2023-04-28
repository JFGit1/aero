import Link from 'next/link';

import Seo from '@/components/Seo';
import { Footer } from '@/components/Footer';
import LayoutMotion from '@/components/LayoutMotion';

import apolloClient from '@/services/apollo-client';
import { ALL_CATEGORY_PATH, CATEGORY_PAGE } from '@/services/graphql/queries';

export default function CategoryPage({ CategoryPage }) {
	// console.log(CategoryPage);
	return (
		<>
			<Seo title='Blog | Aero Design' description='This is the Blog page' />
			<LayoutMotion>
				<main className='container mx-auto pt-24'>
					<h5 className='mb-2 text-base font-bold uppercase tracking-[0.5rem]'>
						Blog
					</h5>
					<h1 className='mb-4 text-3xl'>{CategoryPage.name}</h1>
					{CategoryPage.posts?.nodes.map(categoryItem => {
						return (
							<div key={categoryItem.databaseId}>
								<h4>
									<Link
										href={`${CategoryPage.slug}/${categoryItem.slug}`}
										scroll={false}
										className='mb-2 block text-black transition-all hover:text-blue-600'>
										{categoryItem.title}
									</Link>
								</h4>
							</div>
						);
					})}
				</main>
				<Footer />
			</LayoutMotion>
		</>
	);
}

export async function getStaticPaths() {
	const { data } = await apolloClient.query({
		query: ALL_CATEGORY_PATH,
	});

	const paths = data.categories.nodes.map(item => ({
		params: { slug: item.slug },
	}));

	return {
		paths: paths || [],
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	console.log('params:', params);
	const { data } = await apolloClient.query({
		query: CATEGORY_PAGE,
		variables: { id: params.slug },
	});

	return {
		props: {
			CategoryPage: data.category,
		},
		revalidate: 10, // In seconds
	};
}
