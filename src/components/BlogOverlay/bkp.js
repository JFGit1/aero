import { useState } from 'react';
import axios from 'axios';

const Overlay = ({ post }) => {
	const [isOpen, setIsOpen] = useState(false);

	const openOverlay = () => setIsOpen(true);
	const closeOverlay = () => setIsOpen(false);

	return (
		<>
			<div
				className='card mb-4 cursor-pointer bg-slate-100 p-4 pb-1 transition-all hover:bg-slate-200'
				onClick={openOverlay}>
				<h2 className='font-medium'>{post.title}</h2>
				<div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
			</div>

			{isOpen && (
				<div
					className='overlay fixed top-0 left-0 z-[9999] flex h-full w-full items-center justify-center bg-black/50'
					onClick={closeOverlay}>
					<div
						className='content max-h-[60vh] max-w-4xl overflow-y-auto bg-white p-8'
						onClick={e => e.stopPropagation()}>
						<h2 className='mb-4 text-4xl font-medium'>{post.title}</h2>
						<div dangerouslySetInnerHTML={{ __html: post.content }} />
					</div>
				</div>
			)}
		</>
	);
};

export default Overlay;

export async function getServerSideProps(context) {
	const { slug } = context.query;
	const response = await axios.get(
		`https://aero-lab.amzb.securityserve.com/wp-json/wp/v2/posts?slug=${slug}` //exploring-the-vibrant-jazz-scene-of-portland
	);

	if (
		!response.data ||
		!Array.isArray(response.data) ||
		response.data.length === 0
	) {
		return {
			notFound: true,
		};
	}

	const post = response.data[0];

	return {
		props: {
			post: {
				title: post.title.rendered,
				content: post.content.rendered,
				excerpt: post.excerpt.rendered,
			},
		},
	};
}
