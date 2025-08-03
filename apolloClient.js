import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Platform } from 'react-native';

// Determine the GraphQL endpoint based on the platform
const getGraphQLEndpoint = () => {
  if (__DEV__) {
    // Development environment
    if (Platform.OS === 'android') {
      // Android emulator uses 10.0.2.2 to access host machine's localhost
      return 'http://10.0.2.2:5171/graphql/';
    } else {
      // iOS simulator can use localhost
      return 'http://localhost:5171/graphql/';
    }
  } else {
    // Production environment - replace with your actual production endpoint
    return 'https://your-production-api.com/graphql/';
  }
};

const client = new ApolloClient({
  uri: getGraphQLEndpoint(),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }
});

export default client;