import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
// eslint-disable-next-line camelcase
import {useFonts, Inter_700Bold} from '@expo-google-fonts/inter';

const Auth = () => {
  const [fontsLoaded, fontError] = useFonts({
    // eslint-disable-next-line camelcase
    Inter_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Tasto</Text>
      </View>
      <View style={styles.smallTitleConatainer}>
        <Text style={styles.smallTitleText}>Share your best recipe</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    position: 'absolute',
    top: 143,
    width: 331,
    height: 87,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleText: {
    color: '#AF3D3D',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 4,
    fontFamily: 'Inter_700Bold',
    fontSize: 48,
    lineHeight: 48,
    letterSpacing: -0.96,
  },

  smallTitleConatainer: {
    position: 'absolute',
    top: 230,
    width: 259,
    height: 33,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default Auth;
