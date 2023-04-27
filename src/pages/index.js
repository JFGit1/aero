import Seo from '@/components/Seo';
import { Footer } from '@/components/Footer';
import LayoutMotion from '@/components/LayoutMotion';
import TransitionEffect from '@/components/TransitionEffect';

export default function Home() {
	//console.log('load home');

	return (
		<>
			<Seo title='Aero Design' desc='Content of the homepage.' />
			<LayoutMotion>
				<main className='container mx-auto pt-24'>
					<h1 className='mb-4 flex items-center text-3xl'>Welcome</h1>
				</main>
				<Footer />
			</LayoutMotion>
		</>
	);
}
