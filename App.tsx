/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {ApolloProvider} from '@apollo/client';
import client from './apolloClient'; // Adjust the path if necessary
import {useQuery} from '@apollo/client';
import {GET_POKEMON_BY_ID} from './graphql/queries';
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
// import Header from './src/components/Header';

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
        <Text style={styles.idText}>
          #{pokemonId} {data?.pokemonById?.name || ''}
        </Text>
      </View>

      {/* Pokemon Data Display */}
      {loading && (
        <View style={styles.pokemonResult}>
          <Text style={styles.pokemonResultName}>
            {/* {data.pokemonById.name.toUpperCase()} */}
          </Text>

          {/* Pokemon Sprite */}
          {/* {data.pokemonById.spriteUrl && ( */}
            <View style={styles.spriteContainer}>
              <Image
                source={{uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'}}
                style={styles.pokemonSprite}
                resizeMode="contain"
              />
            </View>
          {/* )} */}

          {/* Key-Value Pairs Section */}
          <View style={styles.keyValueSection}>
            <Text style={styles.sectionTitle}>Pokemon Details</Text>
            <View style={styles.keyValueContainer}>
              <View style={styles.keyValueRow}>
                <Text style={styles.keyText}>ID:</Text>
                <Text style={styles.valueText}>No data</Text>
              </View>
              <View style={styles.keyValueRow}>
                <Text style={styles.keyText}>Name:</Text>
                <Text style={styles.valueText}>No data</Text>
              </View>
              <View style={styles.keyValueRow}>
                <Text style={styles.keyText}>Types:</Text>
                <Text style={styles.valueText}>
                  'No pokemon found'
                </Text>
              </View>
            </View>
          </View>
        </View>
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

      {/* Two Column Layout for Controls */}
      <View style={styles.controlsContainer}>
        {/* Left Column - D-Pad Controls */}
        <View style={styles.leftControlColumn}>
          <View style={styles.dpadContainer}>
            {/* D-Pad Up Button */}
            <View style={styles.dpadRow}>
              <TouchableOpacity
                style={[styles.dpadButton, styles.dpadUp]}
                onPress={() => handleArrowPress('up')}>
                <Text style={styles.dpadText}>▲</Text>
              </TouchableOpacity>
            </View>
            {/* D-Pad Middle Row */}
            <View style={styles.dpadMiddleRow}>
              <TouchableOpacity
                style={[styles.dpadButton, styles.dpadLeft]}
                onPress={() => handleArrowPress('left')}>
                <Text style={styles.dpadText}>◄</Text>
              </TouchableOpacity>
              <View style={styles.dpadCenter} />
              <TouchableOpacity
                style={[styles.dpadButton, styles.dpadRight]}
                onPress={() => handleArrowPress('right')}>
                <Text style={styles.dpadText}>►</Text>
              </TouchableOpacity>
            </View>
            {/* D-Pad Down Button */}
            <View style={styles.dpadRow}>
              <TouchableOpacity
                style={[styles.dpadButton, styles.dpadDown]}
                onPress={() => handleArrowPress('down')}>
                <Text style={styles.dpadText}>▼</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Right Column - Empty for now, can add more controls later */}
        <View style={styles.rightControlColumn}>
          {/* Space for additional controls if needed */}
        </View>
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
          <View
            style={{
              backgroundColor: Colors.softRed,
              flex: 1,
              minHeight: '100%',
            }}>
            <PokemonScroller />
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
    paddingHorizontal: 16,
  },
  scrollerTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  idDisplay: {
    alignItems: 'center',
    marginBottom: 16,
  },
  idText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.white,
  },
  controlsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 8,
  },
  leftControlColumn: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rightControlColumn: {
    flex: 1,
  },
  dpadContainer: {
    width: 120,
    height: 120,
    position: 'relative',
  },
  dpadRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
  },
  dpadMiddleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  dpadButton: {
    backgroundColor: Colors.darker,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dpadUp: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  dpadDown: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  dpadLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  dpadRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  dpadCenter: {
    width: 40,
    height: 40,
    backgroundColor: Colors.black,
  },
  dpadText: {
    fontSize: 20,
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
    marginVertical: 12,
  },
  pokemonSprite: {
    width: 150,
    height: 150,
  },
});

export default App;
