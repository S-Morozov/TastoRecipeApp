import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useFonts} from 'expo-font';
import Hotdog from '../../../assets/png/hotdog.png';
import Sushi from '../../../assets/png/sushi.png';
import Burger from '../../../assets/png/burger.png';
import PropTypes from 'prop-types';

const HomeScreen = ({navigation}) => {
  // Receive navigation as a parameter
  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('../../../assets/fonts/Inter-Bold.ttf'),
    IndieFlower: require('.././../../assets/fonts/IndieFlower-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Tasto</Text>
      </View>

      <View style={styles.smallTitleContainer}>
        <Text style={styles.smallTitleText}>Share your best recipe</Text>
      </View>

      <View style={styles.hotDogImageContainer}>
        <Image source={Hotdog} />
      </View>
      <View style={styles.sushiImageContainer}>
        <Image source={Sushi} />
      </View>
      <View style={styles.burgerImageContainer}>
        <Image source={Burger} />
      </View>

      {/* Custom-styled TouchableOpacity */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RecipeScreen')}
      >
        <Text style={styles.buttonText}></Text>
      </TouchableOpacity>
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
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
    fontSize: 48,
    lineHeight: 48,
    letterSpacing: -0.96,
  },
  smallTitleContainer: {
    position: 'absolute',
    top: 230,
    left: 60,
    width: 259,
    height: 33,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  smallTitleText: {
    textAlign: 'center',
    fontFamily: 'IndieFlower',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 30,
    letterSpacing: -0.5,
  },
  hotDogImageContainer: {
    position: 'absolute',
    top: 220,
    right: 204,
  },
  sushiImageContainer: {
    position: 'absolute',
    top: 284,
    width: 383,
    height: 371,
    flexShrink: 0,
  },
  burgerImageContainer: {
    position: 'absolute',
    top: 510,
    left: 227,
  },
  button: {
    top: 280,
    width: 201,
    height: 48,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    flexShrink: 0,
    backgroundColor: '#AF3D3D', // Change to your desired background color
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', // Change to your desired text color
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
});

HomeScreen.propTypes = {
  navigation: PropTypes.object,
};

export default HomeScreen;