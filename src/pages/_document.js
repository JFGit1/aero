import Document, { Html, Head, Main, NextScript } from 'next/document';
export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const originalRenderPage = ctx.renderPage;

		ctx.renderPage = () =>
			originalRenderPage({
				enhanceApp: App => App,
				enhanceComponent: Component => Component,
			});

		const initialProps = await Document.getInitialProps(ctx);
		return initialProps;
	}

	render() {
		return (
			<Html lang='en' className='scroll-smooth '>
				<link rel='stylesheet' href='https://use.typekit.net/seg4gmq.css' />
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
