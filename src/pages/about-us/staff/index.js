import Seo from '@/components/Seo';
import { Footer } from '@/components/Footer';
import LayoutMotion from '@/components/LayoutMotion';

import Image from 'next/image';
import Link from 'next/link';
import apolloClient from '@/services/apollo-client';
import { ALL_STAFF_LIST } from '@/services/graphql/queries';
import TransitionEffect from '@/components/TransitionEffect';

export default function Staff({ staffList }) {
	console.log('staffList:', staffList);

	return (
		<>
			<Seo
				title={`Staff | Forell/Elsesser Engineers, Inc.`}
				description='This is the Projects page'
			/>
			<TransitionEffect />
			<LayoutMotion>
				<main className='container mx-auto pt-24'>
					<h1 className='mb-4 text-3xl font-medium'>Staff</h1>

					{staffList?.map(item => {
						return (
							<div key={item.slug}>
								<h2 className='mb-4 text-xl font-medium'>
									{item.name}
								</h2>
								<ul
									className='m-0 mb-6 grid grid-cols-1 gap-6 p-0 md:grid-cols-3'
									key={`list-${item.slug}`}>
									{item?.staffs?.nodes.map(subItem => {
										return (
											<li key={subItem.slug} className='list-none'>
												<Link
													prefetch={false}
													href={`/about-us/staff/${subItem.slug}`}
													scroll={false}>
													<Image
														src={
															subItem.featuredImage?.node
																.sourceUrl
														}
														alt={subItem.title}
														height={
															subItem.featuredImage?.node
																.mediaDetails.height
														}
														width={
															subItem.featuredImage?.node
																.mediaDetails.width
														}
														loading='lazy'
													/>
													<h4 className='mt-2'>{subItem.title}</h4>
												</Link>
											</li>
										);
									})}
								</ul>
							</div>
						);
					})}
				</main>
				<Footer />
			</LayoutMotion>
		</>
	);
}

export async function getStaticProps(context) {
	const { data } = await apolloClient.query({
		query: ALL_STAFF_LIST,
	});

	return {
		props: {
			staffList: data.staffCategories.nodes,
		},
	};
}
