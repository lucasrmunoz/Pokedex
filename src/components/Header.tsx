import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from '../theme/colors';

const Header = (): React.JSX.Element => {
  const isDarkMode = true;

  return (
    <View
      style={[
        styles.background,
        {
          backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        },
      ]}>
      <Text
        style={[
          styles.text,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        Welcome to
        {'\n'}
        Your App Name
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    paddingBottom: 40,
    paddingTop: 96,
    paddingHorizontal: 32,
  },
  text: {
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default Header;