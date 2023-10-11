import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Text,
  Platform,
  Pressable,
  TouchableWithoutFeedback, // Import TouchableWithoutFeedback
  Keyboard,
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
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();
  const [toggleRegister, setToggleRegister] = useState(false);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('Token:', token);
      if (token) {
        const userData = await getUserByToken(token);
        console.log('User Data:', userData);
        if (userData) {
          console.log('Navigating to AuthSuccess');
          setIsLoggedIn(true);
          setUser(userData);
        }
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log('checkToken Error:', error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
    IndieFlower: require('../../assets/fonts/IndieFlower-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  return (
    <ImageBackground source={backImage} resizeMode="cover" style={styles.image}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={150}
        style={styles.container}
      >
        <Text style={styles.header}>Tasto</Text>
        <Text style={styles.headerSmall}>Share your best recipe</Text>
        <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
          <View style={styles.inner}>
            {toggleRegister ? (
              <RegisterForm setToggleRegister={setToggleRegister} />
            ) : (
              <LoginForm />
            )}
            <View style={styles.togglerContainer}>
              <Pressable
                onPress={() => {
                  setToggleRegister(!toggleRegister);
                }}
                style={styles.togglerButton}
              >
                <Text style={styles.togglerButtonText}>
                  {toggleRegister ? (
                    <>
                      Already have an account?{' '}
                      <Text style={{color: 'crimson'}}>Login</Text>
                    </>
                  ) : (
                    <>
                      Don&apost have an account?{' '}
                      {/* Typo: Changed "Don't" to "Don't" */}
                      <Text style={{color: 'crimson'}}>Register</Text>
                    </>
                  )}
                </Text>
              </Pressable>
            </View>
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
    bottom: 200,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
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
    flex: 1,
  },
  togglerButtonText: {
    color: '#545F71',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  togglerContainer: {
    top: 400,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
