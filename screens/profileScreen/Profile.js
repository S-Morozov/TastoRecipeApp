import React, {useContext} from 'react';
import {MainContext} from '../../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Card, Icon, ListItem} from '@rneui/themed';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header/Header';
import ProfileForm from '../../components/profileForm/ProfileForm';

const Profile = ({navigation}) => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const logOut = async () => {
    console.log('profile, logout');
    try {
      await AsyncStorage.clear();
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: 16}}>
      <Header />
      <Card>
        <Card.Title>{user.username}</Card.Title>
        <ListItem>
          <Icon name="email" />
          <ListItem.Title>{user.email}</ListItem.Title>
        </ListItem>
        {user.full_name && (
          <ListItem>
            <Icon name="person" />
            <ListItem.Title>{user.full_name}</ListItem.Title>
          </ListItem>
        )}
        <ListItem>
          <ListItem.Title>user id: {user.user_id}</ListItem.Title>
        </ListItem>
        <Card.Divider />
        <Button
          onPress={() => {
            navigation.navigate('My files');
          }}
        >
          My files
          <Icon name="storage" color="white" />
        </Button>
        <Button onPress={logOut}>
          Log out!
          <Icon name="logout" color="white" />
        </Button>
        <ProfileForm user={user} />
      </Card>
    </SafeAreaView>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
