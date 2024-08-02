import { ApolloClient, InMemoryCache } from '@apollo/client';

// Create the Apollo Client instance
export const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:4000/graphql',
});