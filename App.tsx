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
  // useColorScheme,
} from 'react-native';
import {useState} from 'react';

import Colors from './src/theme/colors';
import Header from './src/components/Header';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function SearchSection(): React.JSX.Element {
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
          Pokemon "{searchQuery}" not found!
        </Text>
      )}

      {data && data.pokemonByName && (
        <View style={styles.pokemonResult}>
          <Text style={styles.pokemonResultName}>
            {data.pokemonByName.name.toUpperCase()}
          </Text>
          <View style={styles.pokemonResultDetails}>
            <Text style={styles.pokemonResultText}>
              ID: {data.pokemonByName.id}
            </Text>
            <Text style={styles.pokemonResultText}>
              Type: {data.pokemonByName.type}
            </Text>
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

function WelcomeSquirtleSection(): React.JSX.Element {
  const {loading, error, data} = useQuery(GET_POKEMON_BY_NAME, {
    variables: {name: 'squirtle'},
  });

  if (loading) return <Section title="Welcome">Loading...</Section>;

  if (error) return <Section title="Welcome">Error loading Pokemon</Section>;

  return (
    <Section title="Welcome">
      Hi,{' '}
      {data.pokemonByName.name.charAt(0).toUpperCase() +
        data.pokemonByName.name.slice(1)}
      !
    </Section>
  );
}

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
        {data.pokemonByName.name.toUpperCase()}
      </Text>
      <View style={styles.pokemonDetails}>
        <Text style={styles.detailText}>ID: {data.pokemonByName.id}</Text>
        <Text style={styles.detailText}>Type: {data.pokemonByName.type}</Text>
      </View>
    </View>
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
              <SearchSection />
            <WelcomeSquirtleSection />
            <PokemonSection />
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
});

export default App;
