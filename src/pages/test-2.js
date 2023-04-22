import React, { useState, useEffect, useRef } from 'react';

import Seo from '@/components/Seo';
import { Footer } from '@/components/Footer';
import LayoutMotion from '@/components/LayoutMotion';

export default function Test() {
	// console.log('load test');
	const [count, setCount] = useState(0);
	const buttonRef = useRef(null);

	useEffect(() => {
		document.title = `You clicked ${count} times`;
		console.log('count:', count);
	});

	useEffect(() => {
		buttonRef.current.click();
		console.log('clicking with ref');
	}, []);

	function handleClick() {
		setCount(count + 1);
	}

	return (
		<div className='px-4 pt-8 md:pt-28'>
			<Seo title='Test | Aero Design' description='This is the About Us page' />

			<LayoutMotion>
				<main className='container mx-auto'>
					<div>
						<h1 className='mb-4 text-3xl'>Test</h1>
						<p>You clicked {count} times</p>
						<button
							ref={buttonRef}
							onClick={() => {
								handleClick();
							}}
							className='btn btn-blue mb-4'>
							Click me
						</button>
					</div>
				</main>
				<Footer />
			</LayoutMotion>
		</div>
	);
}
