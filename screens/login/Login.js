import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {useFonts} from 'expo-font';
import PropTypes from 'prop-types';
import {MainContext} from '../../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../../hooks/ApiHooks';
import LoginForm from '../../components/loginForm/LoginForm';
import RegisterForm from '../../components/registerForm/RegisterForm';

import Hotdog from '../../assets/png/hotdog.png';
import Sushi from '../../assets/png/sushi.png';
import Burger from '../../assets/png/burger.png';

const Login = ({navigation}) => {
  // props is needed for navigation
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();
  const [toggleRegister, setToggleRegister] = useState(false);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      // hardcoded token validation
      const userData = await getUserByToken(token);
      console.log('token', token);
      console.log('userdata', userData);
      if (userData) {
        setIsLoggedIn(true);
        setUser(userData);
      }
    } catch (error) {
      console.log('checkToken', error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  // Fonts
  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
    IndieFlower: require('../../assets/fonts/IndieFlower-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return undefined;
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

      <TouchableOpacity
        onPress={() => Keyboard.dismiss()}
        style={{flex: 1}}
        activeOpacity={1}
      >
        {toggleRegister ? (
          <RegisterForm setToggleRegister={setToggleRegister} />
        ) : (
          <LoginForm />
        )}

        <TouchableOpacity
          onPress={() => {
            setToggleRegister(!toggleRegister);
          }}
          style={styles.togglerButton}
        >
          <Text style={styles.togglerButtonText}>
            {toggleRegister ? 'or Login' : 'or Register'}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 5,
    marginTop: 40,
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
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 48,
    letterSpacing: -0.96,
  },
  smallTitleContainer: {
    position: 'absolute',
    top: 230,
    left: 80,
    width: 259,
    height: 33,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  smallTitleText: {
    textAlign: 'center',
    fontFamily: 'IndieFlower',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 30,
    letterSpacing: -0.5,
  },
  hotDogImageContainer: {
    position: 'absolute',
    top: 230,
    right: 210,
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
  togglerButton: {
    position: 'absolute',
    marginTop: 10,
    top: 680,
    left: 200,
    alignSelf: 'center',
  },
  togglerButtonText: {
    color: '#545F71',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
