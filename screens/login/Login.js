import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Pressable,
} from 'react-native';
import {useFonts} from 'expo-font';
import PropTypes from 'prop-types';
import {MainContext} from '../../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../../hooks/ApiHooks';
import LoginForm from '../../components/loginForm/LoginForm';
import RegisterForm from '../../components/registerForm/RegisterForm';

const backImage = require('../../assets/png/Background-new.png');

const Login = ({navigation}) => {
  // props is needed for navigation
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();
  const [toggleRegister, setToggleRegister] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);

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
    <ImageBackground source={backImage} resizeMode="cover" style={styles.image}>
      <Text style={styles.header}>Tasto</Text>
      <Text style={styles.headerSmall}>Share your best recipe</Text>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardOffset}
        style={styles.container}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            setKeyboardOffset(0); // Reset the offset when dismissing the keyboard
          }}
        >
          <View style={styles.inner}>
            {toggleRegister ? (
              <RegisterForm setToggleRegister={setToggleRegister} />
            ) : (
              <LoginForm />
            )}

            <Pressable
              onPress={() => {
                setToggleRegister(!toggleRegister);
              }}
              style={styles.togglerButton}
            >
              <Text style={styles.togglerButtonText}>
                {toggleRegister ? 'or Login' : 'or Register'}
              </Text>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  inner: {
    bottom: 250,
    flex: 1,
    padding: 24,
    marginBottom: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    top: 150,
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

  headerSmall: {
    top: 150,
    textAlign: 'center',
    fontFamily: 'IndieFlower',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 30,
    letterSpacing: -0.5,
  },

  togglerButton: {
    position: 'absolute',
    marginTop: 10,
    top: 800,
    left: 250,
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
