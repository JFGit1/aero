import Seo from '@/components/Seo';
import { Footer } from '@/components/Footer';

import Image from 'next/image';
import { Header } from '@/components/Header';
import TransitionEffect from '@/components/TransitionEffect';
import LayoutMotion from '@/components/LayoutMotion';

export default function Cards() {
	console.log('load cards');
	return (
		<>
			<TransitionEffect />
			<Header />
			<div className='px-4 pt-8 md:pt-28 '>
				<LayoutMotion>
					<Seo title='Aero Design' desc='Content of the homepage.' />
					<main className='container mx-auto'>
						<h1 className='mb-4 text-3xl'>Cards</h1>

						<div className='mt-5 mb-7 flex flex-col gap-6 lg:flex-row '>
							{cardBox(
								'/images/image-01.jpg',
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus laoreet enim eu nunc dignissim iaculis non eget enim curabitur.',
								'Lorem Ipsum Dolor',
								'Vivamus Elit'
							)}
							{cardBox(
								'/images/image-01.jpg',
								'Vivamus laoreet enim eu nunc dignissim iaculis non eget enim. Curabitur dui sapien, scelerisque vitae turpis vitae, commodo consectetur erat.',
								'Duis Consectetur',
								'Phasellus eget'
							)}
						</div>
					</main>
					<Footer />
				</LayoutMotion>
			</div>
		</>
	);
}

const cardBox = (image, desc, name, jobTitle) => {
	console.log(image);
	return (
		<figure className='overflow-hidden rounded-xl bg-slate-100 p-8 dark:bg-slate-800 md:flex md:p-0'>
			<Image
				className='mx-auto h-24 w-24 rounded-full md:h-auto md:w-48 md:rounded-none '
				src={image}
				alt=''
				width='384'
				height='512'
			/>
			<div className='space-y-4 pt-6 text-center md:p-8 md:text-left'>
				<blockquote>
					<p className='text-lg font-light'>{desc}</p>
				</blockquote>
				<figcaption className='font-medium'>
					<div className='text-sky-500 dark:text-sky-400'>{name}</div>
					<div className='text-slate-700 dark:text-slate-500'>
						{jobTitle}
					</div>
				</figcaption>
			</div>
		</figure>
	);
};
