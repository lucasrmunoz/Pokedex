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
import {WELCOME_MESSAGE_QUERY, GET_POKEMON_BY_NAME} from './graphql/queries';
// import Header from './Libraries/NewAppScreen/components/Header';
// import {useQuery} from '@apollo/client';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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

function PokemonSearchBox(): React.JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const isDarkMode = true;

  const {loading, error, data} = useQuery(GET_POKEMON_BY_NAME, {
    variables: {name: searchQuery.toLowerCase()},
    skip: !searchQuery, // Skip query if no search term
  });

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setSearchQuery(searchTerm.trim());
    }
  };

  return (
    <View style={styles.searchContainer}>
      <Text
        style={[
          styles.searchTitle,
          {color: isDarkMode ? Colors.white : Colors.black},
        ]}>
        Search Pokemon
      </Text>

      <View style={styles.searchInputContainer}>
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
              color: isDarkMode ? Colors.white : Colors.black,
              borderColor: isDarkMode ? Colors.light : Colors.dark,
            },
          ]}
          placeholder="Enter Pokemon name..."
          placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      {loading && searchQuery && (
        <Text style={[styles.resultText, {color: Colors.light}]}>
          Searching for {searchQuery}...
        </Text>
      )}

      {error && (
        <Text style={[styles.resultText, {color: Colors.light}]}>
          Pokemon "{searchQuery}" not found! - {error.message}
        </Text>
      )}

      {data && data.pokemon && (
        <View style={styles.pokemonResult}>
          <Text style={styles.pokemonResultName}>
            {data.pokemon.name.toUpperCase()}
          </Text>

          {/* Pokemon Sprite */}
          {data.pokemon.spriteUrl && (
            <View style={styles.spriteContainer}>
              <Image
                source={{uri: data.pokemon.spriteUrl}}
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
                <Text style={styles.valueText}>{data.pokemon.id}</Text>
              </View>
              <View style={styles.keyValueRow}>
                <Text style={styles.keyText}>Name:</Text>
                <Text style={styles.valueText}>{data.pokemon.name}</Text>
              </View>
              <View style={styles.keyValueRow}>
                <Text style={styles.keyText}>Types:</Text>
                <Text style={styles.valueText}>
                  {data.pokemon.types && data.pokemon.types.length > 0
                    ? data.pokemon.types.join(', ')
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
            <PokemonSearchBox />
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
  searchContainer: {
    marginTop: 20,
    paddingHorizontal: 24,
  },
  searchTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: Colors.darker,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: Colors.white,
    fontWeight: '600',
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
