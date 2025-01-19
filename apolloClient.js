import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://10.0.2.2:5192/graphql/', // Replace with your GraphQL server URL
    cache: new InMemoryCache(),
});

export default client;
