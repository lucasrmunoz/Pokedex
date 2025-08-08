/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {ApolloProvider} from '@apollo/client';
import client from './apolloClient'; // Adjust the path if necessary
import {useQuery} from '@apollo/client';
import {WELCOME_MESSAGE_QUERY, GET_POKEMON_BY_NAME, GET_POKEMON_BY_ID} from './graphql/queries';
// import Header from './Libraries/NewAppScreen/components/Header';
// import {useQuery} from '@apollo/client';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  // useColorScheme,
} from 'react-native';
import {useState} from 'react';

import Colors from './src/theme/colors';
import Header from './src/components/Header';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function PokemonScroller(): React.JSX.Element {
  const [pokemonId, setPokemonId] = useState(1);
  const isDarkMode = true;

  const {loading, error, data} = useQuery(GET_POKEMON_BY_ID, {
    variables: {id: pokemonId},
  });

  const handleArrowPress = (direction: 'up' | 'down' | 'left' | 'right') => {
    setPokemonId(prevId => {
      if (direction === 'up' || direction === 'right') {
        return prevId < 151 ? prevId + 1 : prevId;
      } else {
        return prevId > 1 ? prevId - 1 : prevId;
      }
    });
  };

  return (
    <View style={styles.scrollerContainer}>
      <Text
        style={[
          styles.scrollerTitle,
          {color: isDarkMode ? Colors.white : Colors.black},
        ]}>
        Pokemon Browser
      </Text>

      {/* Pokemon ID Display */}
      <View style={styles.idDisplay}>
        <Text style={styles.idText}>#{pokemonId} {data.pokemonById.name}</Text>
      </View>

      {/* Arrow Controls */}
      <View style={styles.arrowContainer}>
        <View style={styles.arrowRow}>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => handleArrowPress('up')}>
            <Text style={styles.arrowText}>▲</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.arrowMiddleRow}>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => handleArrowPress('left')}>
            <Text style={styles.arrowText}>◄</Text>
          </TouchableOpacity>
          <View style={styles.arrowSpacer} />
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => handleArrowPress('right')}>
            <Text style={styles.arrowText}>►</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.arrowRow}>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => handleArrowPress('down')}>
            <Text style={styles.arrowText}>▼</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Pokemon Data Display */}
      {loading && (
        <Text style={[styles.resultText, {color: Colors.light}]}>
          Loading Pokemon #{pokemonId}...
        </Text>
      )}

      {error && (
        <Text style={[styles.resultText, {color: Colors.light}]}>
          Error loading Pokemon: {error.message}
        </Text>
      )}

      {data && data.pokemonById && (
        <View style={styles.pokemonResult}>
          <Text style={styles.pokemonResultName}>
            {data.pokemonById.name.toUpperCase()}
          </Text>

          {/* Pokemon Sprite */}
          {data.pokemonById.spriteUrl && (
            <View style={styles.spriteContainer}>
              <Image
                source={{uri: data.pokemonById.spriteUrl}}
                style={styles.pokemonSprite}
                resizeMode="contain"
              />
            </View>
          )}

          {/* Key-Value Pairs Section */}
          <View style={styles.keyValueSection}>
            <Text style={styles.sectionTitle}>Pokemon Details</Text>
            <View style={styles.keyValueContainer}>
              <View style={styles.keyValueRow}>
                <Text style={styles.keyText}>ID:</Text>
                <Text style={styles.valueText}>{data.pokemonById.id}</Text>
              </View>
              <View style={styles.keyValueRow}>
                <Text style={styles.keyText}>Name:</Text>
                <Text style={styles.valueText}>{data.pokemonById.name}</Text>
              </View>
              <View style={styles.keyValueRow}>
                <Text style={styles.keyText}>Types:</Text>
                <Text style={styles.valueText}>
                  {data.pokemonById.types && data.pokemonById.types.length > 0
                    ? data.pokemonById.types.join(', ')
                    : 'No types found'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

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

  if (loading) {
    return <Section title="Loading">Fetching welcome message...</Section>;
  }

  if (error) {
    return (
      <Section title="Error">Error fetching message: {error.message}</Section>
    );
  }

  return <Section title="Server Message">{data.welcomeMessage}</Section>;
}

// function WelcomeSquirtleSection(): React.JSX.Element {
//   const {loading, error, data} = useQuery(GET_POKEMON_BY_NAME, {
//     variables: {name: 'squirtle'},
//   });

//   if (loading) return <Section title="Welcome">Loading...</Section>;

//   if (error) return <Section title="Welcome">Error loading Pokemon</Section>;

//   return (
//     <Section title="Welcome">
//       Hi,{' '}
//       {data.pokemon.name.charAt(0).toUpperCase() + data.pokemon.name.slice(1)}!
//     </Section>
//   );
// }

function PokemonSection(): React.JSX.Element {
  const {loading, error, data} = useQuery(GET_POKEMON_BY_NAME, {
    variables: {name: 'squirtle'},
  });

  if (loading)
    return <Section title="Loading">Fetching Pokemon data...</Section>;

  if (error)
    return (
      <Section title="Error">Error fetching Pokemon: {error.message}</Section>
    );

  return (
    <View>
      <Text style={styles.pokemonHeader}>
        {data.pokemon.name.toUpperCase()}
      </Text>
      <View style={styles.pokemonDetails}>
        <Text style={styles.detailText}>ID: {data.pokemon.id}</Text>
        <Text style={styles.detailText}>
          Types:{' '}
          {data.pokemon.types && data.pokemon.types.length > 0
            ? data.pokemon.types.join(', ')
            : 'No types found'}
        </Text>
      </View>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = true; // useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: Colors.softRed,
  };

  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={Colors.softRed}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}
          contentContainerStyle={{flexGrow: 1}}>
          <Header />
          <View
            style={{
              backgroundColor: Colors.softRed,
              flex: 1,
              minHeight: '100%',
            }}>
            <PokemonScroller />
            <WelcomeMessageSection />
            {/* <WelcomeSquirtleSection /> */}
            <PokemonSection />
            {/* <Section title="Learn More"> */}
              {/* Read the docs to discover what to do next: */}
            {/* </Section> */}
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
  pokemonHeader: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: Colors.white,
  },
  pokemonDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    color: Colors.white,
  },
  scrollerContainer: {
    marginTop: 20,
    paddingHorizontal: 24,
  },
  scrollerTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  idDisplay: {
    alignItems: 'center',
    marginBottom: 20,
  },
  idText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.white,
  },
  arrowContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  arrowRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  arrowMiddleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowButton: {
    backgroundColor: Colors.darker,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  arrowSpacer: {
    width: 60,
    height: 60,
    margin: 5,
  },
  arrowText: {
    fontSize: 24,
    color: Colors.white,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  pokemonResult: {
    backgroundColor: Colors.darker,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  pokemonResultName: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,
    marginBottom: 12,
  },
  pokemonResultDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pokemonResultText: {
    fontSize: 16,
    color: Colors.white,
  },
  keyValueSection: {
    marginTop: 16,
  },
  keyValueContainer: {
    backgroundColor: Colors.black,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  keyValueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darker,
  },
  keyText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light,
    flex: 1,
  },
  valueText: {
    fontSize: 16,
    color: Colors.white,
    flex: 2,
    textAlign: 'right',
  },
  spriteContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  pokemonSprite: {
    width: 150,
    height: 150,
  },
});

export default App;
