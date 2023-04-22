import Seo from '@/components/Seo';
import { Footer } from '@/components/Footer';

import LayoutMotion from '@/components/LayoutMotion';
import TransitionEffect from '@/components/TransitionEffect';

import apolloClient from '@/services/apollo-client';
import { PAGES_BY_SLUG } from '@/services/graphql/queries';

export default function AboutUs({ contentPage }) {
	console.log('load about us');

	return (
		<>
			<Seo
				title={`${contentPage?.page.title} | Forell/Elsesser Engineers, Inc.`}
				description={`This is the ${contentPage?.page.title} page`}
			/>
			<TransitionEffect />
			<LayoutMotion>
				<main className='container mx-auto pt-24'>
					<div>
						<h1 className='mb-4 text-3xl font-medium'>
							{contentPage?.page.title}
						</h1>
						<div
							dangerouslySetInnerHTML={{
								__html: contentPage?.page.content,
							}}
						/>
					</div>
				</main>
				<Footer />
			</LayoutMotion>
		</>
	);
}

export async function getStaticProps(context) {
	const { data: contentPage } = await apolloClient.query({
		query: PAGES_BY_SLUG,
		variables: { id: 'about-us' },
	});

	return {
		props: {
			contentPage,
		},
	};
}
