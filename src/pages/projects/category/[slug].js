import Seo from '@/components/Seo';
import { Footer } from '@/components/Footer';

import LayoutMotion from '@/components/LayoutMotion';
import TransitionEffect from '@/components/TransitionEffect';

import Link from 'next/link';
import apolloClient from '@/services/apollo-client';
import {
	PROJECTS_CATEGORY,
	ALL_PROJECT_CATEGORIES,
} from '@/services/graphql/queries';

export default function AboutUs({ ProjectCategoryPage }) {
	// console.log('load projects');

	return (
		<>
			<Seo
				title={`${ProjectCategoryPage[0]?.name} | Forell/Elsesser Engineers, Inc.`}
				description='This is the Projects page'
			/>
			<TransitionEffect />
			<LayoutMotion>
				<main className='container mx-auto pt-24'>
					<strong>Projects</strong>
					<h1 className='mb-4 text-3xl font-medium'>
						{ProjectCategoryPage[0]?.name}
					</h1>
					<p
						dangerouslySetInnerHTML={{
							__html: ProjectCategoryPage[0]?.description,
						}}
					/>

					<ul className='projects-list-items'>
						{ProjectCategoryPage[0]?.projects?.nodes.map(productItem => {
							if (productItem.projHasPage === true) {
								return (
									<li key={productItem?.slug}>
										<Link
											href={`/projects/${productItem?.slug}`}
											scroll={false}>
											<strong>{productItem?.title}</strong>
										</Link>
									</li>
								);
							} else {
								return (
									<li key={productItem?.slug}>{productItem?.title}</li>
								);
							}
						})}
					</ul>
				</main>
				<Footer />
			</LayoutMotion>
		</>
	);
}

export async function getStaticPaths() {
	const { data } = await apolloClient.query({
		query: ALL_PROJECT_CATEGORIES,
	});

	const paths = data.projectsCategories.nodes.map(item => ({
		params: { slug: item.slug },
	}));

	return {
		paths: paths || [],
		fallback: false, // can also be true or 'blocking'
	};
}

export async function getStaticProps({ params }) {
	const { data } = await apolloClient.query({
		query: PROJECTS_CATEGORY,
		variables: { slug: params.slug },
	});

	return {
		props: {
			ProjectCategoryPage: data.projectsCategories.nodes,
		},
		revalidate: 10, // In seconds
	};
}

/*
export async function getStaticProps(context) {
	const { slug } = context.query;
	const { data } = await apolloClient.query({
		query: PROJECTS_CATEGORY,
		variables: { slug: slug },
	});

	return {
		props: {
			ProjectCategoryPage: data.projectsCategories.nodes,
		},
	};
}
 */
