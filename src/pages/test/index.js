import Seo from '@/components/Seo';
import { Footer } from '@/components/Footer';
import LayoutMotion from '@/components/LayoutMotion';

import axios from 'axios';
import Image from 'next/image';
import TransitionEffect from '@/components/TransitionEffect';

export default function Test({ characterResults }) {
	//console.log('load Test');

	return (
		<>
			<Seo title='Test | Aero Design' description='This is the Test page' />
			<TransitionEffect />
			<LayoutMotion>
				<main className='container mx-auto pt-24'>
					<div>
						<h1 className='mb-4 text-3xl'>Test</h1>
						<p>
							Duis consectetur, ante at facilisis mattis, risus neque
							interdum purus, nec imperdiet eros mi vitae dolor. Nam quis
							velit eget ex hendrerit mattis. Praesent sagittis metus nec
							sem pharetra convallis. Donec laoreet at justo nec mollis.
							Duis suscipit nibh non velit semper, vel convallis purus
							posuere. Donec vel condimentum metus. Lorem ipsum dolor sit
							amet, consectetur adipiscing elit. Donec vehicula, libero
							vitae eleifend bibendum, orci nisi elementum purus, quis
							rhoncus lorem lorem eu elit. Quisque sodales pharetra
							dolor, nec tempor dolor fermentum in. Fusce fringilla
							vehicula orci ac luctus. Curabitur mattis leo eget
							pellentesque tempor. Etiam vitae felis sit amet tortor
							placerat sollicitudin. Duis posuere vitae turpis mattis
							ultrices. In dictum viverra scelerisque.
						</p>
						<ul className='m-0 my-8 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
							{characterResults?.map(character => {
								return (
									<li key={character.name}>
										<p>
											<Image
												src={character.image}
												alt={character.name}
												width={400}
												height={400}
												className='w-full'
												loading='lazy'
											/>
										</p>
										<strong>{character.name}</strong>
										<p>
											<span>{character.species} / </span>
											<span>{character.gender}</span>
										</p>
									</li>
								);
							})}
						</ul>

						<p>
							Vivamus laoreet enim eu nunc dignissim iaculis non eget
							enim. Curabitur dui sapien, scelerisque vitae turpis vitae,
							commodo consectetur erat. Phasellus eget sapien sodales
							dolor consectetur imperdiet. Morbi magna orci, venenatis a
							erat eu, hendrerit auctor nulla. Proin volutpat eros ac
							orci tempus, sit amet luctus dui cursus. Interdum et
							malesuada fames ac ante ipsum primis in faucibus.
							Vestibulum vehicula, nisl id ultrices varius, lorem nibh
							tempus arcu, vitae ullamcorper ex sapien vel ex. Fusce
							condimentum lobortis velit nec suscipit. Integer nisi sem,
							mattis id dignissim nec, elementum vitae dolor. Quisque
							sagittis semper libero, a pellentesque sapien molestie sit
							amet. Donec quis sapien nulla. Sed lacinia erat ex, ac
							consectetur arcu iaculis quis. Quisque maximus eros ac
							lacus feugiat finibus eu eget massa. Nam eu mi commodo,
							condimentum arcu eu, rutrum mauris. Praesent pellentesque
							cursus efficitur.
						</p>
					</div>
				</main>
				<Footer />
			</LayoutMotion>
		</>
	);
}

const apiAxios = axios.create({
	baseURL: 'https://rickandmortyapi.com/',
	cache: {
		maxAge: 1 * 60 * 1000,
	},
});

export async function getServerSideProps(context) {
	/* const res = await fetch(`https://rickandmortyapi.com/api/character`);
	const data = await res.json(); */
	const { data } = await apiAxios.get('api/character');

	// Pass data to the page via props
	return { props: { characterResults: data?.results } };
}
