import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import RecipeDetailsScreen from '../screens/recipedetails/RecipeDetailsScreen';
import RecipeListScreen from '../screens/recipeslistscreen/RecipeListScreen';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="RecipeListScreen" component={RecipeListScreen} />
        <Stack.Screen
          name="RecipeDetailsScreen"
          component={RecipeDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
