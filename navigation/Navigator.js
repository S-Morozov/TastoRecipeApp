import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainContext} from '../contexts/MainContext';
import Home from '../screens/Home/Home';
import Profile from '../screens/profileScreen/Profile';
import Login from '../screens/login/Login';
import RecipeDetailsScreen from '../screens/recipedetails/RecipeDetailsScreen';
import {Icon} from '@rneui/themed';
import AuthSuccessScreen from '../components/authSuccess/AuthSuccess';
import MyFiles from '../screens/myFiles/MyFiles';
import Modify from '../screens/modify/Modify';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Tabscreen = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => <Icon name="person" color={color} />,
        }}
      />
      <Tab.Screen
        name="My Files"
        component={MyFiles}
        options={{
          tabBarIcon: ({color}) => <Icon name="storage" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Tabs" component={Tabscreen} />
          <Stack.Screen name="AuthSuccess" component={AuthSuccessScreen} />
          <Stack.Screen
            name="RecipeDetailsScreen"
            component={RecipeDetailsScreen}
          />
          <Stack.Screen name="My files" component={MyFiles} />
          <Stack.Screen name="Modify file" component={Modify} />
        </>
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
