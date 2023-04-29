import { ApolloClient, InMemoryCache } from '@apollo/client';
const defaultOptions = {
	watchQuery: {
		fetchPolicy: 'cache-and-network',
		errorPolicy: 'ignore',
	},
	query: {
		fetchPolicy: 'network-only',
		errorPolicy: 'all',
	},
	mutate: {
		errorPolicy: 'all',
	},
};

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
	uri: process.env.NEXT_PUBLIC__GRAPHQL_ENDPOINT,
	cache: cache,
	ssrForceFetchDelay: 100,
	name: 'react-web-client',
	version: '1.3',
	queryDeduplication: false,
	defaultOptions: defaultOptions,
	/* defaultOptions: {
		watchQuery: {
			fetchPolicy: 'cache-and-network',
		},
	}, */
});

export default apolloClient;
