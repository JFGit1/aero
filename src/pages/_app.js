import { Header } from '@/components/Header';
import { AnimatePresence } from 'framer-motion';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import '@/styles/globals.css';

const client = new ApolloClient({
	ssrMode: true,
	uri: process.env.NEXT_PUBLIC__GRAPHQL_ENDPOINT,
	cache: new InMemoryCache(),
});

export default function App({ Component, pageProps, router }) {
	return (
		<ApolloProvider client={client}>
			<Header />
			<AnimatePresence
				mode='wait'
				initial={false}
				onExitComplete={() => window.scrollTo(0, 0)}>
				<Component {...pageProps} key={router.asPath} />
			</AnimatePresence>
		</ApolloProvider>
	);
}
