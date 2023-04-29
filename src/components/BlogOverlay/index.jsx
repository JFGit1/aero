import Link from 'next/link';
import { useState } from 'react';

const Overlay = ({ post }) => {
	// console.log('post:', post);
	const [isOpen, setIsOpen] = useState(false);

	const openOverlay = () => setIsOpen(true);
	const closeOverlay = () => setIsOpen(false);

	return (
		<>
			<div
				className='card mb-4 h-full cursor-pointer bg-slate-100 p-4 pb-1 transition-all hover:bg-slate-200'
				onClick={openOverlay}>
				<h2 className='font-medium'>{post.title}</h2>
				<div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
			</div>

			{isOpen && (
				<div
					className='overlay fixed top-0 left-0 z-[9999] flex h-full w-full items-center justify-center bg-slate-300/70'
					onClick={closeOverlay}>
					<div
						className='content max-h-[60vh] max-w-4xl overflow-y-auto bg-white p-8'
						onClick={e => e.stopPropagation()}>
						<h2 className='mb-4 text-4xl font-medium'>{post.title}</h2>
						<div dangerouslySetInnerHTML={{ __html: post.content }} />
						<Link
							href={`blog/${post.categories.nodes[0].slug}`}
							scroll={false}
							className='mt-4 inline-block rounded-md border border-black px-2 py-1 font-medium text-black transition-all hover:border-blue-600 hover:text-blue-600'>
							{post.categories.nodes[0].name}
						</Link>
					</div>
				</div>
			)}
		</>
	);
};

export default Overlay;
