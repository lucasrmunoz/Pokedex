/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {ApolloProvider} from '@apollo/client';
import client from './apolloClient'; // Adjust the path if `apolloClient.js` is in a subdirectory

const AppWithProvider = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => AppWithProvider);