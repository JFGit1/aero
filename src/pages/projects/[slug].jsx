import Seo from '@/components/Seo';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

import TransitionEffect from '@/components/TransitionEffect';
import LayoutMotion from '@/components/LayoutMotion';
import SetHTML from '@/components/SetHTML';

import {
	ALL_PROJECTS_PATH,
	PROJECTS_PAGE,
	PROJECTS_PAGE_MEDIA,
} from '@/services/graphql/queries';
import apolloClient from '@/services/apollo-client';
import { useQuery } from '@apollo/client';

export default function Projects({ ProjectPage }) {
	//console.log('load projects');
	console.log('ProjectPage:', ProjectPage);

	const { data } = useQuery(PROJECTS_PAGE_MEDIA, {
		variables: { parent: ProjectPage.databaseId },
	});
	const mediaContent = data?.mediaItems;
	console.log('mediaContent:', mediaContent);

	return (
		<>
			<TransitionEffect />
			<Seo
				title='Projects | Aero Design'
				description='This is the Projects page'
			/>
			<LayoutMotion>
				<section
					className='min-h-[80vh] bg-slate-100 bg-cover bg-no-repeat'
					style={{
						backgroundImage: `url(
							"${ProjectPage?.projFirstImage?.node.sourceUrl}"
						)`,
					}}></section>
				<main className='container mx-auto pt-12'>
					<strong>Projects</strong>
					<h1 className='mb-4 text-3xl font-medium'>
						{ProjectPage?.title}
					</h1>
					<p>{ProjectPage?.projSubTitle}</p>

					<Image
						src={ProjectPage?.projSecondImage?.node.sourceUrl}
						height={
							ProjectPage?.projSecondImage?.node.mediaDetails.height
						}
						width={ProjectPage?.projSecondImage?.node.mediaDetails.width}
						title={ProjectPage?.projSecondImage?.node.title}
					/>
					<SetHTML content={ProjectPage?.content} className='mb-16' />

					<div className='mb-16 flex gap-8'>
						<div className='w-[64%]'>
							<h2 className='mb-4 text-xl font-medium'>
								Customized Solution
							</h2>
							<SetHTML content={ProjectPage?.projCustomizedSolution} />
						</div>
						<div className='w-[33%]'>
							<Image
								src={ProjectPage?.projThirdImage?.node.sourceUrl}
								height={
									ProjectPage?.projThirdImage?.node.mediaDetails.height
								}
								width={
									ProjectPage?.projThirdImage?.node.mediaDetails.width
								}
								title={ProjectPage?.projThirdImage?.node.title}
							/>
						</div>
					</div>

					<div className='mb-16 flex gap-8'>
						<div className='w-[64%]'>
							<Image
								src={ProjectPage?.projFourthImage?.node.sourceUrl}
								height={
									ProjectPage?.projFourthImage?.node.mediaDetails
										.height
								}
								width={
									ProjectPage?.projFourthImage?.node.mediaDetails.width
								}
								title={ProjectPage?.projFourthImage?.node.title}
							/>
						</div>
						<div className='w-[33%]'>
							<h2 className='mb-4 text-xl font-medium'>Highlights</h2>
							<SetHTML content={ProjectPage?.projHighlights} />
						</div>
					</div>

					<h2 className='mb-4 text-xl font-medium'>Team</h2>
					<ul>
						{ProjectPage?.projTeam?.nodes.map(teamItem => {
							return (
								<li key={teamItem?.slug}>
									<Link
										href={`/about-us/staff/${teamItem?.slug}`}
										scroll={false}>
										<strong>{teamItem?.title}</strong>
									</Link>
								</li>
							);
						})}
					</ul>
					<h2 className='mb-4 text-xl font-medium'>Categories</h2>
					<ul>
						{ProjectPage?.projectsCategories?.nodes.map(categoryItem => {
							return (
								<li key={categoryItem?.slug}>
									<Link
										href={`/projects/category/${categoryItem?.slug}`}
										scroll={false}>
										<strong>{categoryItem?.name}</strong>
									</Link>
								</li>
							);
						})}
					</ul>
					<div className='grid grid-cols-4 gap-8'>
						{mediaContent?.nodes.map(item => {
							return (
								<div key={item.id}>
									<Image
										src={item.sourceUrl}
										width={item.mediaDetails.width}
										height={item.mediaDetails.height}
										alt={item.title}
									/>
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

export async function getStaticPaths() {
	const { data } = await apolloClient.query({
		query: ALL_PROJECTS_PATH,
	});

	const paths = data.projects.nodes.map(item => ({
		params: { slug: item.slug },
	}));

	return {
		paths: paths || [],
		fallback: false, // can also be true or 'blocking'
	};
}

export async function getStaticProps({ params }) {
	const { data } = await apolloClient.query({
		query: PROJECTS_PAGE,
		variables: { id: params.slug },
	});

	return {
		props: {
			ProjectPage: data.project,
		},
		revalidate: 10, // In seconds
	};
}

/*
export async function getServerSideProps(context) {
	const { slug } = context.query;
	const { data } = await apolloClient.query({
		query: PROJECTS_PAGE,
		variables: { id: slug },
	});

	return {
		props: {
			ProjectPage: data.project,
		},
	};
}
 */

{
	/* {projectPage?.projImages?.nodes.map((prodItem, i) => {
									const prodArrImgBlur = prodItem.srcSet.split(' ');
									const prodImgBlur = prodArrImgBlur[0];
									//console.log('prodImgBlur:', prodImgBlur);
									return (
										<li key={prodItem.id}>
											<Image
												src={prodItem.sourceUrl}
												srcSet={prodItem.srcSet}
												alt={prodItem.title}
												height={prodItem.mediaDetails.height}
												width={prodItem.mediaDetails.width}
												blurDataURL={prodImgBlur}
												placeholder='blur'
												loading='lazy'
											/>
										</li>
									);
								})} */
}
