import Link from 'next/link';

import Seo from '@/components/Seo';
import { Footer } from '@/components/Footer';
import LayoutMotion from '@/components/LayoutMotion';
import SetHTML from '@/components/SetHTML';

import apolloClient from '@/services/apollo-client';
import { ALL_POSTS_PATH, POST_PAGE } from '@/services/graphql/queries';

import parse from 'html-react-parser';

export default function BlogPage({ PostPage }) {
	// console.log(PostPage);
	const parseDesc = parse(PostPage.excerpt);
	return (
		<>
			<Seo
				title={`${PostPage.title} | Blog | Aero Design`}
				description={parseDesc[0].props.children}
			/>
			<LayoutMotion>
				<main className='container mx-auto pt-24'>
					<h5 className='mb-2 text-base font-bold uppercase tracking-[0.5rem]'>
						Blog
					</h5>
					<h1 className='mb-4 text-3xl'>{PostPage.title}</h1>
					<SetHTML content={PostPage.content} className={'text-black'} />
					<Link
						href={`${PostPage.categories.nodes[0].slug}`}
						scroll={false}
						className='mt-4 inline-block rounded-md border border-black px-2 py-1 font-medium text-black transition-all hover:border-blue-600 hover:text-blue-600'>
						{PostPage.categories.nodes[0].name}
					</Link>
				</main>
				<Footer />
			</LayoutMotion>
		</>
	);
}

export async function getStaticPaths() {
	const { data } = await apolloClient.query({
		query: ALL_POSTS_PATH,
	});

	const paths = data.posts.nodes.map(item => ({
		params: { slug: [item.categories.nodes[0].slug, item.slug] },
	}));

	return {
		paths: paths || [],
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	console.log('params:', params);
	const { data } = await apolloClient.query({
		query: POST_PAGE,
		variables: { id: params.slug[1] },
	});

	return {
		props: {
			PostPage: data.post,
		},
		revalidate: 10, // In seconds
	};
}
