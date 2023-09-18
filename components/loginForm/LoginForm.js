import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useAuthentication} from '../../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';
import {MainContext} from '../../contexts/MainContext';
import {Button, Input, Text} from '@rneui/themed';
import {StyleSheet, View} from 'react-native';

const LoginForm = () => {
  const {postLogin} = useAuthentication();
  const {setIsLoggedIn, setUser} = useContext(MainContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const logIn = async (loginData) => {
    try {
      const loginResponse = await postLogin(loginData);
      console.log('login response', loginResponse);

      if (loginResponse.error) {
        // Handle API errors here
        console.error('API Error:', loginResponse.error);
        // Display an error message to the user
        // You can set an error state here or use a toast/notification library
      } else {
        // Successful login
        await AsyncStorage.setItem('userToken', loginResponse.token);
        setIsLoggedIn(true);
        setUser(loginResponse.user);
      }
    } catch (error) {
      console.error('Network Error:', error);
      // Handle network errors here
      // You can display a network error message to the user
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
          />
        )}
        name="username"
      />
      {errors.username && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />

      <Button title="Submit" onPress={handleSubmit(logIn)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 250,
    width: 200,
  },
});

export default LoginForm;
