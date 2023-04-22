import Seo from '@/components/Seo';
import { Footer } from '@/components/Footer';
import LayoutMotion from '@/components/LayoutMotion';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Header } from '@/components/Header';
import TransitionEffect from '@/components/TransitionEffect';

export default function Home() {
	//console.log('load home');

	let [isOpen, setIsOpen] = useState(false);

	function openModal() {
		setIsOpen(true);
	}
	function closeModal() {
		setIsOpen(false);
	}

	return (
		<>
			<Seo title='Aero Design' desc='Content of the homepage.' />
			<TransitionEffect />
			<LayoutMotion>
				<main className='container mx-auto pt-24'>
					<h1 className='mb-4 flex items-center text-3xl'>
						<ShieldCheckIcon className='text-orange mr-2 h-8 w-8' />
						Welcome
					</h1>
				</main>
				<Footer />
			</LayoutMotion>
		</>
	);
}
