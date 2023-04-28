import Seo from '@/components/Seo';
import { Footer } from '@/components/Footer';
import LayoutMotion from '@/components/LayoutMotion';
import Overlay from '@/components/BlogOverlay';

export default function Home({ posts }) {
	//console.log('load home');
	const renderPosts = () => {
		return posts.map(post => <Overlay key={post.id} post={post} />);
	};

	return (
		<>
			<Seo title='Aero Design' desc='Content of the homepage.' />
			<LayoutMotion>
				<main className='container mx-auto pt-24'>
					<h1 className='mb-4 flex items-center text-3xl'>Welcome</h1>

					<div className='grid grid-cols-3 gap-8'>{renderPosts()}</div>
				</main>
				<Footer />
			</LayoutMotion>
		</>
	);
}

export async function getStaticProps() {
	const response = await fetch(
		'https://aero-lab.amzb.securityserve.com/wp-json/wp/v2/posts'
	);
	const posts = await response.json();

	return {
		props: {
			posts: posts.map(post => ({
				id: post.id,
				title: post.title.rendered,
				content: post.content.rendered,
				excerpt: post.excerpt.rendered,
			})),
		},
	};
}
