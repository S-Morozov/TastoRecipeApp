import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Auth = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Tasto</Text>
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
    fontFamily: 'Inter',
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 48, // You can specify a numeric value or use '48px' for strings
    letterSpacing: -0.96,
  },
});

export default Auth;
