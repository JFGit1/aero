import { GraphQLClient, gql } from 'graphql-request';

const graphqlClient = new GraphQLClient(process.env.NEXT_PUBLIC__GRAPHQL_ENDPOINT);
export default graphqlClient;
