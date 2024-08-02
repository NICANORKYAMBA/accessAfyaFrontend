import { ApolloClient, InMemoryCache } from '@apollo/client';
// import { createUploadLink } from 'apollo-upload-client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
// import { setContext } from '@apollo/client/link/context';

// // Create an authentication link to add the token to headers
// const authLink = setContext((_, { headers }) => {
//     const token = localStorage.getItem('token'); // Retrieve token from localStorage
//     return {
//         headers: {
//             ...headers,
//             authorization: token ? `Bearer ${token}` : '', // Add token to authorization header if it exists
//         },
//     };
// });

// Create the Apollo Client instance
export const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:4000/graphql',
});