/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient'; // Adjust the path if necessary
import { useQuery } from '@apollo/client';
import {WELCOME_MESSAGE_QUERY} from './graphql/queries';
// import Header from './Libraries/NewAppScreen/components/Header';
// import {useQuery} from '@apollo/client';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  // useColorScheme,
  View,
} from 'react-native';

import Colors from './src/theme/colors';
import Header from './src/components/Header';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = true; // useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function WelcomeMessageSection(): React.JSX.Element {
  const {loading, error, data} = useQuery(WELCOME_MESSAGE_QUERY);

  if (loading) {return (
    <Section title="Loading">
      Fetching welcome message...
    </Section>
  );}


  if (error) {return (
    <Section title="Error">
      Error fetching message: {error.message}
    </Section>
  );}

  return (
    <Section title="Server Message">
      {data.welcomeMessage}
    </Section>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = true; // useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Section title="Welcome">
              Start building your Pokemon application here!
            </Section>
            <WelcomeMessageSection />
            <Section title="Learn More">
              Read the docs to discover what to do next:
            </Section>

          </View>
        </ScrollView>
      </SafeAreaView>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
