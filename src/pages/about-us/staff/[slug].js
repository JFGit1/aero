import Seo from '@/components/Seo';
import { Footer } from '@/components/Footer';
import LayoutMotion from '@/components/LayoutMotion';

import Link from 'next/link';
import apolloClient from '@/services/apollo-client';
import { ALL_STAFF_PAGE, STAFF_PAGE } from '@/services/graphql/queries';
import Image from 'next/image';
import TransitionEffect from '@/components/TransitionEffect';

export default function Staff({ StaffPage }) {
	console.log('StaffPage:', StaffPage);
	return (
		<>
			<Seo
				title={`${StaffPage.title} | Staff | Forell/Elsesser Engineers, Inc.`}
				description='This is the Staff page'
			/>
			<TransitionEffect />
			<LayoutMotion>
				<main className='container mx-auto pt-24'>
					<strong>Staff | {StaffPage.staffSubTitle}</strong>
					<h1 className='mb-4 text-3xl font-medium'>{StaffPage.title}</h1>

					<Image
						src={StaffPage.featuredImage?.node.sourceUrl}
						alt={StaffPage.title}
						height={StaffPage.featuredImage?.node.mediaDetails.height}
						width={StaffPage.featuredImage?.node.mediaDetails.width}
						loading='lazy'
					/>
					<p>
						<strong>{StaffPage.staffInformations}</strong>
						<br />
						{StaffPage.staffEmail}
					</p>
					<div dangerouslySetInnerHTML={{ __html: StaffPage?.content }} />
					<br />
					<h2>Projects</h2>
					<ul>
						{StaffPage.projTeam?.nodes.map(item => {
							return (
								<li key={item.slug}>
									<Link href={`/projects/${item.slug}`} scroll={false}>
										{item.title}
									</Link>
								</li>
							);
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
		query: ALL_STAFF_PAGE,
	});

	const paths = data.staffs.nodes.map(item => ({
		params: { slug: item.slug },
	}));

	return {
		paths: paths || [],
		fallback: false, // can also be true or 'blocking'
	};
}

export async function getStaticProps({ params }) {
	const { data } = await apolloClient.query({
		query: STAFF_PAGE,
		variables: { id: params.slug },
	});

	return {
		props: {
			StaffPage: data.staff,
		},
	};
}
