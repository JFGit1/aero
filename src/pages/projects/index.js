import Seo from '@/components/Seo';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

import { ALL_PROJECT_CATEGORIES } from '@/services/graphql/queries';
import apolloClient from '@/services/apollo-client';

import TransitionEffect from '@/components/TransitionEffect';
import LayoutMotion from '@/components/LayoutMotion';

export default function Projects({ AllProjectsCategories }) {
	//console.log('load projects');
	console.log('AllProjectsCategories:', AllProjectsCategories);

	return (
		<>
			<TransitionEffect />
			<Seo
				title='Projects | Aero Design'
				description='This is the Projects page'
			/>
			<LayoutMotion>
				<main className='container mx-auto pt-24'>
					<div>
						<h1 className='mb-4 text-3xl'>Projects</h1>

						<ul className='projects-list-items'>
							{AllProjectsCategories?.map(productItem => {
								return (
									<li key={productItem?.slug}>
										<Link
											href={`/projects/category/${productItem?.slug}`}
											scroll={false}>
											{productItem?.name}
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				</main>
				<Footer />
			</LayoutMotion>
		</>
	);
}

export async function getStaticProps(context) {
	const { data } = await apolloClient
		.query({
			query: ALL_PROJECT_CATEGORIES,
		})
		.then(res => {
			console.log(res);
			return res;
		})
		.catch(err => {
			console.log(err, 'error on your side');
			return err;
		});

	return {
		props: {
			AllProjectsCategories: data.projectsCategories.nodes,
		},
		//revalidate: 60, // In seconds
	};
}
