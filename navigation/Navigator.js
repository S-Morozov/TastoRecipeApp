import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RecipeScreen from '../screens/recipes/RecipeScreen';
import HomeScreen from '../screens/home/HomeScreen';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="RecipeScreen" component={RecipeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
